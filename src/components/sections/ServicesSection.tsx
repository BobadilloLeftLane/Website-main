import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import ServiceCard from '@/components/common/ServiceCard'
import { getServicesWithTranslations } from '@/data/services'
import { useTranslation } from '@/hooks/useTranslation'
import PageSEO from '@/components/seo/PageSEO'

const ServicesSection = () => {
  const { t } = useTranslation()
  const services = getServicesWithTranslations(t)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  return (
    <>
      <PageSEO
        title="Nova Studio Solutions"
        description="Complete software development services: SaaS platforms, web applications, mobile apps, API integration, cloud solutions. Affordable prices, enterprise quality. Usluge razvoja softvera, izrada aplikacija i web sajta."
        keywords="saas development, web development services, mobile app development, api integration, cloud solutions, digital transformation, software services, usluge razvoja, izrada saas aplikacija, web usluge, mobilne aplikacije, cloud hosting, enterprise software"
        canonicalUrl="https://www.novastudiosolutions.com/#services"
      />
      <section className="py-20 lg:py-32 section-padding relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-electric-blue/5 rounded-full blur-3xl" />
      
      <div className="container-wide relative z-10">
        <motion.div
          ref={ref}
          className="text-center mb-16 lg:mb-24"
          variants={titleVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Badge */}
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full glass-morphism mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="text-sm text-electric-blue font-medium">{t?.services?.badge || "Our Services"}</span>
          </motion.div>

          <h2 className="section-title">
            {t?.services?.title || "Profesionalna Izrada Web Sajta, Aplikacija i SaaS Platformi"}
          </h2>
          <p className="section-subtitle">
            {t?.services?.subtitle || "Od ideje do realizacije - kreiramo digitalne proizvode koji transformišu način poslovanja. Izrada web sajta, mobilnih i desktop aplikacija po najpovoljnijim cenama u Novom Sadu."}
          </p>

          {/* Feature highlights */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mt-8"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { delay: 0.4, staggerChildren: 0.1 }
              }
            }}
          >
            {[
              t?.services?.features?.scalableArchitecture || "Scalable Architecture",
              t?.services?.features?.support247 || "24/7 Support",
              t?.services?.features?.globalStandards || "Global Standards",
              t?.services?.features?.aiIntegration || "AI Integration"
            ].map((feature, index) => (
              <motion.span
                key={index}
                className="px-4 py-2 text-sm bg-white/5 border border-white/10 rounded-full text-silver/70"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                {feature}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <ServiceCard 
              key={service.id}
              service={service}
              index={index}
              onClick={() => {
                // Navigate to service detail or open modal
                console.log(`View service: ${service.id}`)
              }}
            />
          ))}
        </motion.div>

      </div>
    </section>
    </>
  )
}

export default ServicesSection