const Pokemon = require('./knex/models/Pokemon');
const PokemonData = require('./PokemonData');
const MoveList = require('./MoveList');
const PowerupTable = require('./PowerupTable');

module.exports = {
	generatePokemon(pokedexId, level) {
		let pokemon = {
			pokedexId: pokedexId,
			level: level,
            gender: this.isFemale(pokedexId),
        }
        this.calculateIVs(pokemon);
		
		this.calculateHP(pokemon);

        this.getMoves(pokemon);
        
        return Pokemon.fromJson(pokemon);
    },
	calculateHP(pokemon) {
		const base = PokemonData[pokemon.pokedexId];
		const row = PowerupTable.find(el => el.level == pokemon.level);
		pokemon.hp = Math.floor((base.hp + pokemon.hpiv) * row.multiplier);
	},
	calculateIVs(pokemon) {
		pokemon.hpiv = Math.floor((Math.random() * 15));
		pokemon.atkiv = Math.floor((Math.random() * 15));
		pokemon.defiv = Math.floor((Math.random() * 15));
        return pokemon;
	},
    calculateTotalIV(pokemon) {
        let total = 48;
        let sum = pokemon.hpiv + pokemon.atkiv + pokemon.defiv;
        return ((sum / total) * 100).toFixed(2);
    },
	calculateShiny() {
		return Math.floor(Math.random() * 1001) == 1000;
	},
	isFemale(pokedexId) {
        let rate = PokemonData[pokedexId].gender_rate;
        if(rate == -1) {
            return null;
        }
        let femaleRate = rate/8;
        return Math.random() < femaleRate;
    },
    getMoves(pokemon) {
        const fastMoves = PokemonData[pokemon.pokedexId].fastMoves.filter(el => !el[1]);
        const chargeMoves = PokemonData[pokemon.pokedexId].chargeMoves.filter(el => !el[1]);
		
        pokemon.fastMove = fastMoves[Math.floor(Math.random() * fastMoves.length)][0];
        pokemon.chargeMove = chargeMoves[Math.floor(Math.random() * chargeMoves.length)][0];
    }
}