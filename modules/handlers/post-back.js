const Promise = require('bluebird');
const templateCompiler = require('../templateCompiler');

module.exports = class {
	constructor(fb, payloadHandler, template) {
		this._fb = fb;
		this._payloadHandler = payloadHandler;
		this._template = template;

		this.handle = Promise.coroutine(this.handle.bind(this));
	}

	*handle(senderId, data, res) {
		const user = yield this._fb.getUser(senderId, ['first_name']);
		this._payloadHandler.receive(data.payload);
		const commande = this._payloadHandler.getCommande();
		if (commande.type === 'start') this._fb.sendText(senderId, templateCompiler(this._template.welcomeMessage, { userName: user.first_name }));
		res.sendStatus(200);
	}
}