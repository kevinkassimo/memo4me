const request = require('request');
const key = "9bf5c44b1d0ed8c6afeea18f0c55a74d815cfadaG2m9FpQKe5effow6jsjQVPlpr";

export const sendText = (number, body, from = '') => {
  request.post('https://textbelt.com/text', {
    form: {
      phone: number,
      message: `New notification from ${from || 'Unknown Sender'}:
${body}

Delivered by Memo4Me`,
      key: key,
    },
  }, function(err, httpResponse, body) {
    if (err) {
      throw new Meteor.Error(err);
    }
    console.log(JSON.parse(body));
  })
};