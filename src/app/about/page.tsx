"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Github, ExternalLink } from 'lucide-react';
import Link from 'next/link';

// Define the PartnerType interface
interface PartnerType {
  id: string;
  name: string;
  designation: string;
  image: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  description: string;
}

// Partner component with typed props
const Partner = ({ partner }: { partner: PartnerType }) => {
  return (
    <div className="bg-card text-card-foreground rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
      <div className="h-48 bg-muted/50 relative overflow-hidden"> {/* Using a muted background for image area */}
        {/* Placeholder image with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" /> {/* Darker gradient for better text visibility */}
        <img 
          src={partner.image} // Consider using actual partner images or a more theme-aligned placeholder
          alt={partner.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white">{partner.name}</h3> {/* White text on dark gradient is fine */}
          <p className="text-sm text-gray-200">{partner.designation}</p> {/* Lighter gray on dark gradient */}
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-sm mb-4">{partner.description}</p> {/* Will inherit text-card-foreground */}
        <div className="flex space-x-3">
          {partner.socialLinks.linkedin && (
            <a href={partner.socialLinks.linkedin} className="text-primary hover:text-primary/80">
              <Linkedin size={20} />
            </a>
          )}
          {partner.socialLinks.twitter && (
            <a href={partner.socialLinks.twitter} className="text-primary hover:text-primary/80"> {/* Using primary for Twitter as well for consistency */}
              <Twitter size={20} />
            </a>
          )}
          {partner.socialLinks.github && (
            <a href={partner.socialLinks.github} className="text-foreground/70 hover:text-foreground"> {/* Slightly muted foreground for GitHub */}
              <Github size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// About Us page component
const AboutUsPage = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
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


  const partnersData = [
    {
      id: '1',
      name: 'Alice Wonderland',
      designation: 'Chief Executive Officer',
      image: '/ceo.jpeg',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/alicewonderland',
        twitter: 'https://twitter.com/alicew',
      },
      description: 'Alice leads DriveDeals with a vision to revolutionize the car buying experience. She has over 15 years of experience in the tech and automotive sectors.',
    },
    {
      id: '2',
      name: 'Bob The Builder',
      designation: 'Chief Technology Officer',
      image: '/images/partners/cto.jpeg',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/bobthebuilder',
        github: 'https://github.com/bobuilder',
      },
      description: 'Bob is the mastermind behind our innovative platform. He is passionate about leveraging technology to solve complex problems and enhance user experience.',
    },
    {
      id: '3',
      name: 'Carol Danvers',
      designation: 'Chief Marketing Officer',
      image: '/images/partners/cmo.jpeg',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/caroldanvers',
        twitter: 'https://twitter.com/carold',
      },
      description: 'Carol spearheads our marketing strategies, ensuring DriveDeals reaches and resonates with car enthusiasts everywhere. She excels at brand building.',
    },
    {
      id: '4',
      name: 'David Copperfield',
      designation: 'Head of Operations',
      image: '/images/partners/hod.jpeg',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/davidcopperfield',
      },
      description: 'David ensures the smooth operation of all DriveDeals services. His expertise in logistics and customer service is key to our success.',
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Michael Brown",
      role: "First-time Car Buyer",
      text: "DriveDeals made my first car purchase incredibly smooth. The transparency and support I received throughout the process was outstanding.",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Returning Customer",
      text: "I've bought three cars through DriveDeals now. Their platform keeps getting better and the deals are unmatched in the industry.",
    },
    {
      id: 3,
      name: "James Wilson",
      role: "Family Car Shopper",
      text: "Finding the right family car was a breeze with DriveDeals. The filtering options helped me narrow down exactly what I needed.",
    }
  ];

  // Key stats
  const stats = [
    { id: 1, value: "10,000+", label: "Happy Customers" },
    { id: 2, value: "5,000+", label: "Cars Sold" },
    { id: 3, value: "150+", label: "Dealer Partners" },
    { id: 4, value: "98%", label: "Customer Satisfaction" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-primary"
      >
        <div className="absolute inset-0 bg-primary opacity-90 dark:opacity-80"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl font-bold text-primary-foreground text-center mb-4"
          >
            About DriveDeals
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl text-primary-foreground/90 text-center max-w-3xl mx-auto"
          >
            Revolutionizing the car buying experience with transparency, 
            trust, and technology since 2023.
          </motion.p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Company Overview */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold mb-6 text-foreground text-center">Our Story</h2>
          <div className="bg-card text-card-foreground shadow-md rounded-lg p-8">
            <p className="text-lg mb-4">
              Welcome to DriveDeals! We are passionate about connecting car buyers with their dream vehicles.
            </p>
            <p className="text-lg mb-4">
              Founded in 2023, DriveDeals has quickly become a trusted name in the automotive industry.
              We pride ourselves on our commitment to customer satisfaction, transparency, and integrity in all our dealings.
            </p>
            <p className="text-lg">
              Our platform combines cutting-edge technology with automotive expertise to create 
              a seamless car buying journey. We believe everyone deserves a stress-free path to vehicle ownership.
            </p>
          </div>
        </motion.div>

        {/* Company Stats */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-6xl mx-auto mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map(stat => (
              <motion.div
                key={stat.id}
                variants={cardVariants}
                className="bg-card text-card-foreground rounded-lg shadow p-6 text-center"
              >
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission & Values */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div variants={cardVariants} className="bg-card text-card-foreground shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mr-3">
                  <ExternalLink size={20} className="text-primary" />
                </div>
                Our Mission
              </h2>
              <p>
                To provide a seamless, transparent, and enjoyable car shopping experience, offering a wide selection of quality vehicles at competitive prices, and empowering customers to make informed decisions with confidence.
              </p>
            </motion.div>

            <motion.div variants={cardVariants} className="bg-card text-card-foreground shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mr-3">
                  <ExternalLink size={20} className="text-primary" />
                </div>
                Our Vision
              </h2>
              <p>
                To be the leading online automotive marketplace, recognized for innovation, exceptional customer service, and a commitment to making car ownership accessible and delightful for everyone.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Our Values */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold mb-6 text-foreground text-center">Our Values</h2>
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden" // Added initial hidden for the inner stagger container
            whileInView="visible" // Added whileInView for the inner stagger container
            viewport={{ once: true, amount: 0.2 }} // Added viewport for the inner stagger container
            className="bg-card text-card-foreground shadow-md rounded-lg p-8"
          >
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Customer First", text: "We prioritize the needs and satisfaction of our customers above all else." },
                { title: "Quality Assurance", text: "Every car on our platform undergoes rigorous inspection to ensure quality and reliability." },
                { title: "Transparency", text: "We believe in clear and honest communication throughout the buying process." },
                { title: "Innovation", text: "We continuously strive to improve our services and leverage technology to enhance the user experience." },
                { title: "Integrity", text: "We operate with honesty and uphold the highest ethical standards in every interaction." },
                { title: "Community", text: "We aim to build a strong community of car enthusiasts and satisfied customers." },
              ].map((value, index) => (
                <motion.div key={index} variants={cardVariants} className="flex">
                  <div className="mr-4 w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-lg">{`0${index + 1}`}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{value.title}</h3>
                    <p>{value.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Team Members */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-foreground">Meet Our Leadership Team</h2>
          <p className="text-lg text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
            We are a team of dedicated professionals passionate about cars and customer satisfaction. Get to know the people behind DriveDeals.
          </p>
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden" // Added initial hidden for the inner stagger container
            whileInView="visible" // Added whileInView for the inner stagger container
            viewport={{ once: true, amount: 0.1 }} // Added viewport for the inner stagger container
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {partnersData.map((partner) => (
              <motion.div key={partner.id} variants={cardVariants}>
                <Partner partner={partner} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-foreground">What Our Customers Say</h2>
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden" // Added initial hidden for the inner stagger container
            whileInView="visible" // Added whileInView for the inner stagger container
            viewport={{ once: true, amount: 0.2 }} // Added viewport for the inner stagger container
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={cardVariants}
                className="bg-card text-card-foreground shadow-md rounded-lg p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-primary to-accent rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-primary-foreground mb-4">Ready to Find Your Dream Car?</h2>
            <p className="text-primary-foreground/90 text-lg mb-6">
              Join thousands of satisfied customers who found their perfect vehicle through DriveDeals.
            </p>
            <Link href={`/`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary-foreground text-primary font-semibold py-3 px-8 rounded-lg shadow hover:bg-primary-foreground/90 transition duration-300"
            >
              Explore Vehicles
            </motion.button>
            
            </Link>
            
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUsPage;
