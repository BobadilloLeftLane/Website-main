import nodemailer from 'nodemailer'
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
  ip?: string
}

interface AutoReplyData {
  name: string
  email: string
  projectType: string
}

// Create nodemailer transporter
const createTransporter = () => {
  if (process.env.NODE_ENV === 'production') {
    // Production email configuration (using service like SendGrid, Mailgun, etc.)
    return nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })
  } else {
    // Development configuration (using Ethereal for testing)
    return nodemailer.createTransporter({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'ethereal.user@ethereal.email',
        pass: 'ethereal.pass'
      }
    })
  }
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
          <h1>🚀 Nova Poruka sa Avangard Website</h1>
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
          <p>📧 Avangard Contact Form System</p>
          <p>Automatski generisana poruka - ne odgovarajte na ovaj email</p>
        </div>
      </div>
    </body>
    </html>
  `

  const mailOptions = {
    from: process.env.EMAIL_FROM || 'contact@avangard.dev',
    to: process.env.EMAIL_TO || 'hello@avangard.dev',
    subject: `🚀 Nova poruka: ${data.projectType} - ${data.name}`,
    html: htmlContent,
    text: `
      Nova poruka sa Avangard website-a:
      
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
          <h1>🚀 Hvala vam na interesovanju!</h1>
        </div>
        
        <div class="content">
          <p>Poštovani/a ${data.name},</p>
          
          <p>Hvala vam što ste nas kontaktirali u vezi sa vašim <strong>${data.projectType}</strong> projektom!</p>
          
          <div class="highlight">
            <h3>✅ Vaša poruka je uspešno primljena</h3>
            <p>Naš tim će analizirati vaše potrebe i kontaktirati vas u roku od <strong>24 sata</strong> sa detaljnim predlogom.</p>
          </div>
          
          <h3>Šta sledi:</h3>
          <div class="features">
            <div class="feature">📋 <strong>Analiza:</strong> Detaljno proučavamo vaše zahteve</div>
            <div class="feature">💡 <strong>Strategija:</strong> Kreiramo customizovan pristup</div>
            <div class="feature">📞 <strong>Konsultacije:</strong> Zakazujemo call sa tehničkim timom</div>
            <div class="feature">📄 <strong>Predlog:</strong> Dostavljamo kompletnu projektnu dokumentaciju</div>
          </div>
          
          <h3>Zašto Avangard?</h3>
          <div class="features">
            <div class="feature">⚡ <strong>200+ uspešnih projekata</strong> u poslednje 4 godine</div>
            <div class="feature">🌍 <strong>50+ globalnih klijenata</strong> u 15+ zemalja</div>
            <div class="feature">🔒 <strong>99% success rate</strong> u implementaciji</div>
            <div class="feature">🚀 <strong>24/7 podrška</strong> tokom celog projekta</div>
          </div>
          
          <p>U međuvremenu, možete pogledati naše case studies i tehnički blog na:</p>
          <a href="https://avangard.dev" class="cta">🔗 Posetite Avangard.dev</a>
          
          <p>Za hitne upite možete nas kontaktirati direktno:</p>
          <p>📧 <strong>hello@avangard.dev</strong><br>
          📞 <strong>+381 11 123 4567</strong></p>
        </div>
        
        <div class="footer">
          <p><strong>Avangard - Digitalna Transformacija Budućnosti</strong></p>
          <p>Belgrade, Serbia | London, UK | New York, USA</p>
          <p>Ova poruka je automatski generisana. Molimo ne odgovarajte na ovaj email.</p>
        </div>
      </div>
    </body>
    </html>
  `

  const mailOptions = {
    from: process.env.EMAIL_FROM || 'hello@avangard.dev',
    to: data.email,
    subject: '🚀 Hvala na kontaktu - Avangard Tim će vam se javiti uskoro!',
    html: htmlContent,
    text: `
      Poštovani/a ${data.name},
      
      Hvala vam što ste nas kontaktirali u vezi sa vašim ${data.projectType} projektom!
      
      ✅ Vaša poruka je uspešno primljena
      
      Naš tim će analizirati vaše potrebe i kontaktirati vas u roku od 24 sata sa detaljnim predlogom.
      
      Šta sledi:
      📋 Analiza: Detaljno proučavamo vaše zahteve
      💡 Strategija: Kreiramo customizovan pristup  
      📞 Konsultacije: Zakazujemo call sa tehničkim timom
      📄 Predlog: Dostavljamo kompletnu projektnu dokumentaciju
      
      Za hitne upite:
      📧 hello@avangard.dev
      📞 +381 11 123 4567
      
      Avangard - Digitalna Transformacija Budućnosti
      Belgrade | London | New York
    `
  }

  try {
    const result = await transporter.sendMail(mailOptions)
    logger.info('Auto-reply sent successfully', {
      messageId: result.messageId,
      recipient: data.email
    })
  } catch (error) {
    logger.error('Failed to send auto-reply', {
      error: error instanceof Error ? error.message : 'Unknown error',
      recipient: data.email
    })
    // Don't throw here as auto-reply failure shouldn't block the main flow
  }
}