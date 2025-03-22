"use client"

import { motion } from "framer-motion"
import { Award, Users, Target, Lightbulb, Zap } from "lucide-react"

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
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">About YVS Mechatronics</h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Established in 2020, YVS Mechatronics is at the forefront of industrial automation, special-purpose machines, and precision engineering. Our passion for innovation and excellence drives us to deliver state-of-the-art solutions across manufacturing, automotive, aerospace, and SME sectors.
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
                To empower industries with cutting-edge technology and innovative engineering solutions that enhance productivity, precision, and efficiency.
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
                To deliver robust, cost-effective engineering solutions through industrial automation, custom special-purpose machines, precision components, and expert fabrication services.
              </p>
            </motion.div>
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Zap className="h-12 w-12 text-primary" />
              <h2 className="text-3xl font-bold">We Specialize in</h2>
              <p className="text-muted-foreground">
                Industrial Automation: Developing systems using PLC, SCADA, and microcontrollers.
              </p>
              <p className="text-muted-foreground">Special-Purpose Machines: Custom machinery tailored to industrial needs.</p>
              <p className="text-muted-foreground">Precision Engineering and Fabrication: Delivering components and products with exceptional quality and precision.</p>
              <p className="text-muted-foreground">  Research and Development Consultancy: Providing technical expertise for innovative projects.</p>
            </motion.div>
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Users  className="h-12 w-12 text-primary" />
              <h2 className="text-3xl font-bold">Our Employees</h2>
              <p className="text-muted-foreground">
                YVS Mechatronics is powered by a team of 20+ skilled professionals, including:
              </p>
              <p className="text-muted-foreground">
                Experts in mechanical design, electrical engineering, and software development.
              </p>
              <p className="text-muted-foreground">Welding professionals specializing in TIG and ARC techniques.
              </p>
              <p className="text-muted-foreground">The company also collaborates with research personnel to support complex innovations and advanced R&D projects.
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
                  Founded by M. Sai Kiran, the visionary founder of YVS Mechatronics, established the company in 2020 with a passion for engineering and innovation. His expertise and commitment to excellence have driven the company's growth into a trusted name in industrial automation and precision engineering.
                </p>
              </div>
              <div className="relative border-l-2 border-primary pl-8 pb-8">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-primary"></div>
                <h3 className="text-xl font-bold">2021 - Establishing Partnerships</h3>
                <p className="mt-2 text-muted-foreground">
                  Built strong collaborations with prestigious organizations such as Nuclear Fuel Complex, HAL, and DRDO, reinforcing our commitment to excellence.
                </p>
              </div>
              <div className="relative border-l-2 border-primary pl-8">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-primary"></div>
                <h3 className="text-xl font-bold">2023 - Innovation &amp; Expansion</h3>
                <p className="mt-2 text-muted-foreground">
                  Launched our advanced R&D facility and expanded our service portfolio to include comprehensive design and consultancy solutions.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
