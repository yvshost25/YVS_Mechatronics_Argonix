"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function CustomersPage() {
  // Updated customer testimonials reflecting prestigious client partnerships.
  const customers = [
    {
      name: "Nuclear Fuel Complex",
      logo: "/nuclear.png",
      testimonial: "YVS Mechatronics' state-of-the-art automation solutions have significantly optimized our operational efficiency.",
      author: "Dr. Anil Kumar",
      position: "Chief Engineer"
    },
    {
      name: "Hindustan Aeronautics Limited",
      logo: "/HAL.png",
      testimonial: "Their precision engineering and custom special-purpose machines have been instrumental in enhancing our production quality.",
      author: "Mr. Suresh Rao",
      position: "Production Manager"
    },
    {
      name: "Defence Research and Development Organisation",
      logo: "/drdo.png",
      testimonial: "YVS Mechatronics consistently delivers innovative and reliable solutions that meet our high standards.",
      author: "Ms. Rekha Singh",
      position: "Technical Director"
    }
  ]

  // Updated client logos array to showcase key industry partners.
  const clientLogos = [
    {
      src: "/nuclear_logo.png",
      alt: "Nuclear Fuel Complex"
    },
    {
      src: "/hal_logo.png",
      alt: "Hindustan Aeronautics Limited"
    },
    {
      src: "/drdo_logo.png",
      alt: "Defence Research and Development Organisation"
    }
  ]

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <div className="flex min-h-screen bg-background flex-col">
      {/* Full-Width Hero Image */}
      <section className="relative overflow-hidden py-10 sm:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={fadeInUp.transition}
          >
            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">Our Esteemed Clients</h1>
            <p className="mt-4 text-muted-foreground text-lg">
              Trusted by industry leaders for delivering excellence in automation and precision engineering.
            </p>
          </motion.div>
        </div>
      </section>
      <div className="relative w-full h-[500px]">
        <Image
          src="/customer.png"
          alt="customer"
          fill
          className="w-full h-[300px] object-contain"
        />
      </div>

      {/* Testimonials */}
      <section className="py-16 bg-muted/50">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {customers.map((customer, index) => (
              <motion.div
                key={customer.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card>
                  <CardContent className="p-6 h-[400px] w-full">
                    <div className="mb-4">
                      <img
                        src={customer.logo}
                        alt={customer.name}
                        className="h-40 w-auto object-contain rounded-lg"
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
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Trusted By Industry Leaders</h2>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-3 items-center">
            {clientLogos.map((logo, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center p-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.15, type: 'spring', stiffness: 100 }}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={150}
                  height={150}
                  className="object-contain transition duration-300 cursor-pointer rounded-full"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
