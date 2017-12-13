const Promise = require('bluebird');
const templateCompiler = require('../templateCompiler');

module.exports = class {
	constructor(payloadHandler, actions) {
		this._payloadHandler = payloadHandler;
		this._actions = actions

		this.handle = Promise.coroutine(this.handle.bind(this));
	}

	*handle(senderId, data, res) {
		this._payloadHandler.receive(data.payload);
		const command = this._payloadHandler.getCommande();
		if (command.type === 'TIPS') {
			this._actions.helpMessages(senderId);
		}
		res.sendStatus(200);
	}
}