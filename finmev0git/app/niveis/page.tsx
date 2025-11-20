"use client"

import type React from "react"

import Link from "next/link"
import {
  Wifi,
  Battery,
  Calendar,
  Coins,
  Zap,
  ArrowLeft,
  TrendingUp,
  BarChart3,
  Target,
  Building2,
  Briefcase,
} from "lucide-react"
import { useCurrency } from "@/lib/currency-context"

interface Level {
  id: number
  title: string
  subtitle: string
  icon: React.ReactNode
  locked: boolean
  color: string
}

export default function NiveisPage() {
  const { fincoins, sparks, energy, dailyQuests } = useCurrency()
  const allQuestsCompleted = dailyQuests.every((q) => q.completed)

  const levels: Level[] = [
    {
      id: 1,
      title: "Fundamentos",
      subtitle: "Financeiros",
      icon: <TrendingUp className="h-12 w-12 text-white" />,
      locked: false,
      color: "bg-[#FF8A00]",
    },
    {
      id: 2,
      title: "Economia e",
      subtitle: "Renda",
      icon: <Coins className="h-12 w-12 text-white" />,
      locked: false,
      color: "bg-[#E6B800]",
    },
    {
      id: 3,
      title: "Investimentos",
      subtitle: "Iniciais",
      icon: <BarChart3 className="h-12 w-12 text-white" />,
      locked: false,
      color: "bg-[#00A3E0]",
    },
    {
      id: 4,
      title: "Mercado e",
      subtitle: "Estratégia",
      icon: <Target className="h-12 w-12 text-white" />,
      locked: true,
      color: "bg-muted",
    },
    {
      id: 5,
      title: "Bolsa e",
      subtitle: "Brasil",
      icon: <Building2 className="h-12 w-12 text-white" />,
      locked: true,
      color: "bg-muted",
    },
    {
      id: 6,
      title: "Investimentos",
      subtitle: "Intermediário",
      icon: <Briefcase className="h-12 w-12 text-white" />,
      locked: true,
      color: "bg-muted",
    },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="w-full max-w-md mx-auto bg-background flex flex-col min-h-screen">
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
          <Link href="/missao-diaria">
            <div className="relative cursor-pointer hover:scale-110 transition-transform">
              <Calendar className="h-8 w-8 text-foreground" />
              {!allQuestsCompleted && <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full" />}
            </div>
          </Link>

          <div className="flex items-center gap-1.5">
            <Zap className="h-8 w-8 text-[oklch(0.75_0.15_85)]" />
            <span className="text-lg font-bold text-foreground">{sparks}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Coins className="h-8 w-8 text-[oklch(0.75_0.15_85)]" />
            <span className="text-lg font-bold text-foreground">{fincoins}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Battery className="h-8 w-8 text-[oklch(0.65_0.15_320)]" />
            <span className="text-lg font-bold text-foreground">{energy}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-6 py-8 overflow-y-auto">
          <div className="flex flex-col gap-12">
            {levels.map((level) => (
              <Link
                key={level.id}
                href={level.locked ? "#" : `/nivel/${level.id}`}
                className={!level.locked ? "cursor-pointer" : "cursor-not-allowed"}
              >
                <div
                  className={`${level.color} rounded-3xl p-6 flex items-center gap-4 shadow-lg transition-transform ${
                    !level.locked && "hover:scale-[1.02]"
                  }`}
                >
                  <div className={`${level.locked ? "bg-muted-foreground/20" : "bg-white/20"} rounded-2xl p-4`}>
                    {level.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white leading-tight">
                      {level.title}
                      <br />
                      {level.subtitle}
                    </h2>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <div className="px-6 py-6">
          <Link href="/">
            <button className="w-full bg-secondary text-secondary-foreground py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-secondary/80 transition-colors">
              <ArrowLeft className="h-5 w-5" />
              Voltar
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
