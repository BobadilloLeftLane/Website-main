import * as nodemailer from 'nodemailer'
import { logger } from '../utils/logger'

interface ContactEmailData {
  name: string
  email: string
  company?: string
  phone?: string
  projectType: string
  budget: string
  timeline: string
  message: string
  submittedAt: string
  ip?: string | undefined
}

interface AutoReplyData {
  name: string
  email: string
  projectType: string
  language: string
}

interface EmailTemplate {
  subject: string
  greeting: string
  thankYou: string
  received: string
  responseTime: string
  whatFollowsTitle: string
  whatFollows: {
    analysis: string
    strategy: string
    consultation: string
    proposal: string
  }
  whyNovaTitle: string
  whyNova: {
    fast: string
    affordable: string
    transparent: string
    support: string
  }
  urgentContact: string
  footerCompany: string
  footerLocation: string
  footerDisclaimer: string
}

// Email template (always in English)
const emailTemplate: EmailTemplate = {
  subject: 'Thank you for contacting - Nova Studio Solutions Team will get back to you soon!',
  greeting: 'Dear',
  thankYou: 'Thank you for contacting us regarding your project!',
  received: 'Your message has been received',
  responseTime: 'Our team will analyze your needs and contact you within 24 hours with a detailed proposal.',
  whatFollowsTitle: 'What follows:',
  whatFollows: {
    analysis: 'Analysis: We thoroughly study your requirements',
    strategy: 'Strategy: We create a customized approach',
    consultation: 'Consultations: We schedule a call with the technical team',
    proposal: 'Proposal: We deliver complete project documentation'
  },
  whyNovaTitle: 'Why Nova Studio Solutions?',
  whyNova: {
    fast: 'Fast & efficient - development in the shortest possible time',
    affordable: 'Affordable prices - best quality-to-price ratio',
    transparent: 'Full transparency - you know exactly what you get',
    support: '24/7 support - we are here when you need us'
  },
  urgentContact: 'For urgent inquiries, you can contact us directly:',
  footerCompany: 'Nova Studio Solutions',
  footerLocation: 'Novi Sad, Serbia',
  footerDisclaimer: 'This message was automatically generated. Please do not reply to this email.'
}

// Create nodemailer transporter
const createTransporter = () => {
  // PrivateEmail SMTP configuration
  return nodemailer.createTransport({
    host: 'mail.privateemail.com',
    port: 587,
    secure: false, // Use STARTTLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  })
}

export const sendContactEmail = async (data: ContactEmailData): Promise<void> => {
  const transporter = createTransporter()

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #00D4FF, #8B5CF6); padding: 20px; text-align: center; }
        .header h1 { color: white; margin: 0; }
        .content { background: #f9f9f9; padding: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #555; }
        .value { margin-top: 5px; padding: 10px; background: white; border-left: 4px solid #00D4FF; }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #888; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚀 Nova Poruka sa Nova Studio Solutions Website</h1>
        </div>
        
        <div class="content">
          <div class="field">
            <div class="label">Ime i Prezime:</div>
            <div class="value">${data.name}</div>
          </div>
          
          <div class="field">
            <div class="label">Email:</div>
            <div class="value">${data.email}</div>
          </div>
          
          ${data.company ? `
          <div class="field">
            <div class="label">Kompanija:</div>
            <div class="value">${data.company}</div>
          </div>
          ` : ''}
          
          ${data.phone ? `
          <div class="field">
            <div class="label">Telefon:</div>
            <div class="value">${data.phone}</div>
          </div>
          ` : ''}
          
          <div class="field">
            <div class="label">Tip Projekta:</div>
            <div class="value">${data.projectType}</div>
          </div>
          
          <div class="field">
            <div class="label">Budžet:</div>
            <div class="value">${data.budget}</div>
          </div>
          
          <div class="field">
            <div class="label">Vremenski Okvir:</div>
            <div class="value">${data.timeline}</div>
          </div>
          
          <div class="field">
            <div class="label">Poruka:</div>
            <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
          </div>
          
          <div class="field">
            <div class="label">Poslato:</div>
            <div class="value">${new Date(data.submittedAt).toLocaleString('sr-RS')}</div>
          </div>
          
          ${data.ip ? `
          <div class="field">
            <div class="label">IP Adresa:</div>
            <div class="value">${data.ip}</div>
          </div>
          ` : ''}
        </div>
        
        <div class="footer">
          <p>📧 Nova Studio Solutions Contact Form System</p>
          <p>Automatski generisana poruka - ne odgovarajte na ovaj email</p>
        </div>
      </div>
    </body>
    </html>
  `

  const mailOptions = {
    from: process.env.EMAIL_FROM || 'nova-solutions@novastudiosolutions.com',
    to: process.env.EMAIL_TO || 'nova-solutions@novastudiosolutions.com',
    subject: `🚀 Nova poruka: ${data.projectType} - ${data.name}`,
    html: htmlContent,
    text: `
      Nova poruka sa Nova Studio Solutions website-a:
      
      Ime: ${data.name}
      Email: ${data.email}
      ${data.company ? `Kompanija: ${data.company}` : ''}
      ${data.phone ? `Telefon: ${data.phone}` : ''}
      Tip Projekta: ${data.projectType}
      Budžet: ${data.budget}
      Vremenski Okvir: ${data.timeline}
      
      Poruka:
      ${data.message}
      
      Poslato: ${new Date(data.submittedAt).toLocaleString('sr-RS')}
      ${data.ip ? `IP: ${data.ip}` : ''}
    `
  }

  try {
    const result = await transporter.sendMail(mailOptions)
    logger.info('Contact email sent successfully', {
      messageId: result.messageId,
      recipient: mailOptions.to
    })
  } catch (error) {
    logger.error('Failed to send contact email', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
    throw new Error('Failed to send email')
  }
}

export const sendAutoReply = async (data: AutoReplyData): Promise<void> => {
  const transporter = createTransporter()

  // Always use English template
  const template = emailTemplate

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #00D4FF, #8B5CF6); padding: 30px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 28px; }
        .content { background: #f9f9f9; padding: 30px; }
        .highlight { background: #00D4FF; color: white; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .features { margin: 20px 0; }
        .feature { margin: 10px 0; padding-left: 20px; }
        .footer { text-align: center; padding: 20px; font-size: 14px; color: #666; }
        .cta { background: #00D4FF; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚀 ${template.subject.split(' - ')[0]}</h1>
        </div>

        <div class="content">
          <p>${template.greeting} ${data.name},</p>

          <p>${template.thankYou.replace('project', data.projectType)}</p>

          <div class="highlight">
            <h3>✅ ${template.received}</h3>
            <p>${template.responseTime}</p>
          </div>

          <h3>${template.whatFollowsTitle}</h3>
          <div class="features">
            <div class="feature">📋 <strong>${template.whatFollows.analysis.split(':')[0]}:</strong> ${template.whatFollows.analysis.split(':')[1]}</div>
            <div class="feature">💡 <strong>${template.whatFollows.strategy.split(':')[0]}:</strong> ${template.whatFollows.strategy.split(':')[1]}</div>
            <div class="feature">📞 <strong>${template.whatFollows.consultation.split(':')[0]}:</strong> ${template.whatFollows.consultation.split(':')[1]}</div>
            <div class="feature">📄 <strong>${template.whatFollows.proposal.split(':')[0]}:</strong> ${template.whatFollows.proposal.split(':')[1]}</div>
          </div>

          <h3>${template.whyNovaTitle}</h3>
          <div class="features">
            <div class="feature">⚡ <strong>${template.whyNova.fast.split(' - ')[0]}</strong> - ${template.whyNova.fast.split(' - ')[1]}</div>
            <div class="feature">💰 <strong>${template.whyNova.affordable.split(' - ')[0]}</strong> - ${template.whyNova.affordable.split(' - ')[1]}</div>
            <div class="feature">🔒 <strong>${template.whyNova.transparent.split(' - ')[0]}</strong> - ${template.whyNova.transparent.split(' - ')[1]}</div>
            <div class="feature">🚀 <strong>${template.whyNova.support.split(' - ')[0]}</strong> - ${template.whyNova.support.split(' - ')[1]}</div>
          </div>

          <p>${template.urgentContact}</p>
          <p>📧 <strong>nova-solutions@novastudiosolutions.com</strong></p>
        </div>

        <div class="footer">
          <p><strong>${template.footerCompany}</strong></p>
          <p>${template.footerLocation}</p>
          <p>${template.footerDisclaimer}</p>
        </div>
      </div>
    </body>
    </html>
  `

  const mailOptions = {
    from: process.env.EMAIL_FROM || 'nova-solutions@novastudiosolutions.com',
    to: data.email,
    subject: `🚀 ${template.subject}`,
    html: htmlContent,
    text: `
      ${template.greeting} ${data.name},

      ${template.thankYou.replace('project', data.projectType)}

      ✅ ${template.received}

      ${template.responseTime}

      ${template.whatFollowsTitle}
      📋 ${template.whatFollows.analysis}
      💡 ${template.whatFollows.strategy}
      📞 ${template.whatFollows.consultation}
      📄 ${template.whatFollows.proposal}

      ${template.urgentContact}
      📧 nova-solutions@novastudiosolutions.com

      ${template.footerCompany}
      ${template.footerLocation}
    `
  }

  try {
    const result = await transporter.sendMail(mailOptions)
    logger.info('Auto-reply sent successfully', {
      messageId: result.messageId,
      recipient: data.email,
      language: data.language
    })
  } catch (error) {
    logger.error('Failed to send auto-reply', {
      error: error instanceof Error ? error.message : 'Unknown error',
      recipient: data.email,
      language: data.language
    })
    // Don't throw here as auto-reply failure shouldn't block the main flow
  }
}