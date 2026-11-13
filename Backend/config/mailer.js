const nodemailer=require("nodemailer");

const transporter= nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
});

const sendOtp= async (email,otp)=>{
    await transporter.sendMail({
        from:`"MatruCare AI"<${process.env.EMAIL_USER}>`,
        to:email,
        subject:"Email-Verification, MatruCare AI",
        html:`
        <h2>Welcome to MatruCare AI</h2>
        <p>Your email verification Otp is:</p>
        <h1>${otp}</h1>
        <p>This otp expires in 10 minutes</p>
        <p>Please do not share this otp with anyone</p>
        `
    });
};

const sendRegistrationEmail = async (email, fullName, projectName) => {
    return await transporter.sendMail({
        from: `"MatruCare AI" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Hackathon Registration Confirmation - MatruCare AI",
        html: `
            <h2>Registration Successful!</h2>

            <p>Dear ${fullName},</p>

            <p>
                Thank you for registering for the
                MatruCare AI Hackathon.
            </p>

            <p><strong>Project:</strong> ${projectName}</p>

            <p>
                Your hackathon registration has been
                successfully received.
            </p>

            <p>Best regards,<br>MatruCare AI Team</p>
        `
    });
};


module.exports={sendOtp,sendRegistrationEmail};