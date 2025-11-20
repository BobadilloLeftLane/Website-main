import { motion, AnimatePresence } from 'framer-motion'
import { X, FileText, AlertCircle, CheckCircle, Scale } from 'lucide-react'

interface TermsModalProps {
  isOpen: boolean
  onClose: () => void
}

const TermsModal = ({ isOpen, onClose }: TermsModalProps) => {
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
                    <FileText className="w-8 h-8 text-electric-blue" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">Terms & Conditions</h2>
                    <p className="text-silver/70 mt-1">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-8 text-silver/90">
                {/* Introduction */}
                <section>
                  <p className="leading-relaxed">
                    Welcome to Nova Studio Solutions. By accessing and using our website and services,
                    you agree to be bound by these Terms and Conditions. Please read them carefully
                    before using our services.
                  </p>
                </section>

                {/* Acceptance of Terms */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-6 h-6 text-electric-blue" />
                    <h3 className="text-xl font-bold text-white">Acceptance of Terms</h3>
                  </div>
                  <p className="leading-relaxed">
                    By accessing this website, you accept these Terms and Conditions in full. If you disagree
                    with any part of these terms, you must not use our website or services. Your continued
                    use of the website following any changes constitutes acceptance of those changes.
                  </p>
                </section>

                {/* Use of Website */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Scale className="w-6 h-6 text-electric-blue" />
                    <h3 className="text-xl font-bold text-white">Use of Website</h3>
                  </div>
                  <p className="leading-relaxed mb-3">
                    You may use our website for lawful purposes only. You agree not to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Use the website in any way that violates applicable laws or regulations</li>
                    <li>Attempt to gain unauthorized access to our systems or networks</li>
                    <li>Transmit any malicious code, viruses, or harmful materials</li>
                    <li>Engage in any automated data collection without explicit permission</li>
                    <li>Impersonate any person or entity</li>
                    <li>Interfere with the proper functioning of the website</li>
                  </ul>
                </section>

                {/* Intellectual Property */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="w-6 h-6 text-electric-blue" />
                    <h3 className="text-xl font-bold text-white">Intellectual Property Rights</h3>
                  </div>
                  <p className="leading-relaxed">
                    All content on this website, including text, graphics, logos, images, software, and design,
                    is the property of Nova Studio Solutions and is protected by international copyright and
                    intellectual property laws. You may not reproduce, distribute, modify, or create derivative
                    works without our explicit written permission.
                  </p>
                </section>

                {/* Services */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-6 h-6 text-electric-blue" />
                    <h3 className="text-xl font-bold text-white">Our Services</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2">Service Descriptions</h4>
                      <p className="leading-relaxed">
                        We provide software development, web application development, and digital transformation
                        services. Service details, timelines, and pricing are defined in individual project
                        proposals and contracts.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-white mb-2">Service Modifications</h4>
                      <p className="leading-relaxed">
                        We reserve the right to modify, suspend, or discontinue any aspect of our services
                        at any time. We will make reasonable efforts to notify clients of significant changes.
                      </p>
                    </div>
                  </div>
                </section>

                {/* User Responsibilities */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <AlertCircle className="w-6 h-6 text-electric-blue" />
                    <h3 className="text-xl font-bold text-white">User Responsibilities</h3>
                  </div>
                  <p className="leading-relaxed mb-3">
                    When using our services, you are responsible for:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Providing accurate and complete information</li>
                    <li>Maintaining the confidentiality of any account credentials</li>
                    <li>Ensuring you have the right to use any materials provided to us</li>
                    <li>Complying with all applicable laws and regulations</li>
                    <li>Timely payment for services rendered</li>
                  </ul>
                </section>

                {/* Payment Terms */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Scale className="w-6 h-6 text-electric-blue" />
                    <h3 className="text-xl font-bold text-white">Payment Terms</h3>
                  </div>
                  <div className="space-y-3">
                    <p className="leading-relaxed">
                      Payment terms are specified in individual project contracts. Generally:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Invoices are due within 30 days unless otherwise agreed</li>
                      <li>Late payments may incur additional fees</li>
                      <li>We reserve the right to suspend services for non-payment</li>
                      <li>All prices are quoted in USD unless otherwise specified</li>
                    </ul>
                  </div>
                </section>

                {/* Limitation of Liability */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <AlertCircle className="w-6 h-6 text-electric-blue" />
                    <h3 className="text-xl font-bold text-white">Limitation of Liability</h3>
                  </div>
                  <p className="leading-relaxed mb-3">
                    To the maximum extent permitted by law:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>We provide our website and services "as is" without warranties of any kind</li>
                    <li>We are not liable for any indirect, incidental, or consequential damages</li>
                    <li>Our total liability shall not exceed the amount paid for the specific service</li>
                    <li>We are not responsible for delays or failures due to circumstances beyond our control</li>
                  </ul>
                </section>

                {/* Confidentiality */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="w-6 h-6 text-electric-blue" />
                    <h3 className="text-xl font-bold text-white">Confidentiality</h3>
                  </div>
                  <p className="leading-relaxed">
                    We respect the confidentiality of information shared by our clients. We will not disclose
                    confidential information to third parties without your consent, except as required by law.
                    Detailed confidentiality terms are included in individual service contracts.
                  </p>
                </section>

                {/* Termination */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <AlertCircle className="w-6 h-6 text-electric-blue" />
                    <h3 className="text-xl font-bold text-white">Termination</h3>
                  </div>
                  <p className="leading-relaxed">
                    We reserve the right to terminate or suspend access to our website and services immediately,
                    without prior notice, for any violation of these Terms and Conditions or for any other
                    reason we deem necessary.
                  </p>
                </section>

                {/* Governing Law */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Scale className="w-6 h-6 text-electric-blue" />
                    <h3 className="text-xl font-bold text-white">Governing Law</h3>
                  </div>
                  <p className="leading-relaxed">
                    These Terms and Conditions are governed by and construed in accordance with the laws of
                    Serbia. Any disputes arising from these terms shall be subject to the exclusive jurisdiction
                    of the courts of Serbia.
                  </p>
                </section>

                {/* Contact Information */}
                <section className="bg-electric-blue/10 p-6 rounded-xl border border-electric-blue/20">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="w-6 h-6 text-electric-blue" />
                    <h3 className="text-xl font-bold text-white">Contact Us</h3>
                  </div>
                  <p className="leading-relaxed mb-3">
                    If you have any questions about these Terms and Conditions, please contact us:
                  </p>
                  <div className="space-y-2">
                    <p><strong className="text-white">Email:</strong> dev.nssolutions@gmail.com</p>
                    <p><strong className="text-white">Company:</strong> Nova Studio Solutions</p>
                    <p><strong className="text-white">Location:</strong> Novi Sad, Serbia</p>
                  </div>
                </section>

                {/* Changes to Terms */}
                <section>
                  <h3 className="text-xl font-bold text-white mb-4">Changes to These Terms</h3>
                  <p className="leading-relaxed">
                    We reserve the right to modify these Terms and Conditions at any time. Changes will be
                    effective immediately upon posting to this website. We will update the "Last updated" date
                    at the top of this page. Your continued use of our services after changes constitutes
                    acceptance of the modified terms.
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

export default TermsModal
