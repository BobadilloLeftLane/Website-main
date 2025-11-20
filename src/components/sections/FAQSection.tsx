import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import { useInView } from 'react-intersection-observer'
import PageSEO from '@/components/seo/PageSEO'

interface FAQItem {
  question: string
  answer: string
}

const FAQSection = () => {
  const { t } = useTranslation()
  const [openIndex, setOpenIndex] = useState<number | null>(0) // First item open by default
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <>
      <PageSEO
        title="Nova Studio Solutions"
        description="Common questions about software development: pricing, timelines, support, technologies. How much does a website cost? What technologies do you use? Koliko košta izrada web sajta? Pitanja i odgovori o razvoju softvera."
        keywords="software development faq, web development questions, pricing questions, koliko kosta web sajt, cena izrade aplikacije, software development cost, project timeline, technology stack, support options, pitanja i odgovori, cesto postavljana pitanja, software usluge, razvojna podrska"
        canonicalUrl="https://www.novastudiosolutions.com/#faq"
      />
      <section id="faq" className="py-20 section-padding relative overflow-hidden">

      <div className="container-wide relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="section-title">
              {t.faq?.title || "Frequently Asked Questions"}
            </h2>
            <p className="text-xl text-theme-secondary max-w-3xl mx-auto">
              {t.faq?.subtitle || "Everything you need to know about our services"}
            </p>
          </motion.div>

          {/* FAQ Items */}
          <motion.div className="max-w-4xl mx-auto space-y-4" variants={containerVariants}>
            {t.faq?.items?.map((faq: FAQItem, index: number) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-morphism rounded-lg border border-theme-primary overflow-hidden"
                style={{ backgroundColor: 'var(--bg-glass)' }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left transition-colors hover:bg-theme-tertiary/30"
                >
                  <h3 className="text-lg md:text-xl font-semibold text-theme-primary pr-4">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-6 h-6 text-electric-blue" />
                  </motion.div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 text-theme-secondary leading-relaxed whitespace-pre-line">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            className="text-center mt-12"
            variants={itemVariants}
          >
            <p className="text-theme-secondary mb-4">
              {t.faq?.ctaText || "Still have questions?"}
            </p>
            <motion.button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 via-orange-red to-red-600 text-white font-semibold rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t.faq?.ctaButton || "Contact Us"}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
    </>
  )
}

export default FAQSection
