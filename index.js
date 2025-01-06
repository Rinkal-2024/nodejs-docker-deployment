'use strict';

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const promClient = require('prom-client');

// Constants
const PORT = process.env.APP_PORT_NUMBER || 3001;
const HOST = '192.168.0.120';
// Create an instance of the Prometheus client
const client = promClient;

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

// App
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());
 
// Middleware to serve static files
app.use(express.static('public'));

app.get("/metrics", async(req, res) => {
  res.setHeader("Content-Type", client.register.contentType);
  const metrics = await client.register.metrics();
  res.send(metrics);
});

// Route for the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});



// Route to handle form submissions
app.post('/api/hire-me', async (req, res) => {
  const { companyName, yourName, hrEmail, contactInfo, profileRole } = req.body;

  try {
    // Configure nodemailer to send emails
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // false for TLS; true for SSL
      auth: {
        user: 'qwe@gmail.com',
        pass: 'asd'
      }
    });

    // Email options
    let mailOptions = {
      from: 'qwe@gmail.com', // Sender email address
      to: 'edc@gmail.com', // Recipient email address
      subject: 'New Hire Inquiry',
      text: `Company: ${companyName}\nName: ${yourName}\nHR Email: ${hrEmail}\nContact Info: ${contactInfo}\nRole: ${profileRole}`
    };

    // Send email to portfolio owner
    await transporter.sendMail(mailOptions);

    // Send acknowledgement email to the user
    mailOptions.to = hrEmail;
    mailOptions.subject = 'Acknowledgement Email';
    mailOptions.text = 'Thank you for your inquiry. We will get back to you soon.';
    await transporter.sendMail(mailOptions);

    res.status(200).send('Form submitted successfully');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal server error');
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});