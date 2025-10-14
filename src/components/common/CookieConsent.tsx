import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, Shield, X } from 'lucide-react'
import AnimatedButton from './AnimatedButton'
import PrivacyPolicyModal from './PrivacyPolicyModal'
import TermsModal from './TermsModal'

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [showTerms, setShowTerms] = useState(false)

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem('cookie-consent')

    if (!hasAccepted) {
      // Show cookie consent after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    setIsVisible(false)
  }

  return (
    <>
      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />

      {/* Terms & Conditions Modal */}
      <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />

      {/* Cookie Consent Banner */}
      <AnimatePresence>
        {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[10000]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Cookie Consent Banner */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-[10001] p-4 md:p-6"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="max-w-6xl mx-auto glass-morphism rounded-2xl border border-electric-blue/30 overflow-hidden">
              {/* Header with Icon */}
              <div className="bg-gradient-to-r from-electric-blue/20 to-cyber-purple/20 p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-electric-blue/20 flex items-center justify-center">
                      <Cookie className="w-6 h-6 text-electric-blue" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Cookie Consent</h3>
                      <p className="text-sm text-silver/70">We value your privacy</p>
                    </div>
                  </div>
                  <button
                    onClick={handleDecline}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5 text-silver" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <div className="flex-1 space-y-4">
                    <p className="text-silver/90 leading-relaxed">
                      We use cookies and similar technologies to enhance your browsing experience,
                      analyze website traffic, and understand where our visitors are coming from.
                      By clicking <strong className="text-white">"Accept All"</strong>, you consent to our use of cookies.
                    </p>

                    <div className="flex flex-wrap gap-3 text-sm">
                      <button
                        onClick={() => setShowPrivacy(true)}
                        className="flex items-center gap-2 text-electric-blue hover:text-electric-blue/80 transition-colors"
                      >
                        <Shield className="w-4 h-4" />
                        Privacy Policy
                      </button>
                      <span className="text-silver/30">•</span>
                      <button
                        onClick={() => setShowTerms(true)}
                        className="flex items-center gap-2 text-electric-blue hover:text-electric-blue/80 transition-colors"
                      >
                        <Shield className="w-4 h-4" />
                        Terms & Conditions
                      </button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <button
                      onClick={handleDecline}
                      className="px-6 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 transition-all font-medium"
                    >
                      Decline
                    </button>
                    <AnimatedButton
                      onClick={handleAccept}
                      variant="primary"
                      size="md"
                      className="px-6"
                    >
                      Accept All
                    </AnimatedButton>
                  </div>
                </div>

                {/* Cookie Types Info */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <details className="group">
                    <summary className="cursor-pointer text-sm font-medium text-white hover:text-electric-blue transition-colors list-none flex items-center justify-between">
                      <span>What cookies do we use?</span>
                      <svg
                        className="w-5 h-5 transition-transform group-open:rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="mt-4 space-y-3 text-sm text-silver/70">
                      <div className="p-3 rounded-lg bg-white/5">
                        <h4 className="font-semibold text-white mb-1">Essential Cookies</h4>
                        <p>Required for the website to function properly. These cannot be disabled.</p>
                      </div>
                      <div className="p-3 rounded-lg bg-white/5">
                        <h4 className="font-semibold text-white mb-1">Analytics Cookies</h4>
                        <p>Help us understand how visitors interact with our website by collecting anonymous data.</p>
                      </div>
                      <div className="p-3 rounded-lg bg-white/5">
                        <h4 className="font-semibold text-white mb-1">Preference Cookies</h4>
                        <p>Remember your language preference and other customization options.</p>
                      </div>
                    </div>
                  </details>
                </div>
              </div>
            </div>
          </motion.div>
        </>
        )}
      </AnimatePresence>
    </>
  )
}

export default CookieConsent
