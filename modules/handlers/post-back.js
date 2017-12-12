const Promise = require('bluebird');
const templateCompiler = require('../templateCompiler');

module.exports = class {
	constructor(fb, payloadHandler, homiesClient, template) {
		this._fb = fb;
		this._payloadHandler = payloadHandler;
		this._homiesClient = homiesClient;
		this._template = template;

		this.handle = Promise.coroutine(this.handle.bind(this));
	}

	*handle(senderId, data, res) {
		this._payloadHandler.receive(data.payload);
		const commande = this._payloadHandler.getCommande();
		if (commande.type === 'start') {
			const projection = ['first_name', 'last_name', 'profile_pic', 'locale', 'timezone'];
			const fbInfo = yield this._fb.getUser(senderId, projection);
			fbInfo.fbId = senderId;
			const user = yield this._homiesClient.createUser(fbInfo);
			this._fb.sendText(senderId, `Hello ${user.first_name}`);
		}
		res.sendStatus(200);
	}
}