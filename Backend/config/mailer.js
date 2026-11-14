const { Resend } = require("resend");

if (!process.env.RESEND_API_KEY) {
  console.warn("RESEND_API_KEY is not configured");
}

const resend = new Resend(process.env.RESEND_API_KEY);

const transporter = {
  sendMail: async (mailOptions) => {
    const from =
      process.env.EMAIL_FROM || "MatruCare AI <onboarding@resend.dev>";

    const { data, error } = await resend.emails.send({
      from,
      to: Array.isArray(mailOptions.to)
        ? mailOptions.to
        : [mailOptions.to],
      subject: mailOptions.subject,
      html: mailOptions.html,
      text: mailOptions.text,
      replyTo: mailOptions.replyTo,
    });

    if (error) {
      console.error("Resend email error:", error);
      throw new Error(error.message || "Email sending failed");
    }

    console.log("Email accepted by Resend:", data?.id);
    return { messageId: data?.id };
  },
};

module.exports = transporter;