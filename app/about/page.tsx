"use client"

import { motion } from "framer-motion"
import { Award, Users, Target, Lightbulb, Zap } from "lucide-react"

export default function AboutPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
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
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              About YVS Mechatronics
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Established in 2020, YVS Mechatronics is at the forefront of industrial automation, special-purpose machines, and precision engineering. Our passion for innovation and excellence drives us to deliver state-of-the-art solutions that transform manufacturing, automotive, aerospace, and SME sectors.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision, Mission, Specialization & Employees Section */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Row 1: Vision & Mission */}
          <div className="grid gap-8 items-center">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Target className="h-12 w-12 text-primary" />
              <h2 className="text-3xl font-bold">Our Vision</h2>
              <p className="text-muted-foreground">
                We aim to empower industries with cutting-edge technology and innovative engineering solutions. Our vision is to transform manufacturing processes by delivering scalable, efficient, and precise systems that inspire confidence and drive growth.
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
                Our mission is to deliver robust and cost-effective engineering solutions. We combine industrial automation, custom machine design, precision engineering, and expert fabrication to ensure our clients receive reliable, future-proof systems tailored to their needs.
              </p>
            </motion.div>
          </div>

          {/* Row 2: Specialization & Employees */}
          <div className="grid gap-8 items-center">
            {/* Reverse order on larger screens */}
            <motion.div
              className="order-2 lg:order-1 space-y-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Zap className="h-12 w-12 text-primary" />
              <h2 className="text-3xl font-bold">What we are Specialized In</h2>
              <p className="text-muted-foreground">
                At YVS Mechatronics, we excel in industrial automation, the design and manufacture of special-purpose machines, and precision engineering and fabrication. We also provide comprehensive research and development consultancy, ensuring our solutions remain innovative and tailored to evolving industrial requirements.
              </p>
            </motion.div>
            <motion.div
              className="order-1 lg:order-2 space-y-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Users className="h-12 w-12 text-primary" />
              <h2 className="text-3xl font-bold">Our Team</h2>
              <p className="text-muted-foreground">
                Powered by over 20 skilled professionals, our team includes experts in mechanical design, electrical engineering, software development, and specialized welding techniques. Our collaborative approach and commitment to research ensure we stay ahead of technological advances.
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
                <h3 className="text-xl font-bold">2020 - Foundation</h3>
                <p className="mt-2 text-muted-foreground">
                  Founded by M. Sai Kiran, YVS Mechatronics began its journey with a passion for engineering and innovation. His vision and expertise laid the foundation for a company that now stands as a trusted name in industrial automation and precision engineering.
                </p>
              </div>
              <div className="relative border-l-2 border-primary pl-8 pb-8">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-primary"></div>
                <h3 className="text-xl font-bold">2021 - Establishing Partnerships</h3>
                <p className="mt-2 text-muted-foreground">
                  We built strong collaborations with esteemed organizations such as Nuclear Fuel Complex, HAL, and DRDO, reinforcing our commitment to excellence and innovative solutions.
                </p>
              </div>
              <div className="relative border-l-2 border-primary pl-8">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-primary"></div>
                <h3 className="text-xl font-bold">2023 - Innovation & Expansion</h3>
                <p className="mt-2 text-muted-foreground">
                  With the launch of our advanced R&D facility, we expanded our portfolio to include comprehensive design and consultancy services, setting new benchmarks in the industry.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
