const axios = require("axios");
const SEND_GRID_API_URL = "https://api.sendgrid.com/v3/mail/send";
const sendEmail = async context => {
  const body = context.req.body;
  const data = {
    from: {
      email: body.senderEmail
    },
    personalizations: [
      {
        to: [
          {
            email: body.recipientEmail
          }
        ],
        subject: body.subject
      }
    ],
    content: [
      {
        type: "text/plain",
        value: body.content
      }
    ]
  };
  const response = await axios({
    url: SEND_GRID_API_URL,
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`
    },
    data: data
  });
  return response;
};
module.exports = async function(context, req) {
  try {
    const result = await sendEmail(context);
    context.res = {
      body: { message: "Check your inbox" }
    };
  } catch (error) {
    console.log(error);
    context.res = {
      status: 500,
      body: { message: "An error has occured, please try again later." }
    };
  }
};
