"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Wifi, Battery, Calendar, Coins, Zap, ArrowLeft, TrendingUp, UserPlus } from "lucide-react"
import { useCurrency } from "@/lib/currency-context"

export function ModuleSelection() {
  const { fincoins, sparks, energy, dailyQuests } = useCurrency()
  const allQuestsCompleted = dailyQuests.every((q) => q.completed)

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
              {!allQuestsCompleted && <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full" />}
            </div>
          </Link>
          <div className="flex items-center gap-1.5">
            <Coins className="h-8 w-8 text-[oklch(0.75_0.15_85)]" />
            <span className="text-lg font-bold text-foreground">{fincoins}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="h-8 w-8 text-[oklch(0.75_0.15_85)]" />
            <span className="text-lg font-bold text-foreground">{sparks}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Battery className="h-8 w-8 text-[oklch(0.65_0.15_320)]" />
            <span className="text-lg font-bold text-foreground">{energy}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-6 py-6 flex flex-col gap-6">
          {/* Investimentos Module */}
          <Link href="/modulo/investimentos">
            <div className="bg-[oklch(0.70_0.15_50)] hover:bg-[oklch(0.68_0.15_50)] rounded-3xl p-8 flex items-center gap-6 shadow-lg hover:scale-[1.02] transition-all cursor-pointer">
              <div className="bg-white/20 rounded-2xl p-6">
                <TrendingUp className="h-12 w-12 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white leading-tight">
                  Introdução:
                  <br />
                  Investimentos
                </h2>
              </div>
            </div>
          </Link>

          {/* Finanças Pessoais Module */}
          <Link href="/modulo/financas-pessoais">
            <div className="bg-[oklch(0.80_0.15_85)] hover:bg-[oklch(0.78_0.15_85)] rounded-3xl p-8 flex items-center gap-6 shadow-lg hover:scale-[1.02] transition-all cursor-pointer">
              <div className="bg-white/20 rounded-2xl p-6">
                <UserPlus className="h-12 w-12 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white leading-tight">
                  Finanças
                  <br />
                  Pessoais
                </h2>
              </div>
            </div>
          </Link>
        </div>

        {/* Back Button */}
        <div className="px-6 pb-6">
          <Link href="/">
            <Button variant="outline" className="w-full bg-transparent">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
