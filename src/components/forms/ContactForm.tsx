import { useState, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import AnimatedButton from '@/components/common/AnimatedButton'
import { useTranslation } from '@/hooks/useTranslation'
import emailjs from '@emailjs/browser'

type ContactFormData = {
  name: string
  email: string
  company?: string
  phone?: string
  projectType: string
  budget: string
  timeline: string
  message: string
}

const ContactForm = () => {
  const { t, currentLanguage } = useTranslation()
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const isSubmittingRef = useRef(false)

  // Dynamic validation schema based on current language
  const contactSchema = useMemo(() => z.object({
    name: z.string()
      .min(2, t?.contact?.form?.validation?.nameMin || 'Name must be at least 2 characters')
      .max(100, t?.contact?.form?.validation?.nameMax || 'Name can be maximum 100 characters')
      .regex(/^[a-zA-ZšđčćžŠĐČĆŽÀ-ÿ\s]+$/, t?.contact?.form?.validation?.nameInvalid || 'Name can only contain letters and spaces'),

    email: z.string()
      .email(t?.contact?.form?.validation?.emailInvalid || 'Please enter a valid email address'),

    company: z.string()
      .max(200, t?.contact?.form?.validation?.companyMax || 'Company name can be maximum 200 characters')
      .optional(),

    phone: z.string()
      .regex(/^[\+]?[1-9][\d]{0,15}$/, t?.contact?.form?.validation?.phoneInvalid || 'Please enter a valid phone number')
      .optional()
      .or(z.literal('')),

    projectType: z.enum([
      'SaaS Development',
      'Web Application',
      'Digital Transformation',
      'API Integration',
      'Mobile App',
      'Cloud Migration',
      'Other'
    ], { errorMap: () => ({ message: t?.contact?.form?.validation?.projectTypeRequired || 'Please select a project type' }) }),

    budget: z.enum([
      '<$50k',
      '$50k-$100k',
      '$100k-$250k',
      '$250k-$500k',
      '$500k+'
    ], { errorMap: () => ({ message: t?.contact?.form?.validation?.budgetRequired || 'Please select a budget' }) }),

    timeline: z.enum([
      '<3 months',
      '3-6 months',
      '6-12 months',
      '12+ months'
    ], { errorMap: () => ({ message: t?.contact?.form?.validation?.timelineRequired || 'Please select a timeline' }) }),

    message: z.string()
      .min(10, t?.contact?.form?.validation?.messageMin || 'Message must be at least 10 characters')
      .max(2000, t?.contact?.form?.validation?.messageMax || 'Message can be maximum 2000 characters')
  }), [t, currentLanguage])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = async (data: ContactFormData) => {
    // Prevent double submission
    if (isSubmittingRef.current) {
      console.warn('⚠️ Form submission already in progress, ignoring duplicate submit')
      return
    }

    isSubmittingRef.current = true
    setSubmitStatus('loading')
    setErrorMessage('')

    // Generate unique submission ID for tracking
    const submissionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    console.log('🚀 Starting form submission:', submissionId)

    // Track if main email was sent successfully
    let mainEmailSent = false

    try {
      // EmailJS configuration
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID'
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'

      // Debug logging
      console.log('EmailJS Config:', { serviceId, templateId, publicKey: publicKey.substring(0, 5) + '...' })

      // Prepare template parameters
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        company: data.company || 'N/A',
        phone: data.phone || 'N/A',
        project_type: data.projectType,
        budget: data.budget,
        timeline: data.timeline,
        message: data.message,
        language: currentLanguage,
        to_name: 'Nova Studio Solutions',
        reply_to: data.email
      }

      console.log('Template Params:', templateParams)

      // Send email to company
      const response = await emailjs.send(serviceId, templateId, templateParams, publicKey)
      console.log('EmailJS Response (to company):', response)

      // Mark main email as successfully sent
      mainEmailSent = true

      // Send auto-reply to customer (if template is configured)
      const autoReplyTemplateId = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID
      console.log(`📧 [${submissionId}] Auto-reply template ID:`, autoReplyTemplateId)

      if (autoReplyTemplateId &&
          autoReplyTemplateId !== 'your_autoreply_template_id_here' &&
          autoReplyTemplateId !== 'template_xyz789' &&
          autoReplyTemplateId !== '') {
        try {
          console.log(`📤 [${submissionId}] Attempting to send auto-reply...`)
          const autoReplyResponse = await emailjs.send(serviceId, autoReplyTemplateId, templateParams, publicKey)
          console.log(`✅ [${submissionId}] Auto-reply sent successfully:`, autoReplyResponse)
        } catch (autoReplyError) {
          console.error(`❌ [${submissionId}] Auto-reply email failed:`, autoReplyError)
          // Continue anyway - main email was sent successfully
          // Do NOT throw error - we want the form to show success even if auto-reply fails
        }
      } else {
        console.log(`⏭️ [${submissionId}] Auto-reply skipped - template not configured or invalid`)
      }

      setSubmitStatus('success')
      reset()
      isSubmittingRef.current = false
      console.log(`✅ [${submissionId}] Form submission completed successfully`)

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)

    } catch (error) {
      console.error(`❌ [${submissionId}] EmailJS Error:`, error)

      // If main email was sent successfully, show success anyway
      if (mainEmailSent) {
        console.log(`✅ [${submissionId}] Main email sent successfully, showing success despite later error`)
        setSubmitStatus('success')
        reset()
        isSubmittingRef.current = false

        setTimeout(() => {
          setSubmitStatus('idle')
        }, 5000)
      } else {
        // Main email failed, show error
        console.error(`❌ [${submissionId}] Main email failed`)
        setSubmitStatus('error')
        setErrorMessage(error instanceof Error ? error.message : 'Došlo je do neočekivane greške. Molimo pokušajte ponovo.')
        isSubmittingRef.current = false

        // Reset error after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle')
          setErrorMessage('')
        }, 5000)
      }
    }
  }

  const inputVariants = {
    focus: {
      borderColor: '#00D4FF',
      boxShadow: '0 0 0 3px rgba(0, 212, 255, 0.1)',
      transition: { duration: 0.2 }
    }
  }

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Personal Information */}
      <motion.div variants={fieldVariants}>
        <label className="block text-sm font-medium text-silver mb-2">
          {t?.contact?.form?.name?.label || "Ime i Prezime"} {t?.contact?.form?.name?.required && "*"}
        </label>
        <motion.input
          type="text"
          {...register('name')}
          className="input-field"
          placeholder={t?.contact?.form?.name?.placeholder || "Marko Petrović"}
          variants={inputVariants}
          whileFocus="focus"
        />
        {errors.name && (
          <motion.p
            className="mt-1 text-sm text-red-400 flex items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.name.message}
          </motion.p>
        )}
      </motion.div>

      <motion.div variants={fieldVariants}>
        <label className="block text-sm font-medium text-silver mb-2">
          {t?.contact?.form?.email?.label || "Email Adresa"} {t?.contact?.form?.email?.required && "*"}
        </label>
        <motion.input
          type="email"
          {...register('email')}
          className="input-field"
          placeholder={t?.contact?.form?.email?.placeholder || "marko@company.com"}
          variants={inputVariants}
          whileFocus="focus"
        />
        {errors.email && (
          <motion.p
            className="mt-1 text-sm text-red-400 flex items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.email.message}
          </motion.p>
        )}
      </motion.div>

      <motion.div variants={fieldVariants}>
        <label className="block text-sm font-medium text-silver mb-2">
          {t?.contact?.form?.company?.label || "Kompanija"} <span className="text-silver/50 text-xs">{t?.contact?.form?.company?.optional || "(optional)"}</span>
        </label>
        <motion.input
          type="text"
          {...register('company')}
          className="input-field"
          placeholder={t?.contact?.form?.company?.placeholder || "Naziv vaše kompanije"}
          variants={inputVariants}
          whileFocus="focus"
        />
        {errors.company && (
          <motion.p 
            className="mt-1 text-sm text-red-400 flex items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.company.message}
          </motion.p>
        )}
      </motion.div>

      <motion.div variants={fieldVariants}>
        <label className="block text-sm font-medium text-silver mb-2">
          {t?.contact?.form?.phone?.label || "Telefon"} <span className="text-silver/50 text-xs">{t?.contact?.form?.phone?.optional || "(optional)"}</span>
        </label>
        <motion.input
          type="tel"
          {...register('phone')}
          className="input-field"
          placeholder={t?.contact?.form?.phone?.placeholder || "+381 11 123 4567"}
          variants={inputVariants}
          whileFocus="focus"
        />
        {errors.phone && (
          <motion.p 
            className="mt-1 text-sm text-red-400 flex items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.phone.message}
          </motion.p>
        )}
      </motion.div>

      {/* Project Details */}
      <motion.div variants={fieldVariants}>
        <label className="block text-sm font-medium text-silver mb-2">
          {t?.contact?.form?.projectType?.label || "Tip Projekta"} {t?.contact?.form?.projectType?.required && "*"}
        </label>
        <motion.select
          {...register('projectType')}
          className="input-field"
          variants={inputVariants}
          whileFocus="focus"
        >
          <option value="">{t?.contact?.form?.projectType?.placeholder || "Izaberite tip"}</option>
          <option value="SaaS Development">{t?.contact?.form?.projectType?.options?.saas || "SaaS Development"}</option>
          <option value="Web Application">{t?.contact?.form?.projectType?.options?.web || "Web Application"}</option>
          <option value="Digital Transformation">{t?.contact?.form?.projectType?.options?.transformation || "Digital Transformation"}</option>
          <option value="API Integration">{t?.contact?.form?.projectType?.options?.api || "API Integration"}</option>
          <option value="Mobile App">{t?.contact?.form?.projectType?.options?.mobile || "Mobile App"}</option>
          <option value="Cloud Migration">{t?.contact?.form?.projectType?.options?.cloud || "Cloud Migration"}</option>
          <option value="Other">{t?.contact?.form?.projectType?.options?.other || "Other"}</option>
        </motion.select>
        {errors.projectType && (
          <motion.p 
            className="mt-1 text-sm text-red-400 flex items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.projectType.message}
          </motion.p>
        )}
      </motion.div>

      <motion.div variants={fieldVariants}>
        <label className="block text-sm font-medium text-silver mb-2">
          {t?.contact?.form?.budget?.label || "Budžet"} {t?.contact?.form?.budget?.required && "*"}
        </label>
        <motion.select
          {...register('budget')}
          className="input-field"
          variants={inputVariants}
          whileFocus="focus"
        >
          <option value="">{t?.contact?.form?.budget?.placeholder || "Izaberite budžet"}</option>
          <option value="<$50k">{t?.contact?.form?.budget?.options?.low || "<$50k"}</option>
          <option value="$50k-$100k">{t?.contact?.form?.budget?.options?.medium || "$50k-$100k"}</option>
          <option value="$100k-$250k">{t?.contact?.form?.budget?.options?.high || "$100k-$250k"}</option>
          <option value="$250k-$500k">{t?.contact?.form?.budget?.options?.veryHigh || "$250k-$500k"}</option>
          <option value="$500k+">{t?.contact?.form?.budget?.options?.enterprise || "$500k+"}</option>
        </motion.select>
        {errors.budget && (
          <motion.p 
            className="mt-1 text-sm text-red-400 flex items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.budget.message}
          </motion.p>
        )}
      </motion.div>

      <motion.div variants={fieldVariants}>
        <label className="block text-sm font-medium text-silver mb-2">
          {t?.contact?.form?.timeline?.label || "Vremenski Okvir"} {t?.contact?.form?.timeline?.required && "*"}
        </label>
        <motion.select
          {...register('timeline')}
          className="input-field"
          variants={inputVariants}
          whileFocus="focus"
        >
          <option value="">{t?.contact?.form?.timeline?.placeholder || "Izaberite vreme"}</option>
          <option value="<3 months">{t?.contact?.form?.timeline?.options?.short || "<3 meseca"}</option>
          <option value="3-6 months">{t?.contact?.form?.timeline?.options?.medium || "3-6 meseci"}</option>
          <option value="6-12 months">{t?.contact?.form?.timeline?.options?.long || "6-12 meseci"}</option>
          <option value="12+ months">{t?.contact?.form?.timeline?.options?.veryLong || "12+ meseci"}</option>
        </motion.select>
        {errors.timeline && (
          <motion.p 
            className="mt-1 text-sm text-red-400 flex items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.timeline.message}
          </motion.p>
        )}
      </motion.div>

      {/* Message */}
      <motion.div variants={fieldVariants}>
        <label className="block text-sm font-medium text-silver mb-2">
          {t?.contact?.form?.message?.label || "Poruka"} {t?.contact?.form?.message?.required && "*"}
        </label>
        <motion.textarea
          {...register('message')}
          rows={6}
          className="input-field resize-none"
          placeholder={t?.contact?.form?.message?.placeholder || "Opišite vaš projekat, ciljeve i sve što je važno da znamo..."}
          variants={inputVariants}
          whileFocus="focus"
        />
        {errors.message && (
          <motion.p 
            className="mt-1 text-sm text-red-400 flex items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.message.message}
          </motion.p>
        )}
      </motion.div>

      {/* Submit Button */}
      <motion.div variants={fieldVariants} className="pt-4">
        <AnimatedButton
          type="submit"
          variant="primary"
          size="lg"
          disabled={submitStatus === 'loading'}
          loading={submitStatus === 'loading'}
          className="w-full"
          icon={submitStatus === 'loading' ? Loader : Send}
        >
          {submitStatus === 'loading' ? (t?.contact?.form?.sending || 'Šalje se...') : (t?.contact?.form?.submit || 'Pošaljite Poruku')}
        </AnimatedButton>
      </motion.div>

      {/* Status Messages */}
      <AnimatePresence>
        {submitStatus === 'success' && (
          <motion.div
            className="flex items-center p-4 rounded-lg bg-neon-green/10 border border-neon-green/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <CheckCircle className="w-5 h-5 text-neon-green mr-3" />
            <div>
              <p className="text-neon-green font-medium">{t?.contact?.form?.success?.title || "Poruka je uspešno poslata!"}</p>
              <p className="text-silver/70 text-sm">{t?.contact?.form?.success?.message || "Kontaktiraćemo vas u roku od 24 sata."}</p>
            </div>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            className="flex items-center p-4 rounded-lg bg-red-500/10 border border-red-500/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
            <div>
              <p className="text-red-400 font-medium">{t?.contact?.form?.error?.title || "Greška pri slanju poruke"}</p>
              <p className="text-silver/70 text-sm">
                {errorMessage || t?.contact?.form?.error?.message || 'Molimo pokušajte ponovo ili nas kontaktirajte direktno.'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  )
}

export default ContactForm