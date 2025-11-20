"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Wifi, Battery, Calendar, Coins, Zap, ArrowLeft, CheckCircle2, Star, Lock, Map } from "lucide-react"

interface Phase {
  id: number
  title: string
  description: string
  xp: number
  completed: boolean
  locked: boolean
  current: boolean
}

export function PhaseList({ trilhaId }: { trilhaId: string }) {
  const trilhaData: Record<
    string,
    {
      title: string
      icon: React.ReactNode
      phases: Phase[]
    }
  > = {
    "1": {
      title: "Introdução: Investimentos",
      icon: <Map className="h-8 w-8 text-white" />,
      phases: [
        {
          id: 1,
          title: "O que são investimentos?",
          description: "Aprenda os conceitos básicos",
          xp: 10,
          completed: true,
          locked: false,
          current: false,
        },
        {
          id: 2,
          title: "Por que investir?",
          description: "Entenda a importância",
          xp: 10,
          completed: true,
          locked: false,
          current: false,
        },
        {
          id: 3,
          title: "Perfil de investidor",
          description: "Descubra seu perfil",
          xp: 15,
          completed: false,
          locked: false,
          current: true,
        },
        {
          id: 4,
          title: "Risco e retorno",
          description: "Conceitos fundamentais",
          xp: 15,
          completed: false,
          locked: true,
          current: false,
        },
        {
          id: 5,
          title: "Diversificação",
          description: "Proteja seus investimentos",
          xp: 20,
          completed: false,
          locked: true,
          current: false,
        },
      ],
    },
  }

  const trilha = trilhaData[trilhaId] || trilhaData["1"]

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
          <Link href="/trilha-aprendizado">
            <Button size="icon" variant="ghost" className="h-10 w-10">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">{trilha.title}</h1>
        </div>

        {/* Phases List */}
        <div className="flex-1 px-6 pb-6 space-y-4">
          {trilha.phases.map((phase) => (
            <Link
              key={phase.id}
              href={phase.locked ? "#" : `/fase/${phase.id}/jogo`}
              className={!phase.locked ? "block" : "pointer-events-none"}
            >
              <div
                className={`rounded-2xl p-5 border-2 transition-all ${
                  phase.completed
                    ? "bg-primary/10 border-primary"
                    : phase.current
                      ? "bg-secondary border-primary"
                      : phase.locked
                        ? "bg-muted/50 border-muted opacity-60"
                        : "bg-card border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center ${
                      phase.completed
                        ? "bg-primary text-primary-foreground"
                        : phase.current
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {phase.completed ? (
                      <CheckCircle2 className="h-7 w-7" />
                    ) : phase.current ? (
                      <Star className="h-7 w-7" />
                    ) : phase.locked ? (
                      <Lock className="h-7 w-7" />
                    ) : (
                      <Star className="h-7 w-7" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground">{phase.title}</h3>
                    <p className="text-sm text-muted-foreground">{phase.description}</p>
                  </div>
                  <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-bold">
                    +{phase.xp} XP
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
