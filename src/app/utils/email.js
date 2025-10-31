import nodemailer from "nodemailer";

export const sendBookingEmail = async (to, name, bookingId) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Dream Venue" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Booking Confirmation (Pending Payment)",
      html: `
        <h2>Hello ${name},</h2>
        <p>Your booking has been created successfully (Booking ID: <b>${bookingId}</b>).</p>
        <p>Please complete your payment within <b>1 day</b> to confirm your booking.</p>
        <p>If payment is not made within this time, your booking will expire automatically.</p>
        <br/>
        <p>Thank you,<br/>Dream Venue Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Booking email sent to:", to);
  } catch (error) {
    console.error("Email send error:", error);
  }
};
