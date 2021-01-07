const { Model } = require('objection');

class TravelRequests extends Model {
    static get tableName() {
		return 'travelrequests';
    }
}

module.exports = TravelRequests;