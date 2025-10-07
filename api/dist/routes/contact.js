"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const express_validator_1 = require("express-validator");
const emailService_1 = require("../services/emailService");
const logger_1 = require("../utils/logger");
const router = express_1.default.Router();
const contactLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
        error: 'Too many contact form submissions. Please try again in 15 minutes.',
        retryAfter: 15 * 60 * 1000
    },
    standardHeaders: true,
    legacyHeaders: false,
});
const contactValidation = [
    (0, express_validator_1.body)('name')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Name must be between 2 and 100 characters')
        .matches(/^[a-zA-ZšđčćžŠĐČĆŽ\s]+$/)
        .withMessage('Name can only contain letters and spaces'),
    (0, express_validator_1.body)('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email address'),
    (0, express_validator_1.body)('company')
        .optional()
        .trim()
        .isLength({ max: 200 })
        .withMessage('Company name cannot exceed 200 characters'),
    (0, express_validator_1.body)('phone')
        .optional()
        .trim()
        .matches(/^[\+]?[1-9][\d]{0,15}$/)
        .withMessage('Please provide a valid phone number'),
    (0, express_validator_1.body)('projectType')
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
    (0, express_validator_1.body)('budget')
        .isIn(['<$50k', '$50k-$100k', '$100k-$250k', '$250k-$500k', '$500k+'])
        .withMessage('Please select a valid budget range'),
    (0, express_validator_1.body)('timeline')
        .isIn(['<3 months', '3-6 months', '6-12 months', '12+ months'])
        .withMessage('Please select a valid timeline'),
    (0, express_validator_1.body)('message')
        .trim()
        .isLength({ min: 10, max: 2000 })
        .withMessage('Message must be between 10 and 2000 characters'),
];
router.post('/', contactLimiter, contactValidation, async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: 'Validation failed',
                details: errors.array()
            });
        }
        const { name, email, company, phone, projectType, budget, timeline, message } = req.body;
        logger_1.logger.info('New contact form submission', {
            projectType,
            budget,
            timeline,
            hasCompany: !!company,
            hasPhone: !!phone,
            ip: req.ip,
            userAgent: req.get('User-Agent')
        });
        await (0, emailService_1.sendContactEmail)({
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
        });
        await (0, emailService_1.sendAutoReply)({
            name,
            email,
            projectType
        });
        res.status(200).json({
            success: true,
            message: 'Your message has been sent successfully. We will contact you within 24 hours.',
            timestamp: new Date().toISOString()
        });
    }
    catch (error) {
        logger_1.logger.error('Contact form submission failed', {
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
            ip: req.ip
        });
        res.status(500).json({
            error: 'Failed to send message. Please try again later or contact us directly.',
            timestamp: new Date().toISOString()
        });
    }
});
router.get('/status', (req, res) => {
    res.json({
        status: 'Contact form service is operational',
        timestamp: new Date().toISOString()
    });
});
exports.default = router;
//# sourceMappingURL=contact.js.map