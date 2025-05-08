import { ArrowRight, BookOpen, Briefcase, GraduationCap, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background py-20">
        <div className="container px-4 sm:px-8">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Your Path to Career <span className="text-primary">Success</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Connect with top companies, showcase your skills, and kickstart your career with our comprehensive
                campus placement platform.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/sign-up">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/discover">
                    Explore Placements
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative mx-auto aspect-video w-full max-w-lg rounded-lg shadow-xl">
              <Image
                src="/diverse-group.png"
                alt="Students celebrating placement success"
                fill
                className="rounded-lg object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container px-4 sm:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold">Why Choose Our Platform?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              We provide all the tools and resources you need to succeed in your campus placement journey.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 transition-all hover:border-primary/50 hover:shadow-md">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-3">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-medium">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted py-16">
        <div className="container px-4 sm:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-bold text-primary">{stat.value}</p>
                <p className="mt-2 text-lg font-medium">{stat.label}</p>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container px-4 sm:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold">Success Stories</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Hear from students who found their dream jobs through our platform.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="font-medium">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <p className="italic text-muted-foreground">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container px-4 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold">Ready to Launch Your Career?</h2>
            <p className="mx-auto mt-4 max-w-2xl">
              Join thousands of students who have successfully secured placements at top companies.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/sign-up">Create Account</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground" asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 text-center md:flex-row md:text-left">
          <p className="text-sm text-muted-foreground">© 2024 Campus Placement Platform. All rights reserved.</p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:underline">
              Terms
            </Link>
            <Link href="#" className="hover:underline">
              Privacy
            </Link>
            <Link href="#" className="hover:underline">
              Help
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    title: "Placement Tracking",
    description: "Track placement statistics and success stories from your college.",
    icon: Briefcase,
  },
  {
    title: "Academic Portfolio",
    description: "Showcase your academic achievements, projects, and skills.",
    icon: GraduationCap,
  },
  {
    title: "Knowledge Sharing",
    description: "Learn from peers through blog posts and placement experiences.",
    icon: BookOpen,
  },
  {
    title: "Company Connections",
    description: "Connect with recruiters and alumni from top companies.",
    icon: Users,
  },
]

const stats = [
  {
    value: "5,000+",
    label: "Students Placed",
    description: "Successfully placed in the last academic year",
  },
  {
    value: "200+",
    label: "Partner Companies",
    description: "Top companies recruiting from our platform",
  },
  {
    value: "95%",
    label: "Placement Rate",
    description: "For students actively using our platform",
  },
  {
    value: "₹12 LPA",
    label: "Average Package",
    description: "For students placed through our platform",
  },
]

const testimonials = [
  {
    name: "Alex Morgan",
    role: "Software Engineer",
    company: "TechCorp",
    avatar: "/diverse-person.png",
    quote:
      "The platform helped me showcase my projects and connect with recruiters. I landed my dream job at TechCorp with a great package!",
  },
  {
    name: "Jamie Chen",
    role: "Data Analyst",
    company: "DataInsight",
    avatar: "/diverse-group-two.png",
    quote:
      "The blog section was invaluable for learning about interview experiences. The resume builder helped me create a standout profile.",
  },
  {
    name: "Sam Wilson",
    role: "Product Manager",
    company: "InnovateTech",
    avatar: "/diverse-group-outdoors.png",
    quote:
      "From placement preparation to final selection, this platform guided me through every step. Highly recommend to all students!",
  },
]
