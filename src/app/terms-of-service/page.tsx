"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, FileText, ShieldCheck, Users, Link as LinkIcon, AlertTriangle, Mail, ExternalLink, Landmark, Edit3, Ban, Info } from 'lucide-react';
import Link from 'next/link';

const TermsOfServicePage = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } },
  };

  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Slightly faster stagger for potentially more sections
        delayChildren: 0.2,
      },
    },
  };

  const TermSection = ({ title, children, id, icon: Icon }: { title: string, children: React.ReactNode, id: string, icon?: React.ElementType }) => (
    <motion.section
      id={id}
      variants={sectionVariants}
      className="mb-10 bg-card text-card-foreground p-6 md:p-8 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground border-b border-border pb-3 flex items-center">
        {Icon ? <Icon size={28} className="mr-3 text-primary" /> : <FileText size={28} className="mr-3 text-primary" />}
        {title}
      </h2>
      <div className="space-y-4 text-muted-foreground text-base leading-relaxed">
        {children}
      </div>
    </motion.section>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-primary"
      >
        <div className="container mx-auto px-4 py-16 md:py-20 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4 flex items-center justify-center"
          >
            <FileText size={40} className="mr-3" /> Terms of Service
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto"
          >
            Please read these terms carefully before using our services.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-4 text-sm text-primary-foreground/80 flex items-center justify-center"
          >
            <CalendarDays size={16} className="mr-2" />
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-12 md:py-16"
      >
        <TermSection title="Introduction" id="introduction" icon={Info}>
          <p>Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the DriveDeals website (the "Service") operated by DriveDeals ("us", "we", or "our").</p>
          <p>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.</p>
          <p className="font-medium text-foreground">By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.</p>
        </TermSection>

        <TermSection title="User Accounts" id="accounts" icon={Users}>
          <p>When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>
          <p>You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.</p>
          <p>You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p>
        </TermSection>

        <TermSection title="Intellectual Property" id="intellectual-property" icon={ShieldCheck}>
          <p>The Service and its original content, features, and functionality are and will remain the exclusive property of DriveDeals and its licensors. The Service is protected by copyright, trademark, and other laws of the relevant jurisdictions.</p>
          <p>Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of DriveDeals.</p>
        </TermSection>

        <TermSection title="Links to Other Websites" id="links" icon={LinkIcon}>
          <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by DriveDeals.</p>
          <p>DriveDeals has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party web sites or services. You further acknowledge and agree that DriveDeals shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.</p>
          <div className="mt-4 p-4 bg-primary/10 dark:bg-primary/20 rounded-md border-l-4 border-primary">
            <p className="font-medium text-primary">We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit.</p>
          </div>
        </TermSection>

        <TermSection title="Termination" id="termination" icon={Ban}>
          <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
          <p>Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.</p>
        </TermSection>
        
        <TermSection title="Governing Law" id="governing-law" icon={Landmark}>
          <p>These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction - e.g., the State of California, USA], without regard to its conflict of law provisions.</p>
          <p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.</p>
           <div className="mt-4 p-3 bg-muted/50 rounded-md border border-border">
             <p className="text-sm text-foreground">Please replace "[Your Jurisdiction]" with the actual governing jurisdiction for your business.</p>
           </div>
        </TermSection>

        <TermSection title="Changes to Terms" id="changes" icon={Edit3}>
          <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
          <p>By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.</p>
        </TermSection>

        <TermSection title="Contact Us" id="contact" icon={Mail}>
          <p>If you have any questions about these Terms, please contact us:</p>
          <motion.div 
            variants={staggerContainerVariants} // Re-use stagger for contact items if needed
            className="grid md:grid-cols-1 gap-6 mt-6" // Simplified to one column for this context
          >
            <motion.div variants={cardVariants} className="p-6 bg-background rounded-lg border border-border hover:shadow-md transition-shadow">
              <div className="flex items-center mb-3">
                <Mail size={24} className="mr-3 text-primary" />
                <h4 className="text-lg font-semibold text-foreground">By Email</h4>
              </div>
              <a href="mailto:legal@drivedeals.example.com" className="text-primary hover:underline">
                legal@drivedeals.example.com
              </a>
            </motion.div>
            <motion.div variants={cardVariants} className="p-6 bg-background rounded-lg border border-border hover:shadow-md transition-shadow">
              <div className="flex items-center mb-3">
                <ExternalLink size={24} className="mr-3 text-primary" />
                <h4 className="text-lg font-semibold text-foreground">Via Our Website</h4>
              </div>
              <Link href="/contact" className="text-primary hover:underline">
                Visit our Contact Page
              </Link>
            </motion.div>
          </motion.div>
           <div className="mt-6 p-3 bg-muted/50 rounded-md border border-border">
             <p className="text-sm text-foreground">Please ensure the email address <code className="bg-muted px-1 rounded">legal@drivedeals.example.com</code> is updated to your actual legal contact email.</p>
           </div>
        </TermSection>

        {/* Footer update timestamp */}
        <motion.div
          variants={sectionVariants}
          className="mt-16 pt-8 border-t border-border text-sm text-muted-foreground text-center"
        >
          <p>© {new Date().getFullYear()} DriveDeals. All rights reserved.</p>
          <p className="mt-1">These Terms of Service were last reviewed and updated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TermsOfServicePage;
