"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Mail, Send } from "lucide-react"
import { TextAnimate } from '@/components/magicui/text-animate'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const recipient = 'info@yvsmechotronics.com'
    const subject = encodeURIComponent(`Inquiry from ${formData.name}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )
    const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`

    // Redirect to mail client
    window.location.href = mailtoUrl
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-muted/50 py-12 sm:py-16 lg:py-20">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold sm:text-5xl">
            <TextAnimate animation="blurInUp" by="character" startOnView>
              Contact YVS Mechatronics
            </TextAnimate>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Get in touch with our team for inquiries about industrial automation, special-purpose machines, precision engineering, and fabrication services.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-7xl gap-x-8 gap-y-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold">Get in Touch</h2>
              <p className="mt-4 text-muted-foreground">
                Our experts are here to answer your questions and guide you through our innovative engineering solutions.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <MapPin className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-muted-foreground">
                    Shed No. 19 &amp; 20, Phase-II, IDA, Cherlapally, Kapra, Hyderabad,<br />
                    Medchal Malkajgiri Dist- 500051, Telangana State
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Mail className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground">info@yvsmechotronics.com</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="aspect-video w-full overflow-hidden rounded-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.531685694653!2d78.39599631531766!3d17.385044188728446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91d6f92f962f%3A0x23d58d29ebfe73de!2sIDA,Cherlapally,Kapra,Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1659942468967!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl bg-card p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="How can we assist you?"
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full">
                Send Message
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
