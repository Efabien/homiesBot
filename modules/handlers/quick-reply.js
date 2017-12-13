const Promise = require('bluebird');
const templateCompiler = require('../templateCompiler');

module.exports = class {
	constructor(fbModule, payloadHandler, templateModule) {
		this._fb = fbModule.fb;
		this._payloadHandler = payloadHandler;
		this._compiler = templateModule.compiler;
		this._template = templateModule.template;

		this.handle = Promise.coroutine(this.handle.bind(this));
	}

	*handle(senderId, data, res) {
		this._payloadHandler.receive(data.payload);
		const command = this._payloadHandler.getCommande();
		if (command.type === 'TIPS') {
			const dataTosend = this._compiler.execute(this._template.functionalityTips);
			this._fb.sendBatch(senderId, dataTosend);
		}
		res.sendStatus(200);
	}
}