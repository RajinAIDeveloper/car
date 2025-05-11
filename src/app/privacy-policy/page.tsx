"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, ShieldCheck, FileText, Mail, Phone, Info, AlertTriangle, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const PrivacyPolicyPage = () => {
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
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const PolicySection = ({ title, children, id }: { title: string, children: React.ReactNode, id: string }) => (
    <motion.section
      id={id}
      variants={sectionVariants}
      className="mb-12 bg-card text-card-foreground p-6 md:p-8 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground border-b border-border pb-3 flex items-center">
        <FileText size={28} className="mr-3 text-primary" /> {title}
      </h2>
      <div className="space-y-4 text-muted-foreground">
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
            <ShieldCheck size={40} className="mr-3" /> Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto"
          >
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
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
        {/* Introduction */}
        <motion.div
          variants={sectionVariants}
          className="mb-12 bg-card text-card-foreground p-6 md:p-8 rounded-lg shadow-lg"
        >
          <div className="flex items-start p-4 bg-primary/10 dark:bg-primary/20 rounded-md border-l-4 border-primary mb-6">
            <Info size={24} className="mr-3 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium text-primary text-lg">
                DriveDeals ("us", "we", or "our") operates the DriveDeals website (the "Service").
              </p>
              <p className="text-muted-foreground mt-1">
                This document outlines our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner.
              </p>
            </div>
          </div>
        </motion.div>

        <PolicySection title="Information Collection and Use" id="collection">
          <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
          <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">Types of Data Collected</h3>
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <motion.div variants={cardVariants} className="p-6 border border-border rounded-lg bg-background hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-lg mb-2 text-foreground">Personal Data</h4>
              <p className="mb-3">While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This may include, but is not limited to:</p>
              <ul className="space-y-1 list-disc list-inside marker:text-primary">
                <li>Email address</li>
                <li>First name and last name</li>
                <li>Phone number</li>
                <li>Address, State, Province, ZIP/Postal code, City</li>
                <li>Cookies and Usage Data</li>
              </ul>
            </motion.div>
            <motion.div variants={cardVariants} className="p-6 border border-border rounded-lg bg-background hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-lg mb-2 text-foreground">Usage Data</h4>
              <p className="mb-3">We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as:</p>
              <ul className="space-y-1 list-disc list-inside marker:text-primary">
                <li>Your computer's Internet Protocol address (e.g. IP address)</li>
                <li>Browser type, browser version</li>
                <li>The pages of our Service that you visit, the time and date of your visit</li>
                <li>The time spent on those pages</li>
                <li>Unique device identifiers and other diagnostic data</li>
              </ul>
            </motion.div>
          </div>
        </PolicySection>

        <PolicySection title="Use of Data" id="use">
          <p>DriveDeals uses the collected data for various purposes:</p>
          <ul className="grid md:grid-cols-2 gap-x-6 gap-y-4 mt-4 list-none p-0">
            {[
              "To provide and maintain our Service",
              "To notify you about changes to our Service",
              "To allow you to participate in interactive features of our Service when you choose to do so",
              "To provide customer support",
              "To gather analysis or valuable information so that we can improve our Service",
              "To monitor the usage of our Service",
              "To detect, prevent and address technical issues",
            ].map((item, index) => (
              <motion.li key={index} variants={cardVariants} className="flex items-start p-3 bg-background rounded-md border border-border">
                <ShieldCheck size={20} className="mr-3 text-primary flex-shrink-0 mt-1" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </PolicySection>

        <PolicySection title="Security of Data" id="security">
          <div className="flex items-start p-4 bg-yellow-500/10 dark:bg-yellow-500/20 rounded-md border-l-4 border-yellow-500">
            <AlertTriangle size={24} className="mr-3 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium text-yellow-700 dark:text-yellow-300">
                The security of your data is important to us.
              </p>
              <p className="text-muted-foreground mt-1">
                However, remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
              </p>
            </div>
          </div>
        </PolicySection>

        <PolicySection title="Changes to This Privacy Policy" id="changes">
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "last updated" date at the top of this Privacy Policy.</p>
          <p className="mt-2">You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
        </PolicySection>

        <PolicySection title="Contact Us" id="contact">
          <p>If you have any questions about this Privacy Policy, please contact us:</p>
          <motion.div 
            variants={staggerContainerVariants}
            className="grid md:grid-cols-2 gap-6 mt-6"
          >
            <motion.div variants={cardVariants} className="p-6 bg-background rounded-lg border border-border hover:shadow-md transition-shadow">
              <div className="flex items-center mb-3">
                <Mail size={24} className="mr-3 text-primary" />
                <h4 className="text-lg font-semibold text-foreground">By Email</h4>
              </div>
              <a href="mailto:privacy@drivedeals.example.com" className="text-primary hover:underline">
                privacy@drivedeals.example.com
              </a>
            </motion.div>
            <motion.div variants={cardVariants} className="p-6 bg-background rounded-lg border border-border hover:shadow-md transition-shadow">
              <div className="flex items-center mb-3">
                <Phone size={24} className="mr-3 text-primary" />
                <h4 className="text-lg font-semibold text-foreground">By Phone</h4>
              </div>
              <a href="tel:+18005551234" className="text-primary hover:underline">
                1-800-555-1234
              </a>
            </motion.div>
          </motion.div>
          <div className="mt-8 p-6 bg-primary/10 dark:bg-primary/20 rounded-lg text-center">
            <h3 className="font-semibold text-xl mb-3 text-foreground">Need More Information?</h3>
            <p className="mb-4 text-muted-foreground">Visit our main contact page for additional ways to reach our team.</p>
            <Link href="/contact" passHref>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-md shadow transition-colors duration-200"
              >
                Go to Contact Page <ExternalLink size={18} className="ml-2" />
              </motion.button>
            </Link>
          </div>
        </PolicySection>

        {/* Footer update timestamp */}
        <motion.div
          variants={sectionVariants}
          className="mt-16 pt-8 border-t border-border text-sm text-muted-foreground text-center"
        >
          <p>© {new Date().getFullYear()} DriveDeals. All rights reserved.</p>
          <p className="mt-1">This privacy policy was last reviewed and updated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicyPage;
