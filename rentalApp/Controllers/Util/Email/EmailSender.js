// const {google} =require('googleapis');
import { createTransport } from 'nodemailer';
import Mailgen from 'mailgen';
import {configure} from './Config.js';
import crypto from 'crypto';
const sendMail= (options) => {

  let config = {
    service : 'gmail',
    auth : {
        user: configure.EMAIL,
        pass: configure.PASSWORD
    }
}

let transporter = createTransport(config);


  transporter.sendMail(options).then((error,info) => {
if (info && info.response){
  console.log('Email sent: ' + info.response);

}
if (error) {
  console.log(error);
} else {
  console.log('Email sent');
}

    
      
  }).catch(error => {
      console.error(error);
  })


}

export const  VerifyEmail=({email,code,name})=>{
  const algorithm = 'aes-256-cbc';
  const EncryptionKey = process.env.EncryptionKey;
  const InitializationVector = '6d0cf9de18a8c78b5f888b42d9855bd2';
    // Generate the email body with verification URL link and expiration timestamp
    const expirationTime = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
    const expirationTimestamp = Date.now() + expirationTime;
// When generating the link
const cipher = crypto.createCipheriv(algorithm, Buffer.from(EncryptionKey), Buffer.from(InitializationVector));
let encrypted = cipher.update(`email=${email}&code=${code}&expires=${expirationTimestamp}`, 'utf-8', 'hex');
encrypted += cipher.final('hex');
const verificationLink = `https://comradesrentals.vercel.app/verifying?data=${encrypted}`;

  
  

let MailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'ComradesBiz Association',
    link: 'https://comradesrentals.vercel.app',
    logo: 'https://imgs.search.brave.com/jUDBL1q0lAoPiM4Y3REgL5E_D4jw35FfxF4oySSr6G4/rs:fit:711:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC4y/MFJiVThQalV1NW9w/OFg3NVFiUURnSGFF/OCZwaWQ9QXBp'
  }
})
// generate the email body with verification URL link

let response = {
  body: {
    name: `${name}`,
    intro: `Dear ${name},\n\nThank you for registering for our website! Before you can start using your account, we need to verify your email address. Please click on the following link to complete the verification process:`,
    action: {
      instructions: 'Verification Link:',
      button: {
        color: '#22BC66',
        text: 'Verify Email Address',
        link: verificationLink
      }
    },
    outro: 'Please note that this link is only valid for the next 24 hours. After that, you will need to request a new verification email.\n\nThank you for your cooperation.'
  }
}

let mail = MailGenerator.generate(response)

const options= {
   
    from: `ComradesBiz <${configure.EMAIL}>`,
    to: `${email}`,
    subject: `Message From  ComradesBiz Email verification`,
    html:mail

}
sendMail(options)
}
export const ResetEmail=(email,resetToken)=>{
  const mailOptions = {
    from: 'info@glenayienda.tech',
    to: email,
    subject: 'Password Reset Request',
    text: `You are receiving this email because you (or someone else) have requested a password reset. Please click on the following link to reset your password: http://localhost:3000/reset-password/${resetToken}.\n\n Please note that this link is only valid for the next 1 hour.`,
  };
  sendMail(mailOptions);

}



export const contactUs=({name,email,phone,message})=>{
  let MailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'ComradesBiz Association',
      link: 'https://www.comradesbiz.live',
      logo: 'https://imgs.search.brave.com/jUDBL1q0lAoPiM4Y3REgL5E_D4jw35FfxF4oySSr6G4/rs:fit:711:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC4y/MFJiVThQalV1NW9w/OFg3NVFiUURnSGFF/OCZwaWQ9QXBp'
    }
  })
  let response={
  body: {
    name: name,
    intro: 'A new customer has inquired about your products:',
    table: {
      data: [
        { key: 'Name', value: name },
        { key: 'Email', value: email },
        { key: 'Phone', value: phone },
        { key: 'Message', value: message }
      ],
      columns: {
        customWidth: {
          key: '20%',
          value: '80%'
        },
        fill: {
          type: 'fill',
          color: '#E5E5E5'
        },
        textColor: {
          type: 'textColor',
          color: '#333333'
        },
        paddingLeft: {
          type: 'padding',
          value: '16px 24px 16px 0'
        },
        paddingRight: {
          type: 'padding',
          value: '16px 0 16px 24px'
        },
        heading: {
          type: 'textStyle',
          bold: true,
          color: '#333333'
        }
      }
    },
    outro: 'comradesBiz association'
  }
}
let mail = MailGenerator.generate(response);
const options = {
   
  from: ` ${email}`,
  to: `${configure.EMAIL}`,
  subject: `Message From  ComradesBiz ..a customer Enquiry`,
  html:mail

}
sendMail(options)
}


