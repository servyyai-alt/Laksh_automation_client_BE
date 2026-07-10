const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: { rejectUnauthorized: false }
  });
};

exports.sendEnquiryEmail = async (enquiry) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('Email credentials are not configured');
  }

  if (!process.env.ADMIN_EMAIL) {
    throw new Error('ADMIN_EMAIL is not configured');
  }

  const transporter = createTransporter();
  const fromAddress = process.env.EMAIL_FROM || process.env.EMAIL_USER;

  // Admin notification
  await transporter.sendMail({
    from: `"Laksh Automations Website" <${fromAddress}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New Enquiry from ${enquiry.name} - ${enquiry.city}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0077FF, #00B4D8); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Product Enquiry</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0;">Laksh Automations Website</p>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border: 1px solid #eee;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px; font-weight: bold; color: #555; width: 40%;">Name</td><td style="padding: 10px; color: #333;">${enquiry.name}</td></tr>
            <tr style="background: white;"><td style="padding: 10px; font-weight: bold; color: #555;">Mobile</td><td style="padding: 10px; color: #333;">${enquiry.mobile}</td></tr>
            <tr><td style="padding: 10px; font-weight: bold; color: #555;">City</td><td style="padding: 10px; color: #333;">${enquiry.city}</td></tr>
            <tr style="background: white;"><td style="padding: 10px; font-weight: bold; color: #555;">Product Required</td><td style="padding: 10px; color: #333;">${enquiry.productRequired}</td></tr>
            <tr><td style="padding: 10px; font-weight: bold; color: #555;">Message</td><td style="padding: 10px; color: #333;">${enquiry.message || 'No message provided'}</td></tr>
            <tr style="background: white;"><td style="padding: 10px; font-weight: bold; color: #555;">Date</td><td style="padding: 10px; color: #333;">${new Date().toLocaleString('en-IN')}</td></tr>
          </table>
        </div>
        <div style="background: #0077FF; padding: 15px; text-align: center; border-radius: 0 0 8px 8px;">
          <p style="color: white; margin: 0; font-size: 14px;">© Laksh Automations, Coimbatore, Tamil Nadu</p>
        </div>
      </div>
    `
  });
};
