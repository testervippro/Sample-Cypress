import nodemailer from 'nodemailer';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Get the current file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function sendTestReport() {
    try {
        // Configure the SMTP transporter
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', // SMTP server
            port: 587, // Port number (587 for TLS, 465 for SSL)
            secure: false, // Use true for SSL, false for TLS
            auth: {
                user: 'testervipro@gmail.com', // Your email
                pass: 'cvocjijt xbgr ylnu' // Your app-specific password
            }
        });

        // Define email details
        const mailOptions = {
            from: '"Cypress Report" <testervippro@gmail.com>', // Sender's email
            to: 'cuxuanthoai@example.com', // Recipient's email
            subject: 'Cypress Test Report', // Email subject
            html: `
                <h1>Cypress Test Results</h1>
                <p>The Cypress tests have been completed. Please find the test report attached.</p>
            `,
            // attachments: [
            //     {
            //         filename: 'mochawesome_report.zip',
            //         path: path.resolve(__dirname, 'mochawesome_report.zip') // Adjust the path if necessary
            //     }
            // ]
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

// Call the function to send the email
sendTestReport();
