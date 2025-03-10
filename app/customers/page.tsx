"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function CustomersPage() {
  const customers = [
    {
      name: "Tech Manufacturing Ltd",
      logo: "https://jos.com.my/wp-content/uploads/2022/07/hightech-case.jpg",
      testimonial: "YVS Mechotronics has transformed our manufacturing process with their innovative automation solutions.",
      author: "Raju",
      position: "Operations Director"
    },
    {
      name: "Precision Industries",
      logo: "https://d33wubrfki0l68.cloudfront.net/5d31504bab980e9473485fdf1d28abdd2aea1ff3/b5e1f/images/industries/precision-engineering.jpg",
      testimonial: "The quality and precision of their CNC machining services are unmatched in the industry.",
      author: "Ravi",
      position: "Production Manager"
    },
    {
      name: "Global Automation Corp",
      logo: "https://iconape.com/wp-content/png_logo_vector/global-automation.png",
      testimonial: "Their special purpose machines have significantly improved our production efficiency.",
      author: "Ramu",
      position: "Technical Director"
    }
  ]

  // Define a robust array of client logos
  const clientLogos = [
    {
      src: "https://th.bing.com/th/id/OIP.lOtXe45g6usFzKe4MTAYDwHaF-?rs=1&pid=ImgDetMain",
      alt: "Client Logo 1"
    },
    {
      src: "https://cdn4.vectorstock.com/i/1000x1000/94/73/robot-arm-icon-machine-design-graphic-vector-9769473.jpg",
      alt: "Client Logo 2"
    },
    {
      src: "https://static.vecteezy.com/system/resources/previews/026/510/938/large_2x/modern-lettermark-logo-editable-and-easy-to-custom-minimal-logo-design-vector.jpg",
      alt: "Client Logo 3"
    },
    {
      src: "https://thumbs.dreamstime.com/z/industrial-color-palette-guide-paint-samples-catalog-grey-background-selective-focus-271831554.jpg",
      alt: "Client Logo 4"
    },
    {
      src: "https://th.bing.com/th/id/OIP.JXif4pP4Mv7suibIssBC_QHaD4?rs=1&pid=ImgDetMain",
      alt: "Client Logo 5"
    },
    {
      src: "https://thumbs.dreamstime.com/b/technology-company-emblem-emblem-representing-technology-technology-company-emblem-emblem-representing-technology-319695553.jpg",
      alt: "Client Logo 6"
    }
  ]

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={fadeInUp.transition}
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Our Customers</h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Trusted by industry leaders worldwide for delivering excellence in automation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {customers.map((customer, index) => (
              <motion.div
                key={customer.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <img
                        src={customer.logo}
                        alt={customer.name}
                        className="h-12 w-auto object-contain"
                      />
                    </div>
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <blockquote className="mb-4 text-muted-foreground">
                      "{customer.testimonial}"
                    </blockquote>
                    <div>
                      <p className="font-semibold">{customer.author}</p>
                      <p className="text-sm text-muted-foreground">{customer.position}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-16 bg-background">
        <div className="container px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Trusted By Industry Leaders</h2>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 items-center">
            {clientLogos.map((logo, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center p-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.15, type: 'spring', stiffness: 100 }}
              >
                {/* 
                  Using Next.js Image component for optimized loading.
                  If an image fails to load, consider implementing a fallback mechanism.
                */}
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={150}
                  height={60}
                  className="object-contain grayscale hover:grayscale-0 transition duration-300"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
