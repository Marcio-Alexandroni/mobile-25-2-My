"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Wifi, Battery, Star, Flame, TrendingUpIcon, CheckCircle2, ChevronRight, Target } from "lucide-react"
import Link from "next/link"
import { BottomNavigation } from "@/components/bottom-navigation"
import { StreakCalendar } from "@/components/streak-calendar"

export function ProfileDashboard() {
  const [showCalendar, setShowCalendar] = useState(false)

  const [user] = useState({
    name: "User",
    level: 5,
    xp: 800,
    nextLevelXP: 1200,
  })

  const progressPercentage = (user.xp / user.nextLevelXP) * 100

  const achievements = [
    {
      id: 1,
      title: "Primeira Lição",
      description: "Complete sua primeira lição",
      icon: Star,
      unlocked: true,
      unlockedDate: "15 Jan 2025",
    },
    {
      id: 2,
      title: "Sequência de 7 Dias",
      description: "Mantenha uma sequência de 7 dias",
      icon: Flame,
      unlocked: true,
      unlockedDate: "20 Jan 2025",
    },
    {
      id: 3,
      title: "Mestre em Investimentos",
      description: "Complete o módulo de investimentos",
      icon: TrendingUpIcon,
      unlocked: true,
      unlockedDate: "22 Jan 2025",
    },
  ]

  const stats = {
    currentStreak: 7,
    longestStreak: 12,
    lessonsCompleted: 15,
    accuracy: 87,
  }

  const getLastFourDays = () => {
    const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
    const today = new Date()
    const lastFourDays = []

    // Sample data - dias em que o usuário jogou (últimos 7 dias)
    const activeDaysSet = new Set([1, 2, 3]) // Índices dos dias ativos (0 = hoje)

    for (let i = 3; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dayIndex = date.getDay()
      lastFourDays.push({
        day: days[dayIndex],
        completed: activeDaysSet.has(i),
      })
    }

    return lastFourDays
  }

  const weeklyActivity = getLastFourDays()

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Status Bar */}
      <div className="bg-background px-6 py-3 flex items-center justify-between text-sm">
        <span>07:10</span>
        <div className="flex items-center gap-2">
          <Wifi className="h-4 w-4" />
          <Battery className="h-4 w-4" />
        </div>
      </div>

      {/* Header */}
      <header className="bg-card px-6 py-4 flex items-center justify-between border-b border-border">
        <Link href="/">
          <Button variant="ghost" size="icon" className="hover:bg-accent">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold">Perfil</h1>
        <div className="w-10" />
      </header>

      <div className="bg-card px-6 py-6 border-b border-border">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#8B5CF6] via-[#6366F1] to-[#3B82F6] flex items-center justify-center shadow-xl">
              <div className="w-20 h-20 rounded-full bg-card flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-white mb-3" />
                <div className="absolute bottom-4 w-12 h-8 rounded-t-full bg-white/90" />
              </div>
            </div>
          </div>

          <h2 className="text-xl font-bold mb-3">{user.name}</h2>

          <div className="w-full max-w-xs mb-2">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] transition-all"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Nível {user.level} • {user.xp}/{user.nextLevelXP} XP
          </p>
        </div>
      </div>

      <main className="px-6 py-6">
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="p-4 bg-card border-2 border-border">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
                <Flame className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sequência</p>
                <p className="text-2xl font-bold">{stats.currentStreak} dias</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-card border-2 border-border">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Lições</p>
                <p className="text-2xl font-bold">{stats.lessonsCompleted}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-card border-2 border-border">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <Target className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Precisão</p>
                <p className="text-2xl font-bold">{stats.accuracy}%</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-card border-2 border-border">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                <Flame className="h-6 w-6 text-teal-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Maior Sequência</p>
                <p className="text-2xl font-bold">{stats.longestStreak} dias</p>
              </div>
            </div>
          </Card>
        </div>

        <Card
          className="p-6 mb-6 cursor-pointer hover:border-primary transition-all border-2 border-primary"
          onClick={() => setShowCalendar(true)}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Atividade Semanal</h2>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex items-center justify-between gap-4">
            {weeklyActivity.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-3">
                <div className="w-full aspect-square flex items-center justify-center">
                  {day.completed ? (
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                      <Flame className="h-8 w-8 text-primary" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-muted-foreground/30" />
                    </div>
                  )}
                </div>
                <p className="text-sm font-medium text-center">{day.day}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center mt-4">Clique para ver o calendário completo</p>
        </Card>

        {/* Conquistas */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Conquistas</h3>

          <div className="space-y-3">
            {achievements.map((achievement) => {
              const Icon = achievement.icon
              return (
                <div
                  key={achievement.id}
                  className="bg-card rounded-xl p-4 flex items-center gap-4 border-2 border-primary"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground mb-1">{achievement.description}</p>
                    <p className="text-xs text-muted-foreground">Desbloqueado em {achievement.unlockedDate}</p>
                  </div>
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                </div>
              )
            })}
          </div>

          <Button variant="outline" className="w-full mt-4 flex items-center justify-center gap-2 bg-transparent">
            Ver Mais
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="h-20" />
      </main>

      <BottomNavigation />

      <StreakCalendar open={showCalendar} onOpenChange={setShowCalendar} />
    </div>
  )
}
