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
    minute: '2-digit',
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
      `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('OTP sent to email');
  } catch (err) {
    console.error('Error sending OTP:', err);
  }
};

export const sendBookingEmails = async (booking, amount) => {
  console.log('Inside sendBookingEmails');
  const customerEmail = booking.user.email;
  const ownerEmail = booking.property.owner.email;

  let customerMailOptions = {
    from: '"Book My Venue" <bookmyvenue7@gmail.com>',
    to: customerEmail,
    subject: 'Booking Confirmation',
    html: `
       <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet" />
    <title>Booking Confirmation</title>
    <style>
        body {
            font-family: Poppins, Nunito, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            background-color: #b4457f;
            color: white;
            text-align: center;
        }

        .content {
            background-color: #f9f9f9;
            padding-right: 20px;
            padding-left: 20px;
            /* padding: 20px; */
            border-radius: 5px;
        }

        .booking-details,
        .owner-details {
            background-color: white;
            padding: 15px;
            margin-top: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        h1,
        h2 {
            margin-top: 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        span{
            font-weight: bold;
            color: rgb(168, 168, 0);
        }

        th,
        td {
            padding: 10px;
            border-bottom: 1px solid #ddd;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
        }

        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 0.9em;
            color: #666;
        }
    </style>
</head>

<body>
    <div class="header">
        <h1>BookMyVenue</h1>
    </div>
    <div class="content">
        <h2>Booking Confirmation</h2>
        <p>Dear ${booking.user.firstName},</p>
        <p>Thank you for your booking. Here are the details:</p>
        <div class="booking-details">
            <h3>Booking Information</h3>
            <table>
                <tr>
                    <th>Booking ID</th>
                    <td>${booking.id.substring(0, 8).toUpperCase()}</td>
                </tr>
                <tr>
                    <th>Property</th>
                    <td>${booking.property.propertyName}</td>
                </tr>
                <tr>
                    <th>Check-in</th>
                    <td>${formatDate(booking.startDate)}</td>
                </tr>
                <tr>
                    <th>Check-out</th>
                    <td>${formatDate(booking.endDate)}</td>
                </tr>
                <tr>
                    <th>Number of Guests</th>
                    <td>${booking.property.capacity}</td>
                </tr>
                <tr>
                    <th>Booking Status</th>
                    <td><span>OWNER APPROVEL PENDING</span></td>
                </tr>
                <tr>
                    <th>Total Amount Paid</th>
                    <td>Rs.${amount}</td>
                </tr>

            </table>
        </div>

        <div class="owner-details">
            <h3>Property Owner Information</h3>
            <p>If you need to contact the owner before your event, here are their details:</p>
            <table>
                <tr>
                    <th>Owner Name</th>
                    <td>${booking.property.owner.firstName} ${booking.property.owner.lastName}</td>
                </tr>
                <tr>
                    <th>Contact Number</th>
                    <td>${booking.property.owner.phone}</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>${booking.property.owner.email}</td>
                </tr>
            </table>
        </div>

        <p>Please note that your booking is currently <span>OWNER APPROVEL PENDING</span>. We will notify you once it's approved.</p>
        <p>If you have any questions, please don't hesitate to contact us.</p>
        <p>Best regards,<br>Venue Booking Team</p>
    </div>
    <div class="footer">
        <p>© 2024 BookMyVenue. All rights reserved.</p>
    </div>
</body>

</html>
    `,
  };

  let ownerMailOptions = {
    from: '"Book My Venue" <bookmyvenue7@gmail.com>',
    to: ownerEmail,
    subject: 'New Booking Request',
    html: `
     <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet" />
    <title>New Booking Request</title>
    <style>
        body {
            font-family: Poppins, Nunito, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            background-color: #b4457f;
            color: white;
            text-align: center;
        }

        .content {
            background-color: #f9f9f9;
            padding-right: 20px;
            padding-left: 20px;
            /* padding: 20px; */
            border-radius: 5px;
        }

        .booking-details,
        .owner-details {
            background-color: white;
            padding: 15px;
            margin-top: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        h1,
        h2 {
            margin-top: 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        span{
            font-weight: bold;
            color: rgb(168, 168, 0);
        }

        th,
        td {
            padding: 10px;
            border-bottom: 1px solid #ddd;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
        }

        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 0.9em;
            color: #666;
        }
    </style>
</head>

<body>
    <div class="header">
        <h1>BookMyVenue</h1>
    </div>
    <div class="content">
        <h2>New Booking Request</h2>
        <p>Dear ${booking.property.owner.firstName},</p>
        <p>A new booking request has been received. Here are the details:</p>
        <div class="booking-details">
            <h3>Booking Information</h3>
            <table>
                <tr>
                    <th>Booking ID</th>
                    <td>${booking.id.substring(0, 8).toUpperCase()}</td>
                </tr>
                <tr>
                    <th>Property</th>
                    <td>${booking.property.propertyName}</td>
                </tr>
                <tr>
                    <th>Check-in</th>
                    <td>${formatDate(booking.startDate)}</td>
                </tr>
                <tr>
                    <th>Check-out</th>
                    <td>${formatDate(booking.endDate)}</td>
                </tr>
                <tr>
                    <th>Number of Guests</th>
                    <td>${booking.property.capacity}</td>
                </tr>
                <tr>
                    <th>Booking Status</th>
                    <td><span>OWNER APPROVEL PENDING</span></td>
                </tr>
                <tr>
                    <th>Total Amount Paid</th>
                    <td>Rs.${amount}</td>
                </tr>

            </table>
        </div>

        <div class="owner-details">
            <h3>Customer Information</h3>
            <p>If you need to contact the customer before approve booking, here are their details:</p>
            <table>
                <tr>
                    <th>Name</th>
                    <td>${booking.user.firstName} ${booking.property.owner.lastName}</td>
                </tr>
                <tr>
                    <th>Number</th>
                    <td>${booking.user.phone}</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>${booking.user.email}</td>
                </tr>
            </table>
        </div>
        <p>Please review and approve this booking request at your earliest convenience.</p>
        <p>If you have any questions, please don't hesitate to contact us.</p>
        <p>Best regards,<br>Venue Booking Team</p>
    </div>
    <div class="footer">
        <p>© 2024 BookMyVenue. All rights reserved.</p>
    </div>
</body>

</html>
    `,
  };

  try {
    let customerInfo = await transporter.sendMail(customerMailOptions);
    console.log('Email sent to customer: ' + customerInfo.response);

    // Send email to owner
    let ownerInfo = await transporter.sendMail(ownerMailOptions);
    console.log('Email sent to owner: ' + ownerInfo.response);

    return { success: true, message: 'Emails sent successfully' };
  } catch (err) {
    console.error('Error sending OTP:', err);
  }
};

export const sendEmailToCusAfterAcceptBooking = async (booking) => {
  const customerEmail = booking.user.email;

  let customerMailOptions = {
    from: '"Book My Venue" <bookmyvenue7@gmail.com>',
    to: customerEmail,
    subject: `Booking Confirmed: Your Stay at ${booking.property.propertyName}`,
    html: `
       <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet" />
    <title>Booking Confirmation Update</title>
    <style>
        body {
            font-family: Poppins, Nunito, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            background-color: #b4457f;
            color: white;
            text-align: center;
        }

        .content {
            background-color: #f9f9f9;
            padding-right: 20px;
            padding-left: 20px;
            /* padding: 20px; */
            border-radius: 5px;
        }

        .booking-details,
        .owner-details {
            background-color: white;
            padding: 15px;
            margin-top: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        h1,
        h2 {
            margin-top: 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th,
        td {
            padding: 10px;
            border-bottom: 1px solid #ddd;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
        }

        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 0.9em;
            color: #666;
        }
    </style>
</head>

<body>
    <div class="header">
        <h1>BookMyVenue</h1>
    </div>
    <div class="content">
        <h2>Booking Confirmation Update</h2>
        <p>Dear ${booking.user.firstName},</p>
        <p>Great news! Your booking has been confirmed by the owner. Here are the details of your upcoming event:</p>

        <div class="booking-details">
            <h3>Booking Information</h3>
            <table>
                <tr>
                    <th>Booking ID</th>
                    <td>${booking.id.substring(0, 8).toUpperCase()}</td>
                </tr>
                <tr>
                    <th>Property</th>
                    <td>${booking.property.propertyName}</td>
                </tr>
                <tr>
                    <th>Check-in</th>
                    <td>${formatDate(booking.startDate)}</td>
                </tr>
                <tr>
                    <th>Check-out</th>
                    <td>${formatDate(booking.endDate)}</td>
                </tr>
                 <tr>
                    <th>Number of Guests</th>
                    <td>${booking.property.capacity}</td>
                </tr>
                 <tr>
                    <th>Booking Status</th>
                    <td>${booking.bookingStatus}</td>
                </tr>
                <tr>
                    <th>Total Amount</th>
                    <td>Rs.${booking.payments[0].amount}</td>
                </tr>

            </table>
        </div>

        <div class="owner-details">
            <h3>Property Owner Information</h3>
            <p>If you need to contact the owner before your event, here are their details:</p>
            <table>
                <tr>
                    <th>Owner Name</th>
                    <td>${booking.property.owner.firstName} ${booking.property.owner.lastName}</td>
                </tr>
                <tr>
                    <th>Contact Number</th>
                    <td>${booking.property.owner.phone}</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>${booking.property.owner.email}</td>
                </tr>
            </table>
        </div>

        <p>We're excited for your upcoming event! If you have any questions or need further assistance, please don't
            hesitate to contact us or the property owner.</p>
        <p>Enjoy your event at ${booking.property.propertyName}!</p>
    </div>
    <div class="footer">
        <p>© 2024 BookMyVenue. All rights reserved.</p>
    </div>
</body>

</html>
    `,
  };

  try {
    let customerInfo = await transporter.sendMail(customerMailOptions);
    console.log('Email sent to customer: ' + customerInfo.response);

    return { success: true, message: 'Emails sent successfully' };
  } catch (err) {
    console.error('Error sending OTP:', err);
  }
};

export const sendEmailToCusAfterRejetBooking = async (booking) => {
  const customerEmail = booking.user.email;

  let customerMailOptions = {
    from: '"Book My Venue" <bookmyvenue7@gmail.com>',
    to: customerEmail,
    subject: `Booking Update: Your Event at ${booking.property.propertyName}`,
    html: `
     <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet" />
    <title>Booking Update</title>
    <style>
        body {
            font-family: Poppins, Nunito, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            background-color: #b4457f;
            color: white;
            text-align: center;
        }

        .content {
            background-color: #f9f9f9;
            padding-right: 20px;
            padding-left: 20px;
            /* padding: 20px; */
            border-radius: 5px;
        }

        .booking-details,
        .owner-details {
            background-color: white;
            padding: 15px;
            margin-top: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        h1,
        h2 {
            margin-top: 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th,
        td {
            padding: 10px;
            border-bottom: 1px solid #ddd;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
        }

        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 0.9em;
            color: #666;
        }
    </style>
</head>

<body>
        <div class="header">
          <h1>BookMyVenue</h1>
        </div>
        <div class="content">
          <h2>Booking Update</h2>
          <p>Dear ${booking.user.firstName},</p>
          <p>We regret to inform you that your booking request for ${booking.property.propertyName} has been declined by the property owner. We understand this may be disappointing, and we're here to assist you in finding an alternative venue.</p>

          <div class="booking-details">
            <h3>Booking Information</h3>
            <table>
              <tr><th>Booking ID</th><td>${booking.id.substring(0, 8).toUpperCase()}</td></tr>
              <tr><th>Property</th><td>${booking.property.propertyName}</td></tr>
              <tr><th>Check-in</th><td>${formatDate(booking.startDate)}</td></tr>
              <tr><th>Check-out</th><td>${formatDate(booking.endDate)}</td></tr>
              <tr><th>Amount Paid</th><td>Rs.${booking.payments[0].amount}</td></tr>
            </table>
          </div>

          <p>Here's what you can do next:</p>
          <ul>
            <li>Browse our other available properties for your dates</li>
            <li>Contact our customer support for assistance in finding an alternative</li>
            <li>Adjust your dates or requirements and try booking again</li>
          </ul>

          <p>Payments related to this booking will be fully refunded to your original payment method within 5-7 business days.</p>

          <a href="http://localhost:5173/" class="cta-button">Find Another Venue</a>

          <p>We apologize for any inconvenience this may have caused. If you have any questions or need further assistance, please don't hesitate to contact our customer support team.</p>
        </div>
        <div class="footer">
          <p>© 2024 BookMyVenue. All rights reserved.</p>
        </div>
      </body>
      </html>
    `,
  };

  try {
    let customerInfo = await transporter.sendMail(customerMailOptions);
    console.log('Email sent to customer: ' + customerInfo.response);

    return { success: true, message: 'Emails sent successfully' };
  } catch (err) {
    console.error('Error sending OTP:', err);
  }
};

export const sendEmailToOwnerAfterCancelBooking = async (booking) => {
  const ownerEmail = booking.property.owner.email;

  let OwnerMailOptions = {
    from: '"Book My Venue" <bookmyvenue7@gmail.com>',
    to: ownerEmail,
    subject: `Booking Cancellation: ${booking.property.propertyName}`,
    html: `
     <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet" />
    <title>Booking Cancellation</title>
    <style>
        body {
            font-family: Poppins, Nunito, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            background-color: #b4457f;
            color: white;
            text-align: center;
        }

        .content {
            background-color: #f9f9f9;
            padding-right: 20px;
            padding-left: 20px;
            /* padding: 20px; */
            border-radius: 5px;
        }

        .booking-details,
        .owner-details {
            background-color: white;
            padding: 15px;
            margin-top: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        h1,
        h2 {
            margin-top: 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th,
        td {
            padding: 10px;
            border-bottom: 1px solid #ddd;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
        }

        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 0.9em;
            color: #666;
        }
    </style>
</head>

<body>
        <div class="header">
          <h1>BookMyVenue</h1>
        </div>
        <div class="content">
          <h2>Booking Cancellation</h2>
          <p>Dear ${booking.property.owner.firstName},</p>
          <p>We regret to inform you that a booking for your property, ${booking.property.propertyName}, has been cancelled by the customer. Here are the details of the cancelled booking:</p>
          <div class="booking-details">
            <h3>Booking Information</h3>
            <table>
              <tr><th>Booking ID</th><td>${booking.id.substring(0, 8).toUpperCase()}</td></tr>
              <tr><th>Property</th><td>${booking.property.propertyName}</td></tr>
              <tr><th>Check-in</th><td>${formatDate(booking.startDate)}</td></tr>
              <tr><th>Check-out</th><td>${formatDate(booking.endDate)}</td></tr>
              <tr><th>Amount Paid</th><td>Rs.${booking.payments[0].amount}</td></tr>
            <tr><th>Customer Name</th><td>${booking.user.firstName} ${booking.user.lastName}</td></tr>
              </table>
          </div>

         <p>Next steps:</p>
          <ul>
            <li>Your property's availability for these dates has been automatically restored in our system.</li>
            <li>Any applicable cancellation fees will be processed according to your property's cancellation policy.</li>
            <li>You may want to review your calendar and consider any necessary adjustments.</li>
          </ul>

         <p>We understand that cancellations can be inconvenient, and we appreciate your understanding. Our team is working to promote your property to secure new bookings for these dates.</p>

          <p>If you have any questions or concerns regarding this cancellation, please don't hesitate to contact our property support team.</p>
        </div>
        <div class="footer">
          <p>© 2024 BookMyVenue. All rights reserved.</p>
        </div>
      </body>
      </html>
    `,
  };

  try {
    let OwnerInfo = await transporter.sendMail(OwnerMailOptions);
    console.log('Email sent to Owner: ' + OwnerInfo.response);

    return { success: true, message: 'Emails sent successfully' };
  } catch (err) {
    console.error('Error sending OTP:', err);
  }
};
