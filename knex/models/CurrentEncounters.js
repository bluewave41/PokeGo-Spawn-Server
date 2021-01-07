const { Model } = require('objection');

class CurrentEncounters extends Model {
	static get tableName() {
		return 'current_encounters';
    }
}

module.exports = CurrentEncounters;