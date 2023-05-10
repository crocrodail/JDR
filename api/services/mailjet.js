const mailjet = require("node-mailjet").connect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_SECRET_KEY
);
const Handlebars = require("handlebars");

const send = async (to, subject, html, params = {}, from) => {
  if (process.env.MAILJET_SECRET_KEY && process.env.MAILJET_API_KEY) {
    const template = Handlebars.compile(html);
    const options = {
      Messages: [
        {
          From: {
            Email: "contact@uslow.io",
            Name: "uSlow",
          },
          To: [
            {
              Email: to,
              Name: to,
            },
          ],
          Subject: subject,
          HTMLPart: template(params),
        },
      ],
    }
    if (from) {
      options.Messages[0].Headers = { 'Reply-To': from }
    }
    const request = mailjet.post("send", { version: "v3.1" }).request(options);
    return request;
  }
  console.log("Mailjet not configured");
};

module.exports = {
  mailjet,
  send,
};
