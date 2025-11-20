"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ThemeSettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ThemeSettingsModal({ isOpen, onClose }: ThemeSettingsModalProps) {
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

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40 animate-in fade-in duration-200" onClick={onClose} />

      {/* Modal */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-card rounded-3xl shadow-2xl z-50 animate-in slide-in-from-bottom duration-300">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Configurações</h2>
            <Button size="icon" variant="ghost" onClick={onClose} className="h-10 w-10 rounded-full">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Theme Toggle */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Aparência</h3>

            <div className="flex items-center gap-3">
              {/* Dark Mode Button */}
              <button
                onClick={() => {
                  if (theme !== "dark") toggleTheme()
                }}
                className={`flex-1 p-4 rounded-2xl border-2 transition-all ${
                  theme === "dark"
                    ? "border-primary bg-primary/10"
                    : "border-border bg-background hover:border-muted-foreground"
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <Moon className={`h-6 w-6 ${theme === "dark" ? "text-primary" : "text-muted-foreground"}`} />
                  <span
                    className={`text-sm font-medium ${theme === "dark" ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    Modo Noturno
                  </span>
                </div>
              </button>

              {/* Light Mode Button */}
              <button
                onClick={() => {
                  if (theme !== "light") toggleTheme()
                }}
                className={`flex-1 p-4 rounded-2xl border-2 transition-all ${
                  theme === "light"
                    ? "border-primary bg-primary/10"
                    : "border-border bg-background hover:border-muted-foreground"
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <Sun className={`h-6 w-6 ${theme === "light" ? "text-primary" : "text-muted-foreground"}`} />
                  <span
                    className={`text-sm font-medium ${theme === "light" ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    Modo Dia
                  </span>
                </div>
              </button>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-4">
              {theme === "dark"
                ? "Usando cores escuras para melhor visualização noturna"
                : "Usando cores claras estilo iOS"}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
