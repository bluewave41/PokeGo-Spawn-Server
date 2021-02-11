const { Model } = require('objection');
const MoveList = require('../../MoveList');
const PokemonData = require('../../PokemonData');

class Pokemon extends Model {
	static get tableName() {
		return 'pokemon';
    }
    static get idColumn() {
        return 'pokemonId';
    }
    get url() {
        if(this.shiny) {
            return process.env.sprites + `/shiny/${this.pokedexId}.png`;
        }
        else {
            return process.env.sprites + `/normal/${this.pokedexId}.png`;
        }
    }
    get emoji() {
        return PokemonData[this.pokedexId].emoji;
    }
    get candyId() {
        return PokemonData[this.pokedexId].candyId;
    }
    get evolveCost() {
        return PokemonData[this.pokedexId].evolveCost;
    }
    get evolveId() {
        return PokemonData[this.pokedexId].evolveId;
    }
    get evolution() {
        let evolution = PokemonData[PokemonData[this.pokedexId].evolveId];
        if(evolution) {
            return evolution.name.charAt(0).toUpperCase() + evolution.name.slice(1);
        }
        return null;
    }
    get moves() {
        return [MoveList[this.fastMove].name, MoveList[this.chargeMove].name];
    }
    get insert() {
        return {
            ownerId: this.ownerId,
            pokedexId: this.pokedexId,
            nickname: this.nickname,
            cp: this.cp,
            hp: this.hp, 
            hpiv: this.hpiv,
            atkiv: this.atkiv,
            defiv: this.defiv,
            shiny: this.shiny,
            gender: this.gender,
            level: this.level,
            maxHP: this.maxHP,
            fastMove: this.fastMove,
            chargeMove: this.chargeMove,
            totaliv: this.totaliv,
        }
    }
	get rocketInsert() {
        return {
            pokedexId: this.pokedexId,
			rocketId: this.rocketId,
            cp: this.cp,
            hp: this.hp, 
            hpiv: this.hpiv,
            atkiv: this.atkiv,
            defiv: this.defiv,
            gender: this.gender,
            level: this.level,
            maxHP: this.hp,
            fastMove: this.fastMove,
            chargeMove: this.chargeMove,
        }
    }
}

module.exports = Pokemon;