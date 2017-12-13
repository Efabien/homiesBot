module.exports = class {

	quickReplyButtons(text, params) {
    const result = {
      text: text,
      quick_replies: []
    };
    params.forEach(param => {
      const hold = {
          content_type: 'text',
          title: param.title,
          payload: param.payload
        };
      if (param.image_url) hold.image_url = param.image_url;
      result.quick_replies.push(hold);
    });
    return result;
  }

  /**
  "elements": [
          {
            "title": "Classic T-Shirt Collection",
            "subtitle": "See all our colors",
            "image_url": "https://peterssendreceiveapp.ngrok.io/img/collection.png",          
            "buttons": [
              {
                "title": "View",
                "type": "web_url",
                "url": "https://peterssendreceiveapp.ngrok.io/collection",
                "messenger_extensions": true,
                "webview_height_ratio": "tall",
                "fallback_url": "https://peterssendreceiveapp.ngrok.io/"            
              }
            ]
          },
          {
            "title": "Classic White T-Shirt",
            "subtitle": "See all our colors",
            "default_action": {
              "type": "web_url",
              "url": "https://peterssendreceiveapp.ngrok.io/view?item=100",
              "messenger_extensions": true,
              "webview_height_ratio": "tall",
              "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
            }
          }
        ],
        "buttons": [
          {
            "title": "View More",
            "type": "postback",
            "payload": "payload"            
          }
        ]
  **/
  buildListTemplate(elements, buttons) {
    const data = {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'list',
          top_element_style: 'compact',
          elements: elements
        }
      }
    };
    if (buttons) data.attachment.payload.buttons = buttons;
    return data;
  }
}
