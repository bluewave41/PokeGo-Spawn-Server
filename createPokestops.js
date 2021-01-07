const Coordinates = require('./Coordinates');
const Pokestops = require('./knex/models/Pokestops');
require('./Database');

const keys = Object.keys(Coordinates);

let stops = [];
let id = 1;


async function start() {
	await Pokestops.query().delete();
	for(var i=0;i<keys.length;i++) {
		let key = keys[i];
		let count = 0;
		let array = Coordinates[key];
		switch(key) {
			case 'towns': //3
				count = 3;
				break;
			case 'pavement': //1
				count = 1;
				break;
			case 'blue': //2
				count = 2;
				break;
			default:
				break;
		}
	
		for(var j=0;j<array.length;j++) {
			for(var k=0;k<count;k++) {
				stops.push({id: id++, cell: array[j]});
			}
		}
	}
	
	await Pokestops.knex().table('pokestops').insert(stops);
	console.log('done');
}

start();