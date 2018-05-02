const Email = require('email-templates');
const config = require('../config/config.js');


const sendEmail = function(template, user) {
  const tplsPath = 'templates/emails';

  const email = new Email({
    views: { root: tplsPath },
    message: { from: config.mail_sender },
    preview: false,
    send: true,
    transport: {
      host: config.mail_host,
      port: config.mail_port,
      secure: true,
      auth: {
        user: config.mail_user,
        pass: config.mail_password
      },
      tls: {
        rejectUnauthorized: false
      }
    },
    juiceResources: {
      webResources: {
        relativeTo: tplsPath
      }
    }
  });

  let recoveryUrl = `${config.protocol}://${config.host}/reset/${user.reset_code}`;
  const locals = {
      email: user.email,
      reset_code: user.reset_code,
      name: 'user',
      recoveryUrl: recoveryUrl,
  };

  return email
    .send({
      template: template,
      message: { to: user.email },
      locals: locals
    })
    /*
    .then(console.log)
    .catch(console.error);
    */
};

module.exports.sendEmail = sendEmail
