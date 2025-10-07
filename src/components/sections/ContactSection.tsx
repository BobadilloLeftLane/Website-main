import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import {
  Mail,
  MapPin,
  Clock,
  Send
} from 'lucide-react'
import ContactForm from '@/components/forms/ContactForm'
import ParticleBackground from '@/components/3d/ParticleBackground'

const ContactSection = () => {
  const { t } = useTranslation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const contactInfo = [
    {
      icon: Mail,
      label: t?.contact?.email?.label || "Email",
      value: "hello@avangard.dev",
      href: "mailto:hello@avangard.dev",
      description: t?.contact?.email?.description || "For all inquiries and collaboration"
    },
    {
      icon: MapPin,
      label: t?.contact?.location?.label || "Location",
      value: t?.contact?.location?.value || "Belgrade, Serbia",
      href: "#",
      description: t?.contact?.location?.description || "Knez Mihailova 42"
    },
    {
      icon: Clock,
      label: t?.contact?.hours?.label || "Working hours",
      value: t?.contact?.hours?.value || "24/7 Support",
      href: "#",
      description: t?.contact?.hours?.description || "Emergency hotline available"
    }
  ]


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <section className="py-20 lg:py-32 section-padding relative overflow-hidden">
      {/* Background Elements */}
      
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-20">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <ParticleBackground 
              count={100}
              color="#00FF88"
              speed={0.2}
              size={1.8}
              interactive={true}
            />
          </Suspense>
        </Canvas>
      </div>

      <div className="container-wide relative z-10">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full glass-morphism mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Send className="w-4 h-4 text-neon-green mr-2" />
            <span className="text-sm text-neon-green font-medium">{t?.contact?.badge || "Contact"}</span>
          </motion.div>

          <h2 className="section-title">
            {t?.contact?.title || "Let's Start Your Next Project"}
          </h2>
          <p className="section-subtitle">
            {t?.contact?.subtitle || "We are ready to transform your idea into a revolutionary digital product. Contact us for free consultations."}
          </p>
        </motion.div>

        <div className="space-y-16">
          {/* Contact Form */}
          <motion.div
            className="max-w-2xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold text-white mb-2 text-center">
                {t?.contact?.formTitle || "Send Us a Message"}
              </h3>
              <p className="text-silver/70 mb-4 text-center text-sm">
                {t?.contact?.formSubtitle || "Fill out the form and we will contact you within 24 hours with detailed proposals."}
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <ContactForm />
            </motion.div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-white mb-8">
                {t?.contact?.directTitle || "Direct Contact"}
              </h3>
              
              {/* Contact Methods */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.href}
                    className="flex flex-col items-center text-center p-4 rounded-xl glass-morphism hover:bg-white/10 transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-neon-green/20 flex items-center justify-center mb-3 group-hover:bg-neon-green/30 transition-colors">
                      <info.icon className="w-6 h-6 text-neon-green" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">{info.label}</h4>
                      <p className="text-neon-green font-medium mb-1">{info.value}</p>
                      <p className="text-silver/60 text-xs">{info.description}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}

export default ContactSection