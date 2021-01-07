const { Model } = require('objection');

class DailyEncounters extends Model {
	static get tableName() {
		return 'daily';
    }
}

module.exports = DailyEncounters;