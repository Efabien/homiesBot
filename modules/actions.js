module.exports = class {
	constructor(fbModule, templateModule) {
		this._fb = fbModule.fb;
		this._dataBuilder = fbModule.dataBuilder;
		this._compiler = templateModule.compiler;
		this._template = templateModule.template;
	}

	helpMessages(senderId) {
		const dataTosend = this._compiler.execute(this._template.functionalityTips);
		this._fb.sendBatch(senderId, dataTosend);
	}

	welcomeMessage(user) {
		const dataTosend = this._compiler.execute(this._template.welcomeMessage, { userName: user.first_name });
		const tipsButton = this._dataBuilder.quickReplyButtons('How to use me: ', [{ title: 'Tips' , payload: 'TIPS_'}]);
		dataTosend.push(tipsButton);
		this._fb.sendBatch(user.fbId, dataTosend);
	}

	expose(){
		return this._fb;
	}
}