import nodemailer from 'nodemailer';

export interface EmailData {
  totalSavingsYearly: number;
  topRecommendation: string;
}

export async function sendAuditEmail(email: string, auditData: EmailData, reportLink: string) {
  try {
    // Determine transport method
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.resend.com',
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: process.env.SMTP_SECURE !== 'false', // Default to true
      auth: {
        user: process.env.SMTP_USER || 'resend',
        pass: process.env.SMTP_PASS || process.env.EMAIL_API_KEY, // Use EMAIL_API_KEY as fallback for SMTP pass (common in Resend)
      },
    });

    const from = process.env.EMAIL_FROM || '"AudMint" <no-reply@credex.ai>';

    await transporter.sendMail({
      from,
      to: email,
      subject: "Your AI Spend Audit Report - AudMint by Credex",
      text: `Your audit report is ready! You could save up to $${auditData.totalSavingsYearly.toLocaleString()} per year.\n\nKey Recommendation: ${auditData.topRecommendation}\n\nView full report: ${reportLink}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; line-height: 1.6;">
          <h2 style="color: #10b981;">Your AI Spend Audit is Ready</h2>
          <p>Thank you for using AudMint. We've analyzed your stack and identified significant savings opportunities.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #6b7280; text-transform: uppercase; font-weight: 700;">Potential Annual Savings</p>
            <p style="margin: 5px 0; font-size: 32px; font-weight: 800; color: #111827;">$${auditData.totalSavingsYearly.toLocaleString()}</p>
            <p style="margin: 15px 0 0; font-size: 14px; font-weight: 600; color: #374151;">💡 ${auditData.topRecommendation}</p>
          </div>

          <p><a href="${reportLink}" style="display: inline-block; padding: 12px 24px; background-color: #000; color: white; text-decoration: none; border-radius: 6px; font-weight: 700;">View Your Full Report</a></p>
          
          <p style="font-size: 13px; color: #6b7280; margin-top: 30px;">
            If the button doesn't work, copy and paste this link:<br />
            ${reportLink}
          </p>
          <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
          <p><small style="color: #9ca3af;">Powered by AudMint by Credex. Helping you spend less on AI, so you can build more.</small></p>
        </div>
      `,
    });

    console.log(`✅ Audit email successfully sent to ${email}`);
  } catch (error: any) {
    console.error('❌ Failed to send audit email:', error.message);
    // Silent fail in production, but log error
  }
}
