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

function formatDate(dateString) {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

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

export const sendBookingEmails = async (bookingData) => {

  const customerEmail = bookingData.user.email;
  const ownerEmail = bookingData.property.owner.email;

  let customerMailOptions = {
    from: '"Book My Venue" <bookmyvenue7@gmail.com>',
    to: customerEmail,
    subject: "Booking Confirmation",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #b4457f; font-size: 24px; font-weight: bold; margin-top: 0;">BookMyVenue</h1>  
      <h2 style="color: #4a4a4a;">Booking Confirmation</h2>
        <p>Dear ${bookingData.user.firstName},</p>
        <p>Thank you for your booking. Here are the details:</p>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Booking ID</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${bookingData.id}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Property</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${bookingData.property.propertyName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Check-in</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${formatDate(bookingData.startDate)}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Check-out</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${formatDate(bookingData.endDate)}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Status</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${bookingData.bookingStatus}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Amount Paid</td>
            <td style="padding: 10px; border: 1px solid #ddd;">Rs.${bookingData.payments[0].amount}</td>
          </tr>
        </table>
        <p>Please note that your booking is currently ${bookingData.bookingStatus}. We will notify you once it's approved.</p>
        <p>If you have any questions, please don't hesitate to contact us.</p>
        <p>Best regards,<br>Venue Booking Team</p>
      </div>
    `
  };

  let ownerMailOptions = {
    from: '"Book My Venue" <bookmyvenue7@gmail.com>',
    to: ownerEmail,
    subject: "New Booking Request",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #b4457f; font-size: 24px; font-weight: bold; margin-top: 0;">BookMyVenue</h1>   
      <h2 style="color: #4a4a4a;">New Booking Request</h2>
        <p>A new booking request has been received. Here are the details:</p>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Booking ID</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${bookingData.id}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Property</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${bookingData.property.propertyName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Check-in</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${formatDate(bookingData.startDate)}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Check-out</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${formatDate(bookingData.endDate)}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Customer Name</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${bookingData.user.firstName} ${bookingData.user.lastName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Customer Email</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${bookingData.user.email}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Customer Phone</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${bookingData.user.phone}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Amount Paid</td>
            <td style="padding: 10px; border: 1px solid #ddd;">Rs.${bookingData.payments[0].amount}</td>
          </tr>
        </table>
        <p>Please review and approve this booking request at your earliest convenience.</p>
      </div>
    `
  };

  try {
    let customerInfo = await transporter.sendMail(customerMailOptions);
    console.log("Email sent to customer: " + customerInfo.response);

    // Send email to owner
    let ownerInfo = await transporter.sendMail(ownerMailOptions);
    console.log("Email sent to owner: " + ownerInfo.response);

    return { success: true, message: "Emails sent successfully" };
  } catch (err) {
    console.error('Error sending OTP:', err);
  }
};

