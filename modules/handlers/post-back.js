const Promise = require('bluebird');

module.exports = class {
	constructor(payloadHandler, homiesClient, actions) {
		this._payloadHandler = payloadHandler;
		this._homiesClient = homiesClient;
		this._actions = actions;
		this.handle = Promise.coroutine(this.handle.bind(this));
	}

	*handle(senderId, data, res) {
		this._payloadHandler.receive(data.payload);
		const commande = this._payloadHandler.getCommande();
		if (commande.type === 'start') {
			const projection = ['first_name', 'last_name', 'profile_pic', 'locale', 'timezone'];
			const fbInfo = yield this._actions.expose('fb').getUser(senderId, projection);
			fbInfo.fbId = senderId;
			const user = yield this._homiesClient.createUser(fbInfo);
			this._actions.welcomeMessage(user);
		}
		res.sendStatus(200);
	}
}