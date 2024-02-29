import nodemailer from 'nodemailer';
const parseExamDate = (dt) => {
  const date = new Date(dt).getDate();
  const month = new Date(dt).getMonth();
  const year = new Date(dt).getFullYear();
  return `${String(date).padStart(2, '0')}/${String(month).padStart(
    2,
    '0'
  )}/${year}`;
};

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // console.log(options);
  console.log(process.env.EMAIL_USERNAME);
  const html = `<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <!-- <link rel="stylesheet" href="./email.css" /> -->
    <style>
      .ht {
        min-height: 10vh;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;

        background: rgb(225, 225, 225);
        padding: 4rem;
      }
      .title {
        align-self: center;
      }
      .title2 {
        align-self: center;
      }
      .flex {
        display: flex;
        gap: 1rem;
      }
      .con {
        padding-left: 5rem;
      }

      .flex-col {
        display: flex;
        justify-content: space-around;
      }
      img {
        height: 200px;
        width: 200px;
        border-radius: 50%;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Registration to Exam Successful</h1>
      <div class="h2">You have succesfully registered to Exam</div>
      <div class="ht w-full">
        <h2 class="title">Institution Name</h2>
        <p class="title2">Description of the Institution</p>
        <div class="flex-col">
          <div class="con">
            <div class="flex">
              <p>Student Name:</p>
              <p>${options.user.userName}</p>
            </div>
            <div class="flex">
              <p>Exam:</p>
              <p>${options.exam}</p>
            </div>
            <div class="flex">
              <p>Year:</p>
              <p>${options.user.year}</p>
            </div>
            <div class="flex">
              <p>Date:</p>
              <p>${parseExamDate(options.date)}</p>
            </div>
          </div>
          <div class="pic">
            <img
              src="https://imgs.search.brave.com/bFF8_xQy_-cBA55VIKAy68h8rgyZDOyvB5FXxL1xR5g/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzY1LzEwLzQ3/LzM2MF9GXzY1MTA0/NzE4X3gxN2E3Nnd6/V0tJbTNCbGhBNnV5/WVZrRHM5OTgyYzZx/LmpwZw"
              alt="img"
            />
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
`;
  // console.log(options);
  const mailOptions = {
    from: 'Institute of Mr.K',
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: html,
    attachments: [
      {
        filename: 'example.txt', // Name of the attachment
        content: 'Example file content', // Content of the attachment
      },
    ],
  };

  await transporter.sendMail(mailOptions);
  // console.log(process.env.EMAIL_PASSWORD);
};
export default sendEmail;
