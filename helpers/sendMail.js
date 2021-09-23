const sendGrid = require("@sendgrid/mail");
const { InternalServerError } = require("http-errors");

const { SENDGRID_API_KEY } = process.env;

sendGrid.setApiKey(SENDGRID_API_KEY);

/* app.js
const mail = {
  to: "mamchur243@gmail.com",
  from: "vetalpatsi@gmail.com",
  subject: "Registration on site",
  html: "<p>Сongratulations you have registered on our website</p>",
};
sendGrid
  .send(mail)
  .then(() => console.log("Email success send."))
  .catch((error) => console.log(error.message));
*/
const sendMail = async (data) => {
  try {
    const mail = { ...data, from: "vetalpatsi@gmail.com" };
    await sendGrid.send(mail);
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

module.exports = sendMail;
