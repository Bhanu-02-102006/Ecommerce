const nodemailer = require('nodemailer')
require('dotenv').config()
let mail=async(email,username)=>{
    //step1 create transport
    let transporter = await nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_PASS
        }
    })

    let message = {
        from : process.env.SMTP_MAIL,
        to : email,
        subject:"Account is created",
        text :`Hi, ${username} your account has been created successfully`,
        html:"<b>mail chusuko bro</b>"
    }

    await transporter.sendMail(message);
    console.log('Email sent✅');
}
module.exports=mail;