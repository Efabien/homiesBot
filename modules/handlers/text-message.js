const Promise = require('bluebird');

module.exports = class {
	constructor(actions) {
		this._actions = actions;
		this.handle = Promise.coroutine(this.handle.bind(this));
	}

	*handle(senderId, data, res) {
		if (data.match(/^aide$|help/i)) this._actions.helpMessages(senderId);
		if (data.match(/^Hello$/i)) this._fb.sendText(senderId, `Hello ${user.first_name}`);
		res.sendStatus(200);
	}
}