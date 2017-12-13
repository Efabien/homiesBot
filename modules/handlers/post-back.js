const Promise = require('bluebird');

module.exports = class {
	constructor(fbModule, payloadHandler, homiesClient, templateModule) {
		this._fb = fbModule.fb;
		this._dataBuilder = fbModule.dataBuilder;
		this._payloadHandler = payloadHandler;
		this._homiesClient = homiesClient;
		this._template = templateModule.template;
		this._compiler = templateModule.compiler;

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
			const dataTosend = this._compiler.execute(this._template.welcomeMessage, { userName: user.first_name });
			const tipsButton = this._dataBuilder.quickReplyButtons('How to use me: ', [{ title: 'Tips' , payload: 'TIPS_'}]);
			dataTosend.push(tipsButton);
			this._fb.sendBatch(senderId, dataTosend);
		}
		res.sendStatus(200);
	}
}