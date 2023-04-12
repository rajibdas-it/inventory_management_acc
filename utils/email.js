// const formData = require("form-data");
// const Mailgun = require("mailgun-js");
// const mailgun = new Mailgun(formData);

// const mg = mailgun.client({
//   username: "api",
//   key: "530373a24bb6ec5cea3d278b1d3e70ce-2cc48b29-31c12c6c",
// });

// module.exports.sendMailWithMailGun = async (data) => {
//   const result = await mg.messages.create(
//     "sandboxd51d0139844446c8a715b334596a0a26.mailgun.org",
//     {
//       from: "Mailgun Sandbox <postmaster@sandboxd51d0139844446c8a715b334596a0a26.mailgun.org>",
//       to: data.to,
//       subject: data.subject,
//       text: data.text,
//     }
//   );
//   return result.id;
// };
