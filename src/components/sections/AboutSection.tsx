import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Canvas } from '@react-three/fiber'
import { Suspense, useState, useEffect } from 'react'
import { Users } from 'lucide-react'
import ParticleBackground from '@/components/3d/ParticleBackground'
import { useTranslation } from '@/hooks/useTranslation'
import PageSEO from '@/components/seo/PageSEO'

const AboutSection = () => {
  const { t } = useTranslation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [displayedSubtitle, setDisplayedSubtitle] = useState('')
  const [displayedVision1, setDisplayedVision1] = useState('')
  const [displayedVision2, setDisplayedVision2] = useState('')

  const subtitleText = t?.about?.subtitle || "We are new to the market, but with a clear vision - to make digitalization accessible to everyone. We guarantee quality, transparency and definitely the most affordable prices."

  // Extract clean text from translation strings (remove HTML tags)
  const getCleanText = (text: string) => {
    if (!text) return ''
    return text.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ')
  }

  const vision1Text = t?.about?.vision?.paragraph1
    ? getCleanText(t.about.vision.paragraph1)
    : "We believe that every business, regardless of size, deserves access to the most modern digital tools. Our idea is simple - to enable everyone to have complete control over their software and businesses via phone or computer."

  const vision2Text = t?.about?.vision?.paragraph2
    ? getCleanText(t.about.vision.paragraph2)
    : "This means more efficient work, better communication with clients and the ability to make smarter business decisions based on real data - all at prices that won't destroy your budget."

  useEffect(() => {
    if (!inView) return

    // Reset when language changes
    setDisplayedSubtitle('')
    setDisplayedVision1('')
    setDisplayedVision2('')

    let i = 0
    const typingInterval = setInterval(() => {
      if (i <= subtitleText.length) {
        setDisplayedSubtitle(subtitleText.substring(0, i))
        i++
      } else {
        clearInterval(typingInterval)
        // Start vision1 after subtitle completes
        let j = 0
        const vision1Interval = setInterval(() => {
          if (j <= vision1Text.length) {
            setDisplayedVision1(vision1Text.substring(0, j))
            j++
          } else {
            clearInterval(vision1Interval)
            // Start vision2 after vision1 completes
            let k = 0
            const vision2Interval = setInterval(() => {
              if (k <= vision2Text.length) {
                setDisplayedVision2(vision2Text.substring(0, k))
                k++
              } else {
                clearInterval(vision2Interval)
              }
            }, 20)
          }
        }, 20)
      }
    }, 20)

    return () => clearInterval(typingInterval)
  }, [inView, subtitleText, vision1Text, vision2Text])

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
    <>
      <PageSEO
        title="Nova Studio Solutions"
        description="Expert software development team in Novi Sad, Serbia. Young, innovative, and affordable. 100% transparency, 24/7 support, 50% lower prices. Tim za razvoj softvera, mladi i inovativni."
        keywords="software development team, novi sad developers, serbia it company, software agency, development team, outsourcing serbia, o nama, nas tim, programeri novi sad, it kompanija srbija, softverska kuca, razvojna agencija"
        canonicalUrl="https://www.novastudiosolutions.com/#about"
      />
      <section className="py-20 lg:py-32 section-padding relative overflow-hidden">
      {/* Background Elements */}
      
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <ParticleBackground 
              count={80}
              color="#8B5CF6"
              speed={0.3}
              size={1.5}
              interactive={false}
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
            <Users className="w-4 h-4 text-cyber-purple mr-2" />
            <span className="text-sm text-cyber-purple font-medium">{t?.about?.badge || "About Us"}</span>
          </motion.div>

          <h2 className="section-title">
            {t?.about?.title || "New Generation Digital Transformation"}
          </h2>
          <p className="section-subtitle text-neon-green font-mono">
            {displayedSubtitle}
            {displayedSubtitle.length < subtitleText.length && <span className="animate-pulse">|</span>}
          </p>
        </motion.div>

        {/* Company Story - Compact */}
        <motion.div
          className="max-w-4xl mx-auto text-center mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl md:text-3xl font-bold text-neon-green mb-6">
              {t?.about?.vision?.title ? getCleanText(t.about.vision.title) : "Our Vision"}
            </h3>
            <p className="text-neon-green font-mono text-lg leading-relaxed mb-8">
              {displayedVision1}
              {displayedVision1.length < vision1Text.length && <span className="animate-pulse">|</span>}
            </p>
            <p className="text-neon-green font-mono text-lg leading-relaxed mb-8">
              {displayedVision2}
              {displayedVision2.length < vision2Text.length && displayedVision1.length >= vision1Text.length && <span className="animate-pulse">|</span>}
            </p>

            {/* Key Points */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
              {[
                t?.about?.stats?.transparency || { number: "100%", label: "Transparentnost" },
                t?.about?.stats?.control || { number: "24/7", label: "Kontrola" },
                t?.about?.stats?.pricing || { number: "50%", label: "Niže cene" },
                t?.about?.stats?.support || { number: "∞", label: "Podrška" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div
                    className="text-3xl font-bold mb-2"
                    style={{ color: ["#00D4FF", "#8B5CF6", "#00FF88", "#F59E0B"][index] }}
                  >
                    {stat.number}
                  </div>
                  <div className="text-sm text-silver/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>


      </div>
    </section>
    </>
  )
}

export default AboutSection