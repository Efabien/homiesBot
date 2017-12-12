const request = require('request-promise');
const tool = require('../tool');

module.exports = class {
	constructor(config) {
		this._baseUrl = config.homiesApiBaseUrl;
		this._authToken = config.accessAPI;
	}

	_send(url, method, body = {}) {
		return request( {
			url: url,
			timeout: 120000,
			method: method,
			headers: {
				authorization: this._authToken
			},
			body: body,
			json: true
		}).then(response => response)
		.catch(error => {
			console.log(error);
		});
	}

	createUser(params) {
		const url = this._baseUrl + '/user';
		return this._send(url, 'POST', params);
	}
}