const { Model } = require('objection');

class RocketPokemon extends Model {
	static get tableName() {
		return 'rocket_pokemon';
    }
}

module.exports = RocketPokemon;