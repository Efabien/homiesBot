const request=require('request-promise');
const tool=require('./tool');

module.exports = class {
  constructor(config, watcher) {
    this._token = config.token;
    this._messagingUrl = config.messengerAPI;
    this._graphAPI = config.graphAPI;
    this._watcher = watcher;
  }

  send(sender, data) {
    return request( {
      url: this._messagingUrl,
      timeout: 120000,
      qs:{access_token: this._token},
      method: 'POST',
      json: {
        recipient: { id: sender},
        message: data
      }
    }).then((response, body) => {
      if (response.error) {
        throw new Error(response.error);
      } else {
        return response.message_id;
      }
    });  
  }

  sendText(sender, text) {
    return this.send(sender, { text: text});
  }

  getUser(id, projection) {
    const url = `${this._graphAPI}/${id}/?fields=${projection.join(',')}&access_token=${this._token}`;
    return request( {
      url: url,
      timeout: 120000,
      method: 'GET'
    }).then(response => {
      if (response.error) throw new Error(response.error);
      return JSON.parse(response);
    });
  }

  sendBatch(sender, datas) {
    const self = this;
    if (datas.length <= 0) {
      return;
     } 
    this.send(sender, datas[0])
    .then((response) => {
      self._watcher.on('delivered', (delivery) => {
        if (delivery.mids.indexOf(response) > -1) {
          datas.shift();
          self.sendBatch(sender, datas);
        }
      });
    });
  }
}
