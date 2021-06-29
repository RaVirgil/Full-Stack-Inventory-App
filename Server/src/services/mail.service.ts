import * as nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export { sendMail };

async function sendMail(app: string, info: any): Promise<Error | void> {
  if (!app || typeof app !== "string") return Error("invalid params");  

    const fullname = info.fullname;
    const email = info.email;
    const phone = info.phone;
    const message = info.message;
    
    let smtpTransport = nodemailer.createTransport({      
      service: "gmail",       
      auth: {
        user: "sirhoodapp@gmail.com",
        pass: "Tr0bed0r0",
      },
      tls:{
        rejectUnauthorized: false
      }
    } as SMTPTransport.Options);

    let mailOptions = {
      from: "sirhoodapp@gmail.com",
      to: "andreyradu33@gmail.com",
      subject: `[${app}] User message ${new Date()}`,
      text: `${fullname} with email: ${email}, phone: ${phone} has the following message:\n ${message}`,
    };

    smtpTransport.sendMail(mailOptions, function (err,success) {
      if (err) {
        
      } else console.log(success);
    }); 
}
