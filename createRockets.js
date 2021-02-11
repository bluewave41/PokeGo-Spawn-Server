const Rockets = require('./knex/models/Rockets');
require('./Database');
const PokemonBuilder = require('./PokemonBuilder');
const RocketTable = require('./RocketTable');

async function start() {
	const random = RocketTable[Math.floor(Math.random() * RocketTable.length)];
	
	await Rockets.query().insert({
		rocketId: 789,
		cell: 'S7',
		type: random.type,
		multiplier: 1,
		pokemon1: getRandom(random.catchable),
		pokemon2: getRandom(random.possible),
		pokemon3: getRandom(random.possible),
	})
}

function getRandom(array) {
	return array[Math.floor(Math.random() * array.length)];
}

start();