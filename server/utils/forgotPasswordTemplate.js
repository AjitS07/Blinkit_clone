const forgotPasswordTemplate = ({ name, otp }) => {
  return `
<div style="font-family: Arial, Helvetica, sans-serif; background-color:#f4f6f8; padding:20px;">
  <div style="max-width:600px; margin:0 auto; background:#ffffff; padding:25px; border-radius:6px;">
    
    <h2 style="color:#2563eb; margin-bottom:20px;">
      Blinkit – Password Reset
    </h2>

    <p style="font-size:15px; color:#333;">
      Dear <strong>${name}</strong>,
    </p>

    <p style="font-size:14px; color:#555; line-height:1.6;">
      We received a request to reset your password for your Blinkit account.
      Please use the OTP below to proceed.
    </p>

    <div style="margin:25px 0; text-align:center;">
      <span style="
        display:inline-block;
        background:#f1f5f9;
        padding:12px 28px;
        font-size:24px;
        letter-spacing:5px;
        color:#111;
        font-weight:bold;
        border-radius:6px;">
        ${otp}
      </span>
    </div>

    <p style="font-size:14px; color:#555; line-height:1.6;">
      This OTP is valid for <strong>1 hour</strong>.  
      Please do not share this OTP with anyone.
    </p>

    <p style="font-size:14px; color:#555;">
      If you did not request a password reset, you can safely ignore this email.
    </p>

    <br />

    <p style="font-size:14px; color:#555;">
      Thank you,<br />
      <strong>Blinkit_clone By Ajit Sharma </strong>
    </p>

  </div>
</div>
  `;
};

export default forgotPasswordTemplate;
