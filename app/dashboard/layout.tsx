"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { 
  BarChart3, 
  CreditCard, 
  LayoutDashboard, 
  LogOut, 
  Menu, 
  PieChart, 
  Settings, 
  Target, 
  Wallet
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Transactions", href: "/dashboard/transactions", icon: CreditCard },
  { name: "Accounts", href: "/dashboard/accounts", icon: Wallet },
  { name: "Budgets", href: "/dashboard/budgets", icon: PieChart },
  { name: "Goals", href: "/dashboard/goals", icon: Target },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
]

function NavLinks({ pathname, onClick }: { pathname: string; onClick?: () => void }) {
  return (
    <>
      {navigation.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={onClick}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-primary"
            }`}
          >
            <item.icon className="h-4 w-4" />
            {item.name}
          </Link>
        )
      })}
    </>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 flex h-16 w-full items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 lg:px-6">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 lg:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 sm:w-80">
            <div className="flex items-center gap-2 font-semibold mb-6">
              <Wallet className="h-6 w-6 text-primary" />
              <span className="text-lg">FinTrack</span>
            </div>
            <nav className="grid gap-1">
              <NavLinks pathname={pathname} onClick={() => setIsMobileMenuOpen(false)} />
            </nav>
          </SheetContent>
        </Sheet>
        
        {/* Desktop Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold lg:hidden">
          <Wallet className="h-6 w-6 text-primary" />
          <span className="text-lg">FinTrack</span>
        </Link>
        
        {/* Spacer */}
        <div className="flex-1" />
        
        {/* User Menu */}
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "User"} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {session?.user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{session?.user?.name || "User"}</p>
                  <p className="text-xs leading-none text-muted-foreground">{session?.user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="hidden w-64 flex-col border-r bg-background lg:flex">
          <div className="flex h-16 items-center gap-2 border-b px-6">
            <Wallet className="h-6 w-6 text-primary" />
            <span className="font-semibold">FinTrack</span>
          </div>
          <nav className="grid gap-1 p-4">
            <NavLinks pathname={pathname} />
          </nav>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
