import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("process.env.SMTP_HOST", process.env.SMTP_HOST);
    const { name, email, message } = JSON.parse(req.body);
    console.log("Received POST request with data:", { name, email, message });

    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD,
      },
    });

    // Setup email data for the user
    let userMailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Wir haben Ihre Anfrage erhalten",
      text: "Wir haben Ihre Anfrage erhalten und werden so schnell wie möglich antworten.",
    };

    // Setup email data for the admin
    let adminMailOptions = {
      from: process.env.SENDER_EMAIL,
      to: process.env.SENDER_EMAIL,
      subject: `Neue Nachricht von ${name}`,
      text: `${name} hat eine Nachricht gesendet: ${message}`,
    };

    // Send mail with defined transport object
    try {
      console.log(
        "Attempting to send email to user with options:",
        userMailOptions
      );
      await transporter.sendMail(userMailOptions);
      console.log("User email sent successfully");

      console.log(
        "Attempting to send email to admin with options:",
        adminMailOptions
      );
      await transporter.sendMail(adminMailOptions);
      console.log("Admin email sent successfully");

      res.status(200).json({ message: "Emails sent successfully" });
    } catch (error) {
      console.error("Error sending emails:", error);
      res.status(500).json({ error: "Failed to send emails" });
    }
  } else {
    console.warn(`Method ${req.method} Not Allowed`);
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
