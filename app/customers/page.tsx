"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { TextAnimate } from "@/components/magicui/text-animate";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function CustomersPage() {
  // Fetch portfolio data using the getPortfolios query
  const portfolios = useQuery(api.portfolio.getPortfolios) || [];

  // Filter data for testimonials and client logos
  const testimonials = portfolios.filter((item) => item.logoUrl);
  const clientLogos = portfolios.filter((item) => item.image);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="flex min-h-screen bg-background flex-col">
      {/* Full-Width Hero Image */}
      <section className="relative overflow-hidden sm:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={fadeInUp.transition}
          >
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              <TextAnimate animation="blurInUp" startOnView>
                Our Esteemed Clients
              </TextAnimate>
            </h1>
            <p className="mt-4 text-muted-foreground text-lg">
              Trusted by industry leaders for delivering excellence in automation and precision engineering.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/50">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((customer, index) => (
              <motion.div
                key={customer.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card>
                  <CardContent className="p-6 h-[400px] w-full">
                    <div className="mb-4">
                      <Image
                        src={customer.logoUrl??''}
                        alt={customer.name}
                        height={40}
                        width={40}
                        className="h-40 w-auto object-contain rounded-xl"
                      />
                    </div>
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <blockquote className="mb-4 text-muted-foreground">
                      "{customer.description}"
                    </blockquote>
                    <div>
                      <p className="font-semibold">{customer.name}</p>
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
          <h2 className="text-3xl font-bold text-center mb-12">
            <TextAnimate animation="blurInUp" startOnView>
              Trusted By Industry Leaders
            </TextAnimate>
          </h2>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-3 items-center">
            {clientLogos.map((logo, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center p-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
              >
                <Image
                  src={logo.image??''}
                  alt={logo.name}
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
  );
}