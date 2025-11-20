"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Wifi, Battery, Calendar, Coins, Zap, ArrowLeft, CheckCircle2 } from "lucide-react"
import { useCurrency } from "@/lib/currency-context"

export function DailyMissionScreen() {
  const { fincoins, sparks, energy, dailyQuests, completeDailyQuest, rechargeEnergy } = useCurrency()

  const allQuestsCompleted = dailyQuests.every((q) => q.completed)

  const handleBuyEnergy = (amount: number, cost: number) => {
    const success = rechargeEnergy(amount, cost)
    if (success) {
      alert(`Você comprou ${amount} energia por ${cost} Sparks!`)
    } else {
      alert("Sparks insuficientes!")
    }
  }

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

        {/* Header */}
        <div className="px-6 py-4 flex items-center gap-4">
          <Link href="/">
            <Button size="icon" variant="ghost" className="h-10 w-10">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Missão Diária</h1>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-6 py-4 overflow-y-auto pb-24">
          {/* Daily Quests */}
          <div className="space-y-4 mb-8">
            {dailyQuests.map((quest) => (
              <div
                key={quest.id}
                className={`rounded-2xl p-6 border-2 transition-all ${
                  quest.completed ? "bg-[oklch(0.95_0.05_145)] border-[oklch(0.65_0.15_145)]" : "bg-card border-border"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3
                      className={`text-xl font-bold mb-1 ${quest.completed ? "text-[oklch(0.2_0.04_240)]" : "text-foreground"}`}
                    >
                      {quest.title}
                    </h3>
                    <p className={`mb-3 ${quest.completed ? "text-[oklch(0.4_0.02_240)]" : "text-muted-foreground"}`}>
                      {quest.description}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`font-semibold ${quest.completed ? "text-[oklch(0.25_0.04_240)]" : "text-foreground"}`}
                      >
                        Recompensa:
                      </span>
                      {quest.rewardType === "fincoins" ? (
                        <>
                          <span className="text-[oklch(0.65_0.15_50)] font-bold">+{quest.reward} FinCoins</span>
                        </>
                      ) : (
                        <>
                          <span className="text-[oklch(0.65_0.15_50)] font-bold">+{quest.reward} Sparks</span>
                        </>
                      )}
                    </div>
                  </div>
                  {quest.completed ? (
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[oklch(0.65_0.15_145)] flex items-center justify-center">
                      <CheckCircle2 className="h-7 w-7 text-white" />
                    </div>
                  ) : (
                    <Button
                      onClick={() => completeDailyQuest(quest.id)}
                      className="flex-shrink-0 bg-foreground text-background hover:bg-foreground/90"
                    >
                      Completar
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* All Quests Completed Bonus */}
          {allQuestsCompleted && (
            <div className="mb-8 p-6 bg-gradient-to-br from-[oklch(0.65_0.15_145)]/20 to-[oklch(0.65_0.15_145)]/5 border-2 border-[oklch(0.65_0.15_145)] rounded-2xl">
              <div className="text-center">
                <div className="text-4xl mb-2">🎉</div>
                <h3 className="text-xl font-bold text-foreground mb-2">Todas as missões completas!</h3>
                <p className="text-muted-foreground mb-3">Você ganhou +3 Energia de bônus!</p>
              </div>
            </div>
          )}

          {/* Energy Shop */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Loja de Energia</h2>

            <div className="bg-card border-2 border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">1 Energia</h3>
                  <div className="flex items-center gap-1.5">
                    <Zap className="h-4 w-4 text-[oklch(0.75_0.15_85)]" />
                    <span className="text-muted-foreground">25 Sparks</span>
                  </div>
                </div>
                <Button onClick={() => handleBuyEnergy(1, 25)} className="bg-primary hover:bg-primary/90">
                  Comprar
                </Button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary rounded-2xl p-6 relative">
              <div className="absolute -top-3 right-4 bg-destructive text-white text-xs font-bold px-3 py-1 rounded-full">
                OFERTA!
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-foreground">20 Energia</h3>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-[oklch(0.75_0.15_85)]" />
                    <span className="text-muted-foreground line-through">500 Sparks</span>
                    <span className="text-primary font-bold">200 Sparks</span>
                  </div>
                </div>
                <Button onClick={() => handleBuyEnergy(20, 200)} className="bg-primary hover:bg-primary/90">
                  Comprar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
