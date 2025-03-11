import { Button } from "@/components/ui/button"
import { ChevronRight, Settings, PenTool as Tool, Zap } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-20 sm:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Precision Engineering for
              <span className="relative whitespace-nowrap">
                <span className="relative text-primary"> Tomorrow</span>
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              YVS Mechotronics delivers cutting-edge automation solutions with our expertise
              in special purpose machines, CNC, and precision machining.
            </p>
            <div className="mt-10 flex md:flex-col items-center justify-center gap-x-6">
              <Button size="lg" asChild>
                <Link href="/products">
                  Explore Our Solutions
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-card p-6 shadow-lg">
              <div className="mb-4 inline-block rounded-full bg-primary/10 p-3">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Special Purpose Machines</h3>
              <p className="text-muted-foreground">
                Custom-designed machines tailored to your specific manufacturing needs,
                enhancing productivity and efficiency.
              </p>
            </div>
            <div className="rounded-lg bg-card p-6 shadow-lg">
              <div className="mb-4 inline-block rounded-full bg-primary/10 p-3">
                <Tool className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">CNC Solutions</h3>
              <p className="text-muted-foreground">
                State-of-the-art CNC machines delivering precise, consistent results
                for complex manufacturing requirements.
              </p>
            </div>
            <div className="rounded-lg bg-card p-6 shadow-lg">
              <div className="mb-4 inline-block rounded-full bg-primary/10 p-3">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Precision Machining</h3>
              <p className="text-muted-foreground">
                High-precision machining services ensuring exceptional quality and
                accuracy in every component.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
