const Promise = require('bluebird');

module.exports = class {
	constructor(fb, template) {
		this._fb = fb;
		this._template = template;
		this.handle = Promise.coroutine(this.handle.bind(this));
	}

	*handle(senderId, data, res) {
		const user = yield this._fb.getUser(senderId, ['first_name']);
		if (data.match(/^aide$|help/i)) this._fb.sendText(senderId, template.helpMessage);
		if (data.match(/^Hello$/i)) this._fb.sendText(senderId, `Hello ${user.first_name}`);
		res.sendStatus(200);
	}
}