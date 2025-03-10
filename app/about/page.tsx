"use client"

import { motion } from "framer-motion"
import { Award, Users, Target, Lightbulb } from "lucide-react"

export default function AboutPage() {
  const fadeIn = {
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
            initial={fadeIn.initial}
            animate={fadeIn.animate}
            transition={fadeIn.transition}
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">About YVS Mechotronics</h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Leading the future of automation with innovative solutions and cutting-edge technology
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Target className="h-12 w-12 text-primary" />
              <h2 className="text-3xl font-bold">Our Vision</h2>
              <p className="text-muted-foreground">
                To be the global leader in automation solutions, driving innovation and excellence in manufacturing technology.
              </p>
            </motion.div>
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Lightbulb className="h-12 w-12 text-primary" />
              <h2 className="text-3xl font-bold">Our Mission</h2>
              <p className="text-muted-foreground">
                To deliver cutting-edge automation solutions that enhance productivity and quality while reducing operational costs for our clients.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company History */}
      <section className="py-16">
        <div className="container px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-8">Our Journey</h2>
            <div className="space-y-8">
              <div className="relative border-l-2 border-primary pl-8 pb-8">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-primary"></div>
                <h3 className="text-xl font-bold">2005 - Foundation</h3>
                <p className="mt-2 text-muted-foreground">Established as a small engineering firm with big dreams.</p>
              </div>
              <div className="relative border-l-2 border-primary pl-8 pb-8">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-primary"></div>
                <h3 className="text-xl font-bold">2010 - Expansion</h3>
                <p className="mt-2 text-muted-foreground">Expanded operations to include CNC machining and automation solutions.</p>
              </div>
              <div className="relative border-l-2 border-primary pl-8">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-primary"></div>
                <h3 className="text-xl font-bold">2023 - Innovation Hub</h3>
                <p className="mt-2 text-muted-foreground">Launched state-of-the-art R&D facility for advanced automation solutions.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}