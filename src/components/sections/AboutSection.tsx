import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
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
        title="About Us | Software Development Team Novi Sad - O Nama"
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
          <p className="section-subtitle">
            {t?.about?.subtitle || "We are new to the market, but with a clear vision - to make digitalization accessible to everyone. We guarantee quality, transparency and definitely the most affordable prices."}
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
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              {t?.about?.vision?.title?.includes('span') ? (
                <span dangerouslySetInnerHTML={{ __html: t.about.vision.title }} />
              ) : (
                <>Naša <span className="text-electric-blue">Vizija</span></>
              )}
            </h3>
            <p className="text-silver/80 text-lg leading-relaxed mb-8">
              {t?.about?.vision?.paragraph1?.includes('span') ? (
                <span dangerouslySetInnerHTML={{ __html: t.about.vision.paragraph1 }} />
              ) : (
                <>
                  Verujemo da svaki biznis, bez obzira na veličinu, zaslužuje pristup najmodernijim
                  digitalnim alatima. Naša ideja je jednostavna - omogućiti svima da preko telefona
                  ili kompjutera imaju <span className="text-neon-green font-semibold">potpunu kontrolu</span> nad
                  svojim softverima i biznisima.
                </>
              )}
            </p>
            <p className="text-silver/80 text-lg leading-relaxed mb-8">
              {t?.about?.vision?.paragraph2?.includes('span') ? (
                <span dangerouslySetInnerHTML={{ __html: t.about.vision.paragraph2 }} />
              ) : (
                <>
                  To znači <span className="text-electric-blue font-semibold">efikasniji rad</span>,
                  bolju komunikaciju sa klijentima i mogućnost donošenja
                  <span className="text-cyber-purple font-semibold"> pametnijih poslovnih odluka</span> baziranih
                  na realnim podacima - sve to po cenama koje neće uništiti vaš budžet.
                </>
              )}
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