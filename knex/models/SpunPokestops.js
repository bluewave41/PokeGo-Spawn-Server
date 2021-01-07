const { Model } = require('objection');

class SpunPokestops extends Model {
    static get tableName() {
		return 'spunpokestops';
    }
}

module.exports = SpunPokestops;