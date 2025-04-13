"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Mail, Send, Phone, Clock } from "lucide-react"
import { TextAnimate } from '@/components/magicui/text-animate'
import { BlurFade } from '@/components/magicui/blur-fade'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { TypographyH1, TypographyH2, TypographyH3, TypographyP, TypographyLead } from "@/components/ui/typography"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({
    type: null,
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again later.')
      }

      // Success
      setFormStatus({
        type: 'success',
        message: data.message || 'Thank you for your message. We will get back to you soon!'
      })

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      })
    } catch (error) {
      // Error
      setFormStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong. Please try again later.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="bg-white dark:bg-slate-900">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-slate-800 dark:to-slate-900">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute right-0 top-1/4 w-64 h-64 bg-blue-300/20 dark:bg-blue-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-indigo-300/20 dark:bg-indigo-500/10 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <TypographyH1 className="mb-6 text-slate-900 dark:text-white">
              <TextAnimate animation="blurInUp" by="word" startOnView>
                Contact YVS Mechatronics
              </TextAnimate>
            </TypographyH1>
            <TypographyLead className="text-slate-700 dark:text-slate-300">
              Reach out to our team for inquiries about our engineering solutions and services.
            </TypographyLead>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <TypographyH2 className="mb-8 text-slate-900 dark:text-white">Get in Touch</TypographyH2>
              <TypographyP className="text-slate-700 dark:text-slate-300 mb-10 mt-0">
                Our team is ready to answer your questions and discuss how we can help with your engineering and automation needs.
              </TypographyP>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <TypographyH3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Our Location</TypographyH3>
                    <p className="text-slate-700 dark:text-slate-300">
                      Shed No. 19 &amp; 20, Phase-II, IDA, Cherlapally, Kapra, Hyderabad,<br />
                      Medchal Malkajgiri Dist- 500051, Telangana State
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <TypographyH3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Email Us</TypographyH3>
                    <a href="mailto:info@yvsmechotronics.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                      info@yvsmechatronics.in
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <TypographyH3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Call Us</TypographyH3>
                    <p className="text-slate-700 dark:text-slate-300">+91 79951 80016</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <TypographyH3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Business Hours</TypographyH3>
                    <p className="text-slate-700 dark:text-slate-300">Monday - Saturday: 9:00AM - 6:00PM</p>
                  </div>
                </div>
              </div>
              
              {/* Map */}
              <div className="mt-10">
                <Card className="overflow-hidden border-0 shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.531685694653!2d78.39599631531766!3d17.385044188728446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91d6f92f962f%3A0x23d58d29ebfe73de!2sIDA,Cherlapally,Kapra,Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1659942468967!5m2!1sen!2sin"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </Card>
              </div>
            </div>
            
            {/* Contact Form */}
            <BlurFade delay={0.2} inView>
              <Card className="shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                <CardContent className="p-8">
                  <TypographyH2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Send Us a Message</TypographyH2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                        Your Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-slate-300 dark:border-slate-600 rounded-md"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-slate-300 dark:border-slate-600 rounded-md"
                        placeholder="your@email.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border border-slate-300 dark:border-slate-600 rounded-md"
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                        Your Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full min-h-[120px] border border-slate-300 dark:border-slate-600 rounded-md"
                        placeholder="How can we help you?"
                        rows={4}
                      />
                    </div>

                    {/* Form Status Messages */}
                    {formStatus.type && (
                      <div 
                        className={`p-4 mb-4 rounded-md ${
                          formStatus.type === 'success' 
                            ? 'bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                            : 'bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                        }`}
                      >
                        {formStatus.message}
                      </div>
                    )}
                    
                    <Button 
                      type="submit" 
                      className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </BlurFade>
          </div>
        </div>
      </section>
    </div>
  )
}