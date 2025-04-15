import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    // Verify email configuration
    if (!process.env.EMAIL_PASSWORD) {
      console.error('EMAIL_PASSWORD is not set in environment variables');
      return NextResponse.json(
        { error: 'Email service configuration error' },
        { status: 500 }
      );
    }
    
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Configure Hostinger SMTP transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true, // use SSL
      auth: {
        user: 'info@yvsmechatronics.in', // Your full email address
        pass: process.env.EMAIL_PASSWORD, // Store this in .env file for security
      },
      tls: {
        // Do not fail on invalid certs
        rejectUnauthorized: false
      },
      debug: true, // Show debug output
    });

    // Prepare email content
    const mailOptions = {
      from: 'info@yvsmechatronics.in',
      to: 'info@yvsmechatronics.in', // Where you want to receive emails
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}
      `,
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
<h3>Message:</h3>
<p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send email with better error handling and fallback
    try {
      // First try with the primary SMTP configuration
      try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        
        return NextResponse.json(
          { 
            success: true, 
            message: 'Thank you for your message. We will get back to you soon!' 
          }
        );
      } catch (primaryEmailError) {
        console.error('Primary email configuration failed:', primaryEmailError);
        
        // Fallback to a secondary SMTP configuration (e.g., using a different port)
        const fallbackTransporter = nodemailer.createTransport({
          host: 'smtp.hostinger.com',
          port: 587, // Try alternative port
          secure: false, // TLS instead of SSL
          auth: {
            user: 'info@yvsmechatronics.in',
            pass: process.env.EMAIL_PASSWORD,
          },
          tls: {
            rejectUnauthorized: false
          },
        });
        
        // Try with fallback configuration
        const fallbackInfo = await fallbackTransporter.sendMail(mailOptions);
        console.log('Message sent with fallback: %s', fallbackInfo.messageId);
        
        return NextResponse.json(
          { 
            success: true, 
            message: 'Thank you for your message. We will get back to you soon!' 
          }
        );
      }
    } catch (emailError) {
      console.error('All email sending methods failed:', emailError);
      const errorMessage = emailError instanceof Error ? emailError.message : 'Unknown email sending error';
      return NextResponse.json(
        { error: `Email sending failed: ${errorMessage}` },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}