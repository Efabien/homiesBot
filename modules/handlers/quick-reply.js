const Promise = require('bluebird');
const templateCompiler = require('../templateCompiler');

module.exports = class {
	constructor(fb, payloadHandeler, template) {
		this._fb = fb;
		this._payloadHandler = payloadHandler;
		this._template = template;

		this.handle = Promise.coroutine(this.handle.bind(this));
	}

	*handle(senderId, data, res) {
		this._payloadHandler.receive(data.payload);
		const command = this._payloadHandler.getCommande();
	}
}