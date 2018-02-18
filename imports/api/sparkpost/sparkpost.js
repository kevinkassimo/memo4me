const SparkPost = require('sparkpost');
const client = new SparkPost('ce0abe6128dd58bfe5fa326a872240b1b89e8743');

export const sendEmail = function(address, title, htmlBody, successCallback, errCallback) {
  client.transmissions.send({
    options: {
      sandbox: false,
      debug: true,
    },
    content: {
      from: 'info@www.memo4me.com',
      subject: title,
      html: htmlBody,
    },
    recipients: [
      {address: address}
    ]
  }).then(successCallback)
    .catch(errCallback);
};
