"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, BarChart3, PieChart, Shield, TrendingUp, Wallet, Target, Lock, Globe, Users } from "lucide-react"

export default function LandingPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push("/dashboard")
    }
  }, [session, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (session) {
    return null
  }
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-muted/30">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 to-background/0 backdrop-blur-xl supports-[backdrop-filter]:bg-gradient-to-b supports-[backdrop-filter]:from-background/80 supports-[backdrop-filter]:to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="flex h-18 items-center justify-between py-4">
            <Link className="flex items-center gap-2 group" href="/">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full group-hover:bg-primary/50 transition-all duration-500" />
                <div className="relative bg-gradient-to-br from-primary to-chart-2 p-2.5 rounded-xl shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-all duration-300 group-hover:scale-110">
                  <Wallet className="h-5 w-5 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
                FinTrack
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {[
                { href: "#features", label: "Features" },
                { href: "#how-it-works", label: "How It Works" },
                { href: "#testimonials", label: "Testimonials" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 rounded-full hover:bg-primary/5 relative group"
                >
                  {item.label}
                  <span className="absolute inset-x-4 -bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 rounded-full hover:bg-muted"
              >
                <span>Sign In</span>
                <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </Link>
              <Link href="/register">
                <Button 
                  size="sm" 
                  className="rounded-full px-6 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105 transition-all duration-300"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32 lg:py-40">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-chart-2/10 rounded-full blur-3xl animate-pulse delay-700" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
          </div>

          <div className="container px-4 mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              {/* Left content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  Trusted by 10,000+ users
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6">
                  <span className="bg-gradient-to-r from-foreground via-foreground to-primary/70 bg-clip-text text-transparent">
                    Master Your Money,
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                    Build Your Future
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                  Track expenses, set budgets, and achieve financial goals with our intuitive personal finance platform. Start your journey to financial freedom today.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <Link href="/register">
                    <Button size="lg" className="rounded-full px-8 h-12 text-base group">
                      Start Free Trial
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base">
                      View Demo
                    </Button>
                  </Link>
                </div>
                
                {/* Trust badges */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-10 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>Bank-level Security</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-primary" />
                    <span>Private & Encrypted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-primary" />
                    <span>Free Forever Plan</span>
                  </div>
                </div>
              </div>

              {/* Right content - floating cards */}
              <div className="relative w-full max-w-lg lg:max-w-xl">
                <div className="relative z-10 space-y-4">
                  {/* Main card */}
                  <Card className="border-0 shadow-2xl shadow-primary/10 overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Balance</p>
                          <p className="text-3xl font-bold">$24,589.00</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <TrendingUp className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <div className="h-20 flex items-end gap-2">
                        {[35, 45, 30, 55, 40, 65, 50, 70, 60, 80, 75, 90].map((height, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-gradient-to-t from-primary/80 to-primary rounded-t-sm transition-all duration-300 hover:from-primary hover:to-chart-2"
                            style={{ height: `${height}%` }}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Floating cards */}
                  <div className="absolute -right-4 top-1/4 hidden md:block">
                    <Card className="border-0 shadow-xl bg-card/95 backdrop-blur animate-bounce" style={{ animationDuration: '3s' }}>
                      <CardContent className="p-4 flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                          <TrendingUp className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Monthly Savings</p>
                          <p className="text-lg font-bold text-green-500">+$1,250</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="absolute -left-4 bottom-1/4 hidden md:block">
                    <Card className="border-0 shadow-xl bg-card/95 backdrop-blur animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                      <CardContent className="p-4 flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-chart-2/10 flex items-center justify-center">
                          <Target className="h-5 w-5 text-chart-2" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Goal Progress</p>
                          <p className="text-lg font-bold">78%</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 border-y bg-muted/30">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Active Users", value: "10,000+", icon: Users },
                { label: "Transactions Tracked", value: "$50M+", icon: BarChart3 },
                { label: "Goals Achieved", value: "25,000+", icon: Target },
                { label: "Countries", value: "50+", icon: Globe },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-32">
          <div className="container px-4 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Everything You Need to
                <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent"> Succeed</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Powerful features designed to give you complete visibility and control over your financial life.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: PieChart,
                  title: "Smart Budgeting",
                  description: "Create custom budgets for different categories and track your spending in real-time with intelligent alerts.",
                  color: "from-blue-500 to-blue-600",
                },
                {
                  icon: BarChart3,
                  title: "Visual Analytics",
                  description: "Beautiful charts and graphs that make it easy to understand your financial habits at a glance.",
                  color: "from-purple-500 to-purple-600",
                },
                {
                  icon: TrendingUp,
                  title: "Expense Tracking",
                  description: "Automatically categorize and track all your expenses in one place with powerful filtering.",
                  color: "from-green-500 to-green-600",
                },
                {
                  icon: Target,
                  title: "Goal Setting",
                  description: "Set financial goals and track your progress with visual milestones and motivational insights.",
                  color: "from-orange-500 to-orange-600",
                },
                {
                  icon: Shield,
                  title: "Bank-Level Security",
                  description: "Your financial data is encrypted with 256-bit encryption and securely stored.",
                  color: "from-red-500 to-red-600",
                },
                {
                  icon: Globe,
                  title: "Multi-Currency",
                  description: "Track finances across multiple currencies with real-time exchange rate updates.",
                  color: "from-cyan-500 to-cyan-600",
                },
              ].map((feature, i) => (
                <Card key={i} className="group border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                  <CardContent className="p-6">
                    <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 md:py-32 bg-muted/30">
          <div className="container px-4 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Get Started in
                <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent"> Minutes</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Three simple steps to take control of your finances.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  step: "01",
                  title: "Create Account",
                  description: "Sign up for free in seconds. No credit card required to get started.",
                },
                {
                  step: "02",
                  title: "Add Your Accounts",
                  description: "Connect your bank accounts or manually add your transactions.",
                },
                {
                  step: "03",
                  title: "Start Tracking",
                  description: "Watch your finances come to life with beautiful visualizations.",
                },
              ].map((item, i) => (
                <div key={i} className="relative">
                  <div className="text-8xl font-bold text-primary/10 absolute -top-4 -left-2">
                    {item.step}
                  </div>
                  <div className="relative pt-8">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  {i < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="h-6 w-6 text-primary/30" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 md:py-32">
          <div className="container px-4 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Loved by
                <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent"> Thousands</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                See what our users have to say about their experience.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  quote: "FinTrack has completely transformed how I manage my money. I've saved over $5,000 in the last year alone!",
                  name: "Sarah Johnson",
                  role: "Marketing Manager",
                },
                {
                  quote: "The visual analytics are incredible. I can finally see exactly where my money goes each month.",
                  name: "Michael Chen",
                  role: "Software Engineer",
                },
                {
                  quote: "Setting financial goals has never been easier. I'm on track to buy my first home in 2 years!",
                  name: "Emily Rodriguez",
                  role: "Small Business Owner",
                },
              ].map((testimonial, i) => (
                <Card key={i} className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="h-5 w-5 fill-primary" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32">
          <div className="container px-4 mx-auto">
            <Card className="relative overflow-hidden border-0">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-chart-2" />
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-30" />
              <CardContent className="relative p-12 md:p-16 text-center text-white">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  Ready to Take Control?
                </h2>
                <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                  Join thousands of users who have already transformed their financial life. Start your free trial today.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/register">
                    <Button size="lg" variant="secondary" className="rounded-full px-8 h-12 text-base font-semibold">
                      Get Started Free
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base font-semibold border-white/30 text-white hover:bg-white/10 hover:text-white">
                      Sign In
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative overflow-hidden bg-muted/10">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-chart-2/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container px-4 mx-auto py-16">
          <div className="grid md:grid-cols-6 gap-12">
            <div className="md:col-span-2">
              <Link className="flex items-center gap-2 mb-4 group" href="/">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full group-hover:bg-primary/30 transition-all duration-300" />
                  <div className="relative bg-gradient-to-br from-primary to-chart-2 p-2 rounded-xl shadow-lg shadow-primary/20">
                    <Wallet className="h-5 w-5 text-white" />
                  </div>
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                  FinTrack
                </span>
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                The modern personal finance app that helps you track expenses, set goals, and build wealth. Start your journey to financial freedom today.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z", label: "Twitter" },
                  { icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z", label: "Instagram" },
                  { icon: "M22.46 6c-.85.38-1.78.64-2.75.76 1-.6 1.76-1.55 2.12-2.68-.93.55-1.96.95-3.06 1.17-.88-.94-2.13-1.53-3.51-1.53-2.66 0-4.81 2.16-4.81 4.81 0 .38.04.75.13 1.1-4-.2-7.58-2.11-9.96-5.02-.42.72-.66 1.56-.66 2.46 0 1.68.85 3.16 2.14 4.02-.79-.02-1.53-.24-2.18-.6v.06c0 2.35 1.67 4.31 3.88 4.76-.4.1-.83.16-1.27.16-.31 0-.62-.03-.92-.08.63 1.96 2.45 3.39 4.61 3.43-1.69 1.32-3.83 2.1-6.15 2.1-.4 0-.8-.02-1.19-.07 2.19 1.4 4.78 2.22 7.57 2.22 9.07 0 14.02-7.52 14.02-14.02 0-.21 0-.43-.01-.64.96-.69 1.79-1.56 2.45-2.55z", label: "Twitter" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href="#"
                    className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {["Features", "Pricing", "Security", "Updates", "Roadmap"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="hover:text-primary transition-colors duration-300 relative group">
                      {item}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {["About", "Blog", "Careers", "Contact", "Press"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="hover:text-primary transition-colors duration-300 relative group">
                      {item}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {["Documentation", "Help Center", "API", "Community", "Templates"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="hover:text-primary transition-colors duration-300 relative group">
                      {item}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR", "License"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="hover:text-primary transition-colors duration-300 relative group">
                      {item}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              &copy; 2026 <span className="font-semibold text-foreground">FinTrack Inc.</span> All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <svg className="h-4 w-4 text-red-500 fill-current" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>for financial freedom</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
