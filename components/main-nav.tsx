"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { GraduationCap, Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MainNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const routes = [
    { href: "/discover", label: "Placements", active: pathname === "/discover" },
    { href: "/blog", label: "Blog", active: pathname === "/blog" || pathname.startsWith("/blog/") },
    { href: "/academics", label: "Academics", active: pathname === "/academics" },
    { href: "/jobs", label: "Jobs", active: pathname === "/jobs" },
    { href: "/profiles", label: "Profiles", active: pathname === "/profiles" },
  ]

  return (
    <div className="flex items-center gap-6 md:gap-10">
      <Link href="/" className="flex items-center gap-2">
        <GraduationCap className="h-6 w-6 text-primary" />
        <span className="hidden font-bold sm:inline-block">CampusPlacement</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden gap-6 md:flex">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              route.active ? "text-primary" : "text-muted-foreground",
            )}
          >
            {route.label}
          </Link>
        ))}
      </nav>

      {/* Mobile Navigation */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" aria-label="Menu">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[300px]">
          <div className="flex items-center gap-2 pb-4 pt-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-bold">CampusPlacement</span>
            <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex flex-col gap-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
                  route.active ? "bg-muted text-primary" : "text-muted-foreground",
                )}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}
