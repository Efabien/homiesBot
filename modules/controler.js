const quickReply = require('./handlers/quick-reply-handler');

const Fb = require('./fb');
const PayloadHandeler = require('./handlers/payload-handeler');

const TextMessage = require('./handlers/text-message');
const PostBack = require('./handlers/post-back');

const config = require('../config');
const template = require('../template');
const watcher = require('./handlers/delivery-handeler');

const fb = new Fb(config, watcher);
const payloadHandeler = new PayloadHandeler(config.payloadMap, config.payloadSeparator);

const textMessage = new TextMessage(fb, template);
const postback = new PostBack(fb, payloadHandeler, template);

module.exports = (req, res) => {
  const input = req.body.entry[0].messaging;
  input.forEach(event => {
    const sender = event.sender.id;
      if (event.message && event.message.text && !event.message.quick_reply) {        
        textMessage.handle(sender, event.message.text, res); 
      } else if (event.postback) {
        postback.handle(sender, event.postback, res);
      } else if (event.message && event.message.quick_reply) {
        quickReply(sender, event.message.quick_reply, payloadHandeler, res);
      } else if (event.delivery) {
        watcher.capture(event.delivery);
      }   
  });
}
