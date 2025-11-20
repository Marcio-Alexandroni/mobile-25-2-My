"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Building2, User, Map, Menu, Wallet, Moon, Sun } from "lucide-react"
import { useState, useEffect } from "react"

export function BottomNavigation() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const initialTheme = savedTheme || "light"
    setTheme(initialTheme)
    applyTheme(initialTheme)

    if (!savedTheme) {
      localStorage.setItem("theme", "light")
    }
  }, [])

  const applyTheme = (newTheme: "light" | "dark") => {
    if (newTheme === "light") {
      document.documentElement.classList.remove("dark")
      document.documentElement.classList.add("light")
    } else {
      document.documentElement.classList.remove("light")
      document.documentElement.classList.add("dark")
    }
  }

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    applyTheme(newTheme)
  }

  return (
    <>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 animate-in fade-in duration-200"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {isMenuOpen && (
        <div className="fixed bottom-24 right-6 w-64 bg-card rounded-2xl shadow-2xl border border-border z-50 animate-in slide-in-from-bottom-2 duration-200">
          <div className="p-4 space-y-2">
            {/* Theme Toggle */}
            <button
              onClick={() => {
                toggleTheme()
                setIsMenuOpen(false)
              }}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors"
            >
              {theme === "dark" ? <Sun className="h-5 w-5 text-primary" /> : <Moon className="h-5 w-5 text-primary" />}
              <span className="text-sm font-medium text-foreground">
                {theme === "dark" ? "Modo Claro" : "Modo Escuro"}
              </span>
            </button>

            {/* Wallet/Gastos Link */}
            <Link href="/gastos" onClick={() => setIsMenuOpen(false)}>
              <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors">
                <Wallet className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-foreground">Seus Gastos</span>
              </button>
            </Link>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border px-6 py-4 z-50">
        <div className="w-full max-w-md mx-auto flex items-center justify-around">
          <Link href="/">
            <Button
              size="icon"
              variant="ghost"
              className={`h-14 w-14 rounded-2xl ${
                pathname === "/" ? "bg-primary/20 hover:bg-primary/30" : "hover:bg-secondary/50"
              }`}
            >
              <Building2 className={`h-7 w-7 ${pathname === "/" ? "text-primary" : "text-muted-foreground"}`} />
            </Button>
          </Link>
          <Link href="/perfil">
            <Button
              size="icon"
              variant="ghost"
              className={`h-14 w-14 rounded-2xl ${
                pathname === "/perfil" ? "bg-primary/20 hover:bg-primary/30" : "hover:bg-secondary/50"
              }`}
            >
              <User className={`h-7 w-7 ${pathname === "/perfil" ? "text-primary" : "text-muted-foreground"}`} />
            </Button>
          </Link>
          <Link href="/progresso">
            <Button
              size="icon"
              variant="ghost"
              className={`h-14 w-14 rounded-2xl ${
                pathname === "/progresso" ? "bg-primary/20 hover:bg-primary/30" : "hover:bg-secondary/50"
              }`}
            >
              <Map className={`h-7 w-7 ${pathname === "/progresso" ? "text-primary" : "text-muted-foreground"}`} />
            </Button>
          </Link>
          <Button
            size="icon"
            variant="ghost"
            className={`h-14 w-14 rounded-2xl ${
              isMenuOpen ? "bg-primary/20 hover:bg-primary/30" : "hover:bg-secondary/50"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className={`h-7 w-7 ${isMenuOpen ? "text-primary" : "text-muted-foreground"}`} />
          </Button>
        </div>
      </div>
    </>
  )
}
