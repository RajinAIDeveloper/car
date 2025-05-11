'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, ArrowRight, MessageSquare, Users, HelpCircle } from 'lucide-react';
import Link from 'next/link';

// Contact Form Component
const ContactFormComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      }, 3000);
    }, 1000);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitSuccess ? (
        <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 p-4 rounded-lg text-center">
          <p className="text-green-700 dark:text-green-400 font-medium">Thank you! Your message has been sent successfully.</p>
          <p className="text-green-600 dark:text-green-500 text-sm mt-1">We'll get back to you as soon as possible.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-border rounded-md shadow-sm bg-card text-foreground focus:ring-2 focus:ring-ring focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-border rounded-md shadow-sm bg-card text-foreground focus:ring-2 focus:ring-ring focus:border-primary"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-muted-foreground mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-md shadow-sm bg-card text-foreground focus:ring-2 focus:ring-ring focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-muted-foreground mb-1">
                Subject *
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-border rounded-md shadow-sm bg-card text-foreground focus:ring-2 focus:ring-ring focus:border-primary"
              >
                <option value="">Select a subject</option>
                <option value="sales">Sales Inquiry</option>
                <option value="service">Service Request</option>
                <option value="support">Technical Support</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-2 border border-border rounded-md shadow-sm bg-card text-foreground focus:ring-2 focus:ring-ring focus:border-primary"
            />
          </div>
          
          <div className="flex items-center">
            <input
              id="privacy"
              type="checkbox"
              required
              className="h-4 w-4 text-primary border-border rounded focus:ring-ring"
            />
            <label htmlFor="privacy" className="ml-2 block text-sm text-muted-foreground">
              I agree to the{' '}
              <Link href="/privacy-policy" className="text-primary hover:underline">
                privacy policy
              </Link>{' '}
              and{' '}
              <Link href="/terms-of-service" className="text-primary hover:underline">
                terms of service
              </Link>
              .
            </label>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-md shadow transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </div>
        </>
      )}
    </form>
  );
};

const ContactUsPage = () => {
  // FAQ items for the accordion
  const faqItems = [
    {
      question: "What financing options do you offer?",
      answer: "We offer various financing options including loans, leases, and special financing programs for customers with all types of credit histories. Our finance team will work with you to find the best solution for your budget and needs."
    },
    {
      question: "Do you offer test drives?",
      answer: "Absolutely! We encourage test drives to ensure the vehicle fits your needs. You can schedule a test drive online or visit our dealership during business hours."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 5-day/250-mile money-back guarantee on most vehicles. If you're not completely satisfied, you can return your vehicle for a full refund within this period, no questions asked."
    }
  ];

  // Team members
  const teamMembers = [
    {
      name: "Sarah Johnson",
      position: "Sales Manager",
      email: "sarah.j@drivedeals.com"
    },
    {
      name: "Michael Rodriguez",
      position: "Customer Support Lead",
      email: "michael.r@drivedeals.com"
    },
    {
      name: "David Chen",
      position: "Finance Director",
      email: "david.c@drivedeals.com"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-16">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-primary text-primary-foreground py-16"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Get In Touch With Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90"
          >
            Our friendly team is here to help you find your perfect vehicle and answer any questions
          </motion.p>
        </div>
      </motion.div>

      {/* Contact Options Cards */}
      <div className="container mx-auto px-4 -mt-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.5,
              },
            },
          }}
        >
          {[
            { icon: <Phone className="h-6 w-6 text-secondary-foreground" />, title: "Call Us", text: "Speak directly with our sales or support team", link: "tel:(123)456-7890", linkText: "(123) 456-7890" },
            { icon: <Mail className="h-6 w-6 text-secondary-foreground" />, title: "Email Us", text: "Send us an email for any inquiries", link: "mailto:info@drivedeals.com", linkText: "info@drivedeals.com" },
            { icon: <MapPin className="h-6 w-6 text-secondary-foreground" />, title: "Visit Us", text: "Come check out our showroom in person", link: "#map", linkText: "Get directions" }
          ].map((card, index) => (
            <motion.div
              key={index}
              className="bg-card text-card-foreground rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <div className="bg-secondary p-3 rounded-full mb-4">
                {card.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">{card.title}</h3>
              <p className="text-muted-foreground mb-4">{card.text}</p>
              <a href={card.link} className="text-primary font-medium hover:underline flex items-center">
                {card.linkText} <ArrowRight className="h-4 w-4 ml-1" />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Main Content */}
      <motion.div 
        className="container mx-auto px-4 mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <div className="bg-card text-card-foreground rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <MessageSquare className="h-6 w-6 text-primary mr-3" />
                <h2 className="text-2xl font-bold text-foreground">Send Us a Message</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Let us know how we can help you. Fill out the form below and we'll get back to you as soon as possible.
              </p>
              <ContactFormComponent />
            </div>

            {/* FAQ Accordion */}
            <motion.div 
              className="bg-card text-card-foreground rounded-lg shadow-lg p-8 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <div className="flex items-center mb-6">
                <HelpCircle className="h-6 w-6 text-primary mr-3" />
                <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <details key={index} className="border border-border rounded-lg">
                    <summary className="flex justify-between items-center p-4 cursor-pointer text-foreground font-medium">
                      {item.question}
                    </summary>
                    <div className="px-4 pb-4 text-muted-foreground">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Sidebar */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            {/* Contact Information */}
            <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-foreground">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex">
                  <MapPin className="h-5 w-5 text-muted-foreground mr-3 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    123 Car Dealership Lane<br />
                    Auto City, AC 54321
                  </p>
                </div>
                <div className="flex">
                  <Phone className="h-5 w-5 text-muted-foreground mr-3 flex-shrink-0" />
                  <p className="text-muted-foreground">(123) 456-7890</p>
                </div>
                <div className="flex">
                  <Mail className="h-5 w-5 text-muted-foreground mr-3 flex-shrink-0" />
                  <p className="text-muted-foreground">info@drivedeals.com</p>
                </div>
                <div className="flex">
                  <Clock className="h-5 w-5 text-muted-foreground mr-3 flex-shrink-0" />
                  <div className="text-muted-foreground">
                    <p className="font-medium text-foreground">Business Hours:</p>
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Members */}
            <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Users className="h-5 w-5 text-primary mr-2" />
                <h3 className="text-xl font-bold text-foreground">Meet Our Team</h3>
              </div>
              <div className="space-y-4">
                {teamMembers.map((member, index) => (
                  <div key={index} className="border-b border-border last:border-0 pb-3 last:pb-0">
                    <p className="font-medium text-foreground">{member.name}</p>
                    <p className="text-muted-foreground text-sm">{member.position}</p>
                    <a href={`mailto:${member.email}`} className="text-primary text-sm hover:underline">
                      {member.email}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Map Section */}
            <div id="map" className="bg-card text-card-foreground rounded-lg shadow-lg overflow-hidden">
              <h3 className="text-xl font-bold p-6 pb-3 text-foreground">Our Location: Burj Khalifa</h3>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://maps.google.com/maps?q=Burj%20Khalifa&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Burj Khalifa Location"
                ></iframe>
              </div>
              <div className="p-4 text-center">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Burj+Khalifa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <MapPin className="h-5 w-5 mr-2" />
                  View in Google Maps
                </a>
              </div>
            </div>
          </motion.div> {/* Closes Sidebar motion.div */}
        </div> {/* Closes grid div */}
      </motion.div> {/* Closes Main Content motion.div */}
    </div>
  );
};

export default ContactUsPage;
