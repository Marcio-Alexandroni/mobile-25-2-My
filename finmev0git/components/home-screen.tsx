"use client"

import type React from "react"
import Link from "next/link"
import { useState } from "react"
import { Wifi, Battery, Calendar, Coins, Zap, Map, Lock, TrendingUp, PiggyBank, Briefcase } from "lucide-react"
import { useCurrency } from "@/lib/currency-context"
import { ThemeSettingsModal } from "@/components/theme-settings-modal"
import { BottomNavigation } from "@/components/bottom-navigation"

interface Phase {
  id: number
  title: string
  subtitle: string
  icon: React.ReactNode
  lessonsCompleted: number
  totalLessons: number
  completed: boolean
  locked: boolean
  active: boolean
}

export function HomeScreen() {
  const { fincoins, sparks, energy, dailyQuests } = useCurrency()
  const [streak] = useState(7)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const phases: Phase[] = [
    {
      id: 1,
      title: "Introdução:",
      subtitle: "Investimentos",
      icon: <Map className="h-10 w-10 text-white" />,
      lessonsCompleted: 2,
      totalLessons: 5,
      completed: false,
      locked: false,
      active: true,
    },
    {
      id: 2,
      title: "Ações e",
      subtitle: "Mercado",
      icon: <TrendingUp className="h-7 w-7 text-white" />,
      lessonsCompleted: 0,
      totalLessons: 6,
      completed: false,
      locked: true,
      active: false,
    },
    {
      id: 3,
      title: "Renda",
      subtitle: "Fixa",
      icon: <PiggyBank className="h-7 w-7 text-white" />,
      lessonsCompleted: 0,
      totalLessons: 5,
      completed: false,
      locked: true,
      active: false,
    },
    {
      id: 4,
      title: "Fundos de",
      subtitle: "Investimento",
      icon: <Briefcase className="h-7 w-7 text-white" />,
      lessonsCompleted: 0,
      totalLessons: 7,
      completed: false,
      locked: true,
      active: false,
    },
  ]

  const currentPhase = phases.find((p) => p.active) || phases[0]
  const allQuestsCompleted = dailyQuests.every((q) => q.completed)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="w-full max-w-md mx-auto bg-background flex flex-col min-h-screen relative">
        {/* Status Bar */}
        <div className="bg-background px-6 py-3 flex items-center justify-between text-foreground">
          <span className="text-sm font-medium">07:10</span>
          <div className="flex items-center gap-2">
            <Wifi className="h-4 w-4" />
            <Battery className="h-4 w-4" />
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-background px-6 py-4 flex items-center justify-center gap-4">
          {/* Daily Mission Button */}
          <Link href="/missao-diaria">
            <div className="relative cursor-pointer hover:scale-110 transition-transform">
              <Calendar className="h-8 w-8 text-foreground" />
              {!allQuestsCompleted && <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full" />}
            </div>
          </Link>

          {/* Sparks */}
          <div className="flex items-center gap-1.5">
            <Zap className="h-8 w-8 text-[oklch(0.75_0.15_85)]" />
            <span className="text-lg font-bold text-foreground">{sparks}</span>
          </div>

          {/* Fincoins */}
          <div className="flex items-center gap-1.5">
            <Coins className="h-8 w-8 text-[oklch(0.75_0.15_85)]" />
            <span className="text-lg font-bold text-foreground">{fincoins}</span>
          </div>

          {/* Battery/Energy */}
          <div className="flex items-center gap-1.5">
            <Battery className="h-8 w-8 text-[oklch(0.65_0.15_320)]" />
            <span className="text-lg font-bold text-foreground">{energy}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-6 py-6 overflow-y-auto pb-24">
          <Link href="/niveis">
            <div className="bg-primary rounded-3xl p-6 mb-8 flex items-center gap-4 shadow-lg hover:scale-[1.02] transition-transform cursor-pointer">
              <div className="bg-primary-foreground/20 rounded-2xl p-4">{currentPhase.icon}</div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-primary-foreground leading-tight">
                  {currentPhase.title}
                  <br />
                  {currentPhase.subtitle}
                </h2>
              </div>
            </div>
          </Link>

          <div className="relative flex flex-col items-center">
            {/* Dotted connecting line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-muted" />

            <div className="space-y-6 relative flex flex-col items-center w-full">
              {phases.map((phase, index) => (
                <Link
                  key={phase.id}
                  href={phase.locked ? "#" : `/fase/${phase.id}/jogo`}
                  className={!phase.locked ? "cursor-pointer" : "cursor-not-allowed"}
                >
                  <div className="flex flex-col items-center">
                    <button
                      disabled={phase.locked}
                      className={`relative z-10 w-[90px] h-[90px] rounded-full flex items-center justify-center transition-all ${
                        phase.completed
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : phase.active
                            ? "bg-primary text-primary-foreground shadow-lg ring-4 ring-primary/30"
                            : phase.locked
                              ? "bg-muted text-muted-foreground opacity-60"
                              : "bg-secondary text-secondary-foreground"
                      } ${!phase.locked && "hover:scale-105"}`}
                    >
                      {phase.locked ? <Lock className="h-7 w-7" /> : phase.icon}
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Theme Settings Modal */}
        <ThemeSettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      </div>
      <BottomNavigation />
    </div>
  )
}
