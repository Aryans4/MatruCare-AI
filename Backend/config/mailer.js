const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async (mailOptions) => {
  const { data, error } = await resend.emails.send({
    from:
      process.env.EMAIL_FROM ||
      "MatruCare AI <onboarding@resend.dev>",
    to: Array.isArray(mailOptions.to)
      ? mailOptions.to
      : [mailOptions.to],
    subject: mailOptions.subject,
    html: mailOptions.html,
    text: mailOptions.text,
    replyTo: mailOptions.replyTo,
  });

  if (error) {
    console.error("Resend error:", error);
    throw new Error(error.message || "Email sending failed");
  }

  return { messageId: data?.id };
};

const sendOtp = async (email, otp) => {
  return sendMail({
    to: email,
    subject: "MatruCare AI - Email Verification OTP",
    html: `
      <h2>MatruCare AI</h2>
      <p>Your email verification OTP is:</p>
      <h1>${otp}</h1>
      <p>This OTP expires in 10 minutes. Do not share it with anyone.</p>
    `,
  });
};

module.exports = { sendOtp, sendMail };