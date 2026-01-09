// const verifyEmailTemplate = ({name,url})=>{
//     return `
// <p>Dear ${name},</p>
// <p>Thank you for registering Blinkit.</p>
// <a href="${url}" style="color:white;background : blue;margin-top : 10px">
//     Verify Email
// </a>

//     `
// }
// export default verifyEmailTemplate
const verifyEmailTemplate = ({ name, url }) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <p>Dear ${name},</p>

      <p>Thank you for registering with <b>Blinkit</b>.</p>

      <a 
        href="${url}" 
        style="
          display: inline-block;
          margin-top: 10px;
          padding: 10px 16px;
          color: #ffffff;
          background-color: #2563eb;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
        "
      >
        Verify Email
      </a>

      <p style="margin-top: 20px; font-size: 12px; color: #555;">
        If the button doesn’t work, copy and paste this link into your browser:
        <br />
        ${url}
      </p>
    </div>
  `;
};

export default verifyEmailTemplate;
