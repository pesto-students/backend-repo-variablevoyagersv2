import { config } from '@/config';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: config.EMAIL.EMAIL_HOST,
    port: config.EMAIL.EMAIL_PORT,
    auth: {
        user: config.EMAIL.EMAIL_USERNAME,
        pass: config.EMAIL.EMAIL_PASSWORD,
    },
});

export const sendOTPEmail = async (email, otp) => {
    const mailOptions = {
        from: config.EMAIL.FROM_EMAIL,
        to: email,
        subject: 'OTP for Verify',
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
        <h1 style="color: #b4457f; font-size: 24px; font-weight: bold; margin-top: 0;">BookMyVenue</h1>
          <h2 style="color: #4a4a4a;">Your One-Time Password</h2>
          <p style="font-size: 16px; color: #666;">Use the following OTP to complete your action:</p>
          <div style="background-color: #f0f0f0; padding: 10px; text-align: center; font-size: 24px; font-weight: bold; color: #333; border-radius: 3px;">
            ${otp}
          </div>
          <p style="font-size: 14px; color: #888; margin-top: 20px;">This OTP will expire in 10 minutes.</p>
        </div>
      `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('OTP sent to email');
    } catch (err) {
        console.error('Error sending OTP:', err);
    }
};