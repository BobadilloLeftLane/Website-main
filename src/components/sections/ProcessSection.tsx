import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useTranslation } from '@/hooks/useTranslation'
import {
  Mail,
  Lightbulb,
  FileText,
  Users2,
  Code2,
  Rocket,
  CheckCircle,
  Settings,
  ArrowRight,
  ArrowDown,
  Target,
  Zap
} from 'lucide-react'

const ProcessSection = () => {
  const { t } = useTranslation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const processSteps = Array.isArray(t?.process?.steps) 
    ? t.process.steps.map((step, index) => ({
        ...step,
        icon: [Mail, Lightbulb, FileText, Users2, Code2, Rocket, CheckCircle, Settings][index],
        color: ["#00D4FF", "#8B5CF6", "#00FF88", "#F59E0B", "#EC4899", "#06B6D4", "#00FF88", "#8B5CF6"][index]
      }))
    : []

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const stepVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  return (
    <section className="py-20 lg:py-32 section-padding relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-purple/5 rounded-full blur-3xl" />
      
      <div className="container-wide relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          className="text-center mb-20"
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
            <Target className="w-4 h-4 text-neon-green mr-2" />
            <span className="text-sm text-neon-green font-medium">{t?.process?.badge || "Our Process"}</span>
          </motion.div>

          <h2 className="section-title">
            {t?.process?.title || "From Idea to Reality"}
          </h2>
          <p className="section-subtitle">
            {t?.process?.subtitle || "Proven methodology that transforms your visions into scalable digital products. Transparent process with clearly defined steps and deliverables."}
          </p>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          className="space-y-24"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {processSteps.map((step, index) => (
            <motion.div
              key={step.step}
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
              variants={stepVariants}
            >
              {/* Step Content */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${step.color}20` }}
                  >
                    <step.icon 
                      className="w-8 h-8" 
                      style={{ color: step.color }}
                    />
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <span 
                        className="text-3xl font-bold font-space"
                        style={{ color: step.color }}
                      >
                        {step.step}
                      </span>
                      <span className="px-3 py-1 text-xs rounded-full bg-white/10 text-silver/70">
                        {step.duration}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {step.title}
                    </h3>
                    <p className="text-electric-blue font-medium">
                      {step.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-silver/70 text-lg leading-relaxed">
                  {step.description}
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Activities */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-white flex items-center">
                      <Zap className="w-4 h-4 mr-2 text-neon-green" />
{t?.process?.activitiesLabel || "Activities"}
                    </h4>
                    <ul className="space-y-2">
                      {step.activities.map((activity, i) => (
                        <li key={i} className="flex items-start text-sm text-silver/60">
                          <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-neon-green flex-shrink-0" />
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Deliverables */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-white flex items-center">
                      <Target className="w-4 h-4 mr-2" style={{ color: step.color }} />
{t?.process?.deliverablesLabel || "Deliverables"}
                    </h4>
                    <ul className="space-y-2">
                      {step.deliverables.map((deliverable, i) => (
                        <li key={i} className="flex items-start text-sm text-silver/60">
                          <ArrowDown className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: step.color }} />
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step Diagram */}
              <div className="flex-1">
                <motion.div
                  className="relative p-8 rounded-xl glass-morphism"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Step Number Background */}
                  <div 
                    className="absolute top-4 right-4 text-6xl font-bold opacity-10"
                    style={{ color: step.color }}
                  >
                    {step.step}
                  </div>

                  {/* Diagram Content */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-center mb-6">
                      <div 
                        className="w-20 h-20 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${step.color}30` }}
                      >
                        <step.icon 
                          className="w-10 h-10" 
                          style={{ color: step.color }}
                        />
                      </div>
                    </div>

                    <div className="text-center">
                      <h4 className="text-lg font-semibold text-white mb-2">
                        {step.title}
                      </h4>
                      <p className="text-sm text-silver/60 mb-4">
                        {step.subtitle}
                      </p>
                      
                      {/* Progress indicator */}
                      <div className="flex items-center justify-center space-x-2">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i <= index ? 'opacity-100' : 'opacity-30'
                            }`}
                            style={{ 
                              backgroundColor: i <= index ? step.color : '#666'
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

export default ProcessSection