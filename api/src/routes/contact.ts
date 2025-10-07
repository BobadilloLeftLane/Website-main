import express from 'express'
import rateLimit from 'express-rate-limit'
import { body, validationResult } from 'express-validator'
import { sendContactEmail, sendAutoReply } from '../services/emailService'
import { logger } from '../utils/logger'

const router = express.Router()

// Stricter rate limiting for contact form
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 contact form submissions per 15 minutes
  message: {
    error: 'Too many contact form submissions. Please try again in 15 minutes.',
    retryAfter: 15 * 60 * 1000
  },
  standardHeaders: true,
  legacyHeaders: false,
})

// Validation rules
const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-ZšđčćžŠĐČĆŽ\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('company')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Company name cannot exceed 200 characters'),
  
  body('phone')
    .optional()
    .trim()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  
  body('projectType')
    .isIn([
      'SaaS Development',
      'Web Application', 
      'Digital Transformation',
      'API Integration',
      'Mobile App',
      'Cloud Migration',
      'Other'
    ])
    .withMessage('Please select a valid project type'),
  
  body('budget')
    .isIn(['<$50k', '$50k-$100k', '$100k-$250k', '$250k-$500k', '$500k+'])
    .withMessage('Please select a valid budget range'),
  
  body('timeline')
    .isIn(['<3 months', '3-6 months', '6-12 months', '12+ months'])
    .withMessage('Please select a valid timeline'),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),
]

// POST /api/contact
router.post('/', contactLimiter, contactValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      })
    }

    const { name, email, company, phone, projectType, budget, timeline, message } = req.body

    // Log the contact form submission (without sensitive data)
    logger.info('New contact form submission', {
      projectType,
      budget,
      timeline,
      hasCompany: !!company,
      hasPhone: !!phone,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    })

    // Send email to company
    await sendContactEmail({
      name,
      email,
      company,
      phone,
      projectType,
      budget,
      timeline,
      message,
      submittedAt: new Date().toISOString(),
      ip: req.ip
    })

    // Send auto-reply to user
    await sendAutoReply({
      name,
      email,
      projectType
    })

    res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully. We will contact you within 24 hours.',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    logger.error('Contact form submission failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      ip: req.ip
    })

    res.status(500).json({
      error: 'Failed to send message. Please try again later or contact us directly.',
      timestamp: new Date().toISOString()
    })
  }
})

// GET /api/contact/status - Simple status check
router.get('/status', (req, res) => {
  res.json({
    status: 'Contact form service is operational',
    timestamp: new Date().toISOString()
  })
})

export default router