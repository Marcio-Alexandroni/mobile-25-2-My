"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Wifi,
  Battery,
  Calendar,
  Coins,
  Zap,
  ArrowLeft,
  Target,
  TrendingUp,
  PiggyBank,
  Briefcase,
  ChevronRight,
} from "lucide-react"

interface LearningPath {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  lessons: number
  weeks: number
  completed: boolean
  progress: number
}

export function ModuleHub() {
  const learningPaths: LearningPath[] = [
    {
      id: 1,
      title: "Investidor Iniciante",
      description: "Aprenda os fundamentos de investimentos do zero",
      icon: <Target className="h-8 w-8" />,
      lessons: 15,
      weeks: 2,
      completed: false,
      progress: 40,
    },
    {
      id: 2,
      title: "Ações e Mercado",
      description: "Domine o mercado de ações e análise de empresas",
      icon: <TrendingUp className="h-8 w-8" />,
      lessons: 20,
      weeks: 3,
      completed: false,
      progress: 0,
    },
    {
      id: 3,
      title: "Renda Fixa",
      description: "Entenda títulos públicos e privados de renda fixa",
      icon: <PiggyBank className="h-8 w-8" />,
      lessons: 12,
      weeks: 2,
      completed: false,
      progress: 0,
    },
    {
      id: 4,
      title: "Fundos de Investimento",
      description: "Explore diferentes tipos de fundos e suas estratégias",
      icon: <Briefcase className="h-8 w-8" />,
      lessons: 18,
      weeks: 3,
      completed: false,
      progress: 0,
    },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="w-full max-w-md mx-auto bg-background flex flex-col min-h-screen">
        {/* Status Bar */}
        <div className="bg-[oklch(0.15_0.04_240)] px-6 py-3 flex items-center justify-between text-foreground">
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
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full" />
            </div>
          </Link>
          <div className="flex items-center gap-1.5">
            <Coins className="h-8 w-8 text-[oklch(0.75_0.15_85)]" />
            <span className="text-lg font-bold text-foreground">200</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="h-8 w-8 text-[oklch(0.75_0.15_85)]" />
            <span className="text-lg font-bold text-foreground">200</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Battery className="h-8 w-8 text-[oklch(0.65_0.15_320)]" />
            <span className="text-lg font-bold text-foreground">20</span>
          </div>
        </div>

        {/* Header */}
        <div className="px-6 py-6 flex items-center gap-4">
          <Link href="/">
            <Button size="icon" variant="ghost" className="h-10 w-10">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Trilha de Aprendizado</h1>
        </div>

        {/* Description */}
        <div className="px-6 pb-6">
          <p className="text-muted-foreground">Escolha sua trilha de aprendizado e comece sua jornada financeira</p>
        </div>

        {/* Learning Paths */}
        <div className="flex-1 px-6 pb-6 space-y-4">
          {learningPaths.map((path) => (
            <Link key={path.id} href={`/trilha/${path.id}`}>
              <div className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="bg-secondary rounded-xl p-3 text-foreground">{path.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-1">{path.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{path.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{path.lessons} lições</span>
                      <span>•</span>
                      <span>{path.weeks} semanas</span>
                    </div>
                    {path.progress > 0 && (
                      <div className="mt-3">
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-primary transition-all" style={{ width: `${path.progress}%` }} />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{path.progress}% completo</p>
                      </div>
                    )}
                  </div>
                  <ChevronRight className="h-6 w-6 text-muted-foreground" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
