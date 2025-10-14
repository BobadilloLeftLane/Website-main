import { motion, AnimatePresence } from 'framer-motion'
import { X, Shield, Lock, Eye, Database, Mail } from 'lucide-react'

interface PrivacyPolicyModalProps {
  isOpen: boolean
  onClose: () => void
}

const PrivacyPolicyModal = ({ isOpen, onClose }: PrivacyPolicyModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-[9999] p-4 overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto glass-morphism rounded-2xl border border-electric-blue/30">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="sticky top-4 right-4 float-right p-2 rounded-full hover:bg-white/10 transition-colors z-10"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Header */}
              <div className="bg-gradient-to-r from-electric-blue/20 to-cyber-purple/20 p-8 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-electric-blue/20 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-electric-blue" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">Privacy Policy</h2>
                    <p className="text-silver/70 mt-1">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-8 text-silver/90">
                {/* Introduction */}
                <section>
                  <p className="leading-relaxed">
                    Nova Studio Solutions ("we," "our," or "us") is committed to protecting your privacy.
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                    when you visit our website or use our services.
                  </p>
                </section>

                {/* Information We Collect */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Database className="w-6 h-6 text-electric-blue" />
                    <h3 className="text-xl font-bold text-white">Information We Collect</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2">Personal Information</h4>
                      <p className="leading-relaxed">
                        When you contact us through our website, we collect information such as:
                      </p>
                      <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                        <li>Name and email address</li>
                        <li>Company name (optional)</li>
                        <li>Phone number (optional)</li>
                        <li>Project details and requirements</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-white mb-2">Automatically Collected Information</h4>
                      <p className="leading-relaxed">
                        When you visit our website, we automatically collect certain information:
                      </p>
                      <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                        <li>IP address and browser type</li>
                        <li>Device information and operating system</li>
                        <li>Pages visited and time spent on our site</li>
                        <li>Referring website and exit pages</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* How We Use Your Information */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Eye className="w-6 h-6 text-electric-blue" />
                    <h3 className="text-xl font-bold text-white">How We Use Your Information</h3>
                  </div>
                  <p className="leading-relaxed mb-3">
                    We use the collected information for the following purposes:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>To respond to your inquiries and provide customer support</li>
                    <li>To communicate project proposals and updates</li>
                    <li>To improve our website and services</li>
                    <li>To analyze website usage and trends</li>
                    <li>To comply with legal obligations</li>
                  </ul>
                </section>

                {/* Data Security */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Lock className="w-6 h-6 text-electric-blue" />
                    <h3 className="text-xl font-bold text-white">Data Security</h3>
                  </div>
                  <p className="leading-relaxed">
                    We implement appropriate technical and organizational security measures to protect
                    your personal information against unauthorized access, alteration, disclosure, or destruction.
                    However, no method of transmission over the internet is 100% secure, and we cannot guarantee
                    absolute security.
                  </p>
                </section>

                {/* Cookies */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Database className="w-6 h-6 text-electric-blue" />
                    <h3 className="text-xl font-bold text-white">Cookies and Tracking</h3>
                  </div>
                  <p className="leading-relaxed mb-3">
                    We use cookies and similar tracking technologies to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Remember your language preference</li>
                    <li>Analyze website traffic and usage patterns</li>
                    <li>Improve user experience</li>
                  </ul>
                  <p className="leading-relaxed mt-3">
                    You can control cookie settings through your browser preferences.
                  </p>
                </section>

                {/* Third-Party Services */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-6 h-6 text-electric-blue" />
                    <h3 className="text-xl font-bold text-white">Third-Party Services</h3>
                  </div>
                  <p className="leading-relaxed">
                    We do not sell, trade, or rent your personal information to third parties.
                    We may share information with trusted service providers who assist us in operating
                    our website and conducting our business, under strict confidentiality agreements.
                  </p>
                </section>

                {/* Your Rights */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-6 h-6 text-electric-blue" />
                    <h3 className="text-xl font-bold text-white">Your Rights (GDPR)</h3>
                  </div>
                  <p className="leading-relaxed mb-3">
                    Under GDPR, you have the following rights:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong className="text-white">Right to Access:</strong> Request copies of your personal data</li>
                    <li><strong className="text-white">Right to Rectification:</strong> Request correction of inaccurate data</li>
                    <li><strong className="text-white">Right to Erasure:</strong> Request deletion of your personal data</li>
                    <li><strong className="text-white">Right to Restrict Processing:</strong> Request limitation on how we use your data</li>
                    <li><strong className="text-white">Right to Data Portability:</strong> Request transfer of your data</li>
                    <li><strong className="text-white">Right to Object:</strong> Object to processing of your personal data</li>
                  </ul>
                </section>

                {/* Contact Information */}
                <section className="bg-electric-blue/10 p-6 rounded-xl border border-electric-blue/20">
                  <div className="flex items-center gap-3 mb-4">
                    <Mail className="w-6 h-6 text-electric-blue" />
                    <h3 className="text-xl font-bold text-white">Contact Us</h3>
                  </div>
                  <p className="leading-relaxed mb-3">
                    If you have any questions about this Privacy Policy or wish to exercise your rights,
                    please contact us:
                  </p>
                  <div className="space-y-2">
                    <p><strong className="text-white">Email:</strong> nova-solutions@novastudiosolutions.com</p>
                    <p><strong className="text-white">Company:</strong> Nova Studio Solutions</p>
                    <p><strong className="text-white">Location:</strong> Novi Sad, Serbia</p>
                  </div>
                </section>

                {/* Changes to Policy */}
                <section>
                  <h3 className="text-xl font-bold text-white mb-4">Changes to This Policy</h3>
                  <p className="leading-relaxed">
                    We may update this Privacy Policy from time to time. We will notify you of any changes
                    by updating the "Last updated" date at the top of this policy. Your continued use of
                    our website after changes constitutes acceptance of the updated policy.
                  </p>
                </section>
              </div>

              {/* Footer */}
              <div className="p-6 bg-white/5 border-t border-white/10 text-center">
                <button
                  onClick={onClose}
                  className="px-8 py-3 rounded-xl bg-electric-blue hover:bg-electric-blue/80 text-white font-medium transition-all"
                >
                  I Understand
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default PrivacyPolicyModal
