const coordinates = require('./Coordinates').all;
const PokemonList = require('./PokemonList');
const DailyEncounters = require('./knex/models/DailyEncounters');
const CurrentEncounters = require('./knex/models/CurrentEncounters');
const Caught = require('./knex/models/Caught');
const PokemonBuilder = require('./PokemonBuilder');
const TravelRequests = require('./knex/models/TravelRequests');
const SocketServer = require('./SocketServer');
const SpunPokestops = require('./knex/models/SpunPokestops');
const User = require('./knex/models/User');
const { raw } = require('objection');
require('./Database');
/*
	1 - 10%
	2 - 20%
	3 - 40%
	4 - 20%
	5 - 10%
*/

/*
	common - 52%
	uncommon - 36%
	rare - 10%
	legendary - 2%
*/
const MAX_POKEMON_PER_CELL = 5;

generatePokemon();

async function generatePokemon() {
	let id = 1;
	let currentPokemon = [];
	await CurrentEncounters.query().delete();
	await Caught.query().delete();
	console.log('deleted');
	for(var i=0;i<coordinates.length;i++) {
		let numberOfPokemon = calculateNumberOfPokemon();
		for(var j=0;j<numberOfPokemon;j++) {
			let rarity = determinePokemonRarity();
			let list = PokemonList[rarity];
			let random = list[Math.floor(Math.random() * list.length)];
			let pokemon = PokemonBuilder.generatePokemon(random, Math.floor(Math.random() * 21) + 1);
			pokemon.encounterId = id++;
			pokemon.shinyId = Math.floor(Math.random() * 500) + 1;
			let obj = {cell: coordinates[i]};
			Object.assign(obj, pokemon);
			currentPokemon.push(obj);
		}
	}
	await CurrentEncounters.knex().table('current_encounters').insert(currentPokemon);
	console.log('done');
}

function determinePokemonRarity() {
	let random = Math.floor(Math.random() * 100);
	if(random < 52) {
		return 'common';
	}
	else if(random < 88) {
		return 'uncommon';
	}
	else if(random < 98) {
		return 'rare';
	}
	else {
		return 'legendary';
	}
}

function calculateNumberOfPokemon() {
	let random = Math.floor(Math.random() * 100);
	if(random < 10) {
		return 1;
	}
	else if(random < 20) {
		return 2;
	}
	else if(random > 70) {
		return 3;
	}
	else if(random < 90) {
		return 4;
	}
	else {
		return 5;
	}
}

/*Interval tasks*/

//5 minutes
setInterval(async function() {
	console.log('doing location checks');
	
	//handle travel requests
	const finishedRequests = await TravelRequests.query().select('u.discordId', 'tr.location')
		.from('travelrequests as tr')
		.join('users as u', 'u.userId', 'tr.userId')
		.where(raw('tr.created_at + INTERVAL 1 MINUTE < NOW()'));
		
	for(var i=0;i<finishedRequests.length;i++) {
		await User.query().update({
			location: finishedRequests[i].location
		})
		.where('discordId', finishedRequests[i].discordId)
	}
	
	await TravelRequests.query().delete()
		.where(raw('created_at + INTERVAL 1 MINUTE < NOW()'));
	SocketServer.emit('locationUpdate', finishedRequests);
}, 300000)
//300000

//30 minutes
setInterval(function() {
	console.log('generating pokemon');
	generatePokemon();
}, 1800000)
//1800000

/*End interval tasks*/