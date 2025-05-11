// src/app/faq/page.tsx
"use client";

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

// FAQ category interface
interface FAQCategory {
  title: string;
  questions: {
    question: string;
    answer: string;
  }[];
}

export default function FAQPage() {
  // State to track which questions are expanded
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  // Toggle question expansion
  const toggleItem = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // FAQ data organized by categories
  const faqCategories: FAQCategory[] = [
    {
      title: "General Questions",
      questions: [
        {
          question: "What is DriveDeals?",
          answer: "DriveDeals is your premier destination for finding the best deals on new and used cars. We connect buyers with a wide selection of vehicles from trusted sellers across the country, helping you find your perfect car at the best possible price."
        },
        {
          question: "How does DriveDeals work?",
          answer: "Our platform aggregates vehicle listings from dealerships and private sellers nationwide. We verify each listing for accuracy and provide you with comprehensive vehicle information, pricing comparisons, and seller reviews to help you make an informed decision."
        },
        {
          question: "Is DriveDeals free to use?",
          answer: "Yes! Browsing our listings and using our search tools is completely free for car shoppers. We generate revenue through our partnerships with dealerships and premium listing options for sellers."
        }
      ]
    },
    {
      title: "Using Our Platform",
      questions: [
        {
          question: "How do I search for a car?",
          answer: "You can use our advanced search filters on the homepage or the 'Browse Cars' page to find vehicles based on make, model, year, price, mileage, and many other criteria. Save your searches to receive alerts when new matching vehicles are listed."
        },
        {
          question: "Can I save my favorite listings?",
          answer: "Yes! Create a free DriveDeals account to save your favorite listings, set up custom alerts, and track price changes on vehicles you're interested in."
        },
        {
          question: "How accurate are the listings on DriveDeals?",
          answer: "We work directly with sellers to ensure listing accuracy. All dealerships are verified partners, and private sellers must complete a verification process. We regularly audit listings and remove any that don't meet our quality standards."
        }
      ]
    },
    {
      title: "Buying & Selling",
      questions: [
        {
          question: "How do I contact a seller about a vehicle?",
          answer: "Each listing includes contact options - typically a direct message form, phone number, or email address. For dealership listings, you can often schedule test drives or request more information directly through our platform."
        },
        {
          question: "Can I sell my car on DriveDeals?",
          answer: "Absolutely! You can create a seller account and list your vehicle in minutes. We offer both free basic listings and premium options with enhanced visibility. Visit our 'Sell Your Car' page to get started."
        },
        {
          question: "Does DriveDeals offer financing?",
          answer: "While we don't directly provide financing, we partner with trusted lenders to offer pre-approval options. You can estimate monthly payments using our loan calculator and apply for financing through our network of lenders."
        }
      ]
    },
    {
      title: "Support & Policies",
      questions: [
        {
          question: "How can I contact support?",
          answer: "You can reach our support team through the contact form on our 'Contact Us' page, by emailing support@drivedeals.example.com, or by calling our customer service line at (555) 123-4567 during business hours (Mon-Fri, 9am-6pm EST)."
        },
        {
          question: "What is your privacy policy?",
          answer: "We take your privacy seriously. We collect limited personal information to provide our services and never sell your data to third parties. You can review our complete privacy policy <a href='/privacy-policy' className='text-blue-600 hover:underline'>here</a>."
        },
        {
          question: "How do I report an issue with a listing?",
          answer: "If you notice inaccurate information or have concerns about a listing, please click the 'Report Listing' button on the listing page or contact our support team directly. We investigate all reports promptly."
        }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      
      {/* Search bar for FAQs */}
      <div className="mb-8">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search FAQs..." 
            className="w-full p-3 pl-10 border bg-card text-card-foreground border-input rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary placeholder:text-muted-foreground"
          />
          <svg 
            className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="space-y-8">
        {faqCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="bg-card rounded-lg shadow-md overflow-hidden">
            <h2 className="text-2xl font-semibold bg-muted/50 dark:bg-muted/20 text-card-foreground p-4 border-b border-border">
              {category.title}
            </h2>
            <div className="divide-y divide-border">
              {category.questions.map((item, itemIndex) => {
                const id = `faq-${categoryIndex}-${itemIndex}`;
                const isExpanded = expandedItems[id] || false;
                
                return (
                  <div key={itemIndex} className="border-b border-border last:border-b-0">
                    <button 
                      className="flex justify-between items-center w-full p-4 text-left text-lg font-medium text-card-foreground hover:bg-muted/50 dark:hover:bg-muted/20 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-inset"
                      onClick={() => toggleItem(id)}
                      aria-expanded={isExpanded}
                    >
                      <span>{item.question}</span>
                      {isExpanded ? 
                        <ChevronUp className="h-5 w-5 text-primary" /> : 
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      }
                    </button>
                    
                    {isExpanded && (
                      <div className="p-4 pt-0 bg-muted/50 dark:bg-muted/20">
                        <div 
                          className="prose max-w-none text-muted-foreground dark:text-muted-foreground"
                          dangerouslySetInnerHTML={{ __html: item.answer.replace("text-blue-600 hover:underline", "text-primary hover:underline dark:text-primary") }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Still need help section */}
      <div className="mt-12 bg-muted/50 dark:bg-muted/20 rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-card-foreground">Still Have Questions?</h2>
        <p className="mb-6 text-card-foreground">Our customer support team is here to help. Reach out to us through any of the following channels:</p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-card p-4 rounded-lg shadow-sm text-center">
            <svg className="h-8 w-8 mx-auto mb-2 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h3 className="font-medium mb-1 text-card-foreground">Email Us</h3>
            <p className="text-sm text-card-foreground">support@drivedeals.example.com</p>
          </div>
          <div className="bg-card p-4 rounded-lg shadow-sm text-center">
            <svg className="h-8 w-8 mx-auto mb-2 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <h3 className="font-medium mb-1 text-card-foreground">Call Us</h3>
            <p className="text-sm text-card-foreground">(555) 123-4567</p>
            <p className="text-xs text-muted-foreground">Mon-Fri, 9am-6pm EST</p>
          </div>
          <div className="bg-card p-4 rounded-lg shadow-sm text-center">
            <svg className="h-8 w-8 mx-auto mb-2 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <h3 className="font-medium mb-1 text-card-foreground">Live Chat</h3>
            <p className="text-sm text-card-foreground">Available 24/7</p>
            <button className="mt-2 text-xs bg-primary text-primary-foreground py-1 px-3 rounded-full hover:bg-primary/90 transition-colors">Start Chat</button>
          </div>
        </div>
      </div>
    </div>
  );
}
