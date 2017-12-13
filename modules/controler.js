const config = require('../config');
const template = require('../template');

const Fb = require('./fb');
const DataBuilder = require('./fbDataBuilder');
const PayloadHandler = require('./handlers/payload-handler');
const TemplateCompiler = require('./templateCompiler');
const watcher = require('./handlers/delivery-handler');

const TextMessage = require('./handlers/text-message');
const PostBack = require('./handlers/post-back');
const QuickReply = require('./handlers/quick-reply');

const HomiesClient = require('./api-call/homies');

const fb = new Fb(config, watcher);
const dataBuilder = new DataBuilder();
const payloadHandler = new PayloadHandler(config.payloadMap, config.payloadSeparator);
const compiler = new TemplateCompiler(config.stringMaxLength);

const homiesClient = new HomiesClient(config);

const textMessage = new TextMessage(fb, template);
const postback = new PostBack({ fb, dataBuilder }, payloadHandler, homiesClient, { template, compiler });
const quickReply = new QuickReply(fb, payloadHandler, template);


module.exports = (req, res) => {
  const input = req.body.entry[0].messaging;
  input.forEach(event => {
    const sender = event.sender.id;
      if (event.message && event.message.text && !event.message.quick_reply) {        
        textMessage.handle(sender, event.message.text, res); 
      } else if (event.postback) {
        postback.handle(sender, event.postback, res);
      } else if (event.message && event.message.quick_reply) {
        quickReply.handle(sender, event.message.quick_reply, payloadHandler, res);
      } else if (event.delivery) {
        watcher.capture(event.delivery);
      }   
  });
}
