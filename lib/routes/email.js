const nodemailer = require('nodemailer')
const smtpConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAILPW
  }
}
const transporter = nodemailer.createTransport(smtpConfig)

function send (req, res, next) {
  const payload = JSON.parse(req.body)

  transporter.sendMail(payload, (error, info) => {
    if (error) {
      console.log(error)
      res.send(400, { success: false })
    }

    console.log('Message sent: ' + info.response)
    res.send(200, { success: true })
  })
}

module.exports = {
  send
}
