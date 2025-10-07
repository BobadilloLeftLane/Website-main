import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { ExternalLink, ArrowRight, Code, Zap, Globe } from 'lucide-react'
import { projects } from '@/data/projects'

const PortfolioSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  
  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'saas', label: 'SaaS' },
    { id: 'e-commerce', label: 'E-commerce' },
    { id: 'web-app', label: 'Web Apps' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'iot', label: 'IoT' }
  ]

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const projectVariants = {
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
      <div className="absolute inset-0 bg-gradient-to-b from-dark-slate/30 via-midnight to-dark-slate/30" />
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-cyber-purple/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-neon-green/5 rounded-full blur-3xl" />
      
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
            <Code className="w-4 h-4 text-electric-blue mr-2" />
            <span className="text-sm text-electric-blue font-medium">Portfolio</span>
          </motion.div>

          <h2 className="section-title">
            Projekti Koji Menjaju Industrije
          </h2>
          <p className="section-subtitle">
            Od HealthTech SaaS platformi do IoT dashboards - pogledajte kako transformišemo 
            ideje u globalno skalabilne digitalne proizvode
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-electric-blue text-midnight'
                  : 'bg-white/5 text-silver hover:bg-white/10 hover:text-electric-blue'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              className="group relative rounded-xl overflow-hidden glass-morphism hover:shadow-xl transition-all duration-500"
              variants={projectVariants}
              whileHover={{ y: -10 }}
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-electric-blue/20 to-cyber-purple/20 overflow-hidden">
                <div className="absolute inset-0 bg-cyber-grid opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-16 h-16 bg-electric-blue/20 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Globe className="w-8 h-8 text-electric-blue" />
                  </motion.div>
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-midnight/80 text-xs text-electric-blue border border-electric-blue/30">
                  {project.category.toUpperCase()}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-white group-hover:text-electric-blue transition-colors">
                    {project.title}
                  </h3>
                  <motion.div
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.1 }}
                  >
                    <ExternalLink className="w-5 h-5 text-silver" />
                  </motion.div>
                </div>

                <p className="text-sm text-silver/70 mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Key Results */}
                <div className="space-y-2 mb-4">
                  {project.results.slice(0, 2).map((result, i) => (
                    <div key={i} className="flex items-center text-xs text-silver/60">
                      <Zap className="w-3 h-3 text-neon-green mr-2 flex-shrink-0" />
                      {result}
                    </div>
                  ))}
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span 
                      key={i}
                      className="px-2 py-1 text-xs bg-electric-blue/10 text-electric-blue rounded border border-electric-blue/20"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 text-xs text-silver/40">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* View Case Study Link */}
                <motion.div 
                  className="flex items-center justify-between text-sm pt-4 border-t border-white/10"
                  whileHover={{ x: 5 }}
                >
                  <span className="text-electric-blue font-medium">View Case Study</span>
                  <ArrowRight className="w-4 h-4 text-electric-blue" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

export default PortfolioSection