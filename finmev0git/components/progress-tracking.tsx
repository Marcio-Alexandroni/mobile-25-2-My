"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ArrowLeft,
  TrendingUp,
  Flame,
  Target,
  Award,
  Star,
  CheckCircle2,
  ChevronRight,
  BarChart3,
  PiggyBank,
  Briefcase,
} from "lucide-react"
import Link from "next/link"
import { BottomNavigation } from "@/components/bottom-navigation"
import { StreakCalendar } from "@/components/streak-calendar"

export function ProgressTracking() {
  const [showCalendar, setShowCalendar] = useState(false)

  const getLastFourDays = () => {
    const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
    const today = new Date()
    const lastFourDays = []

    // Sample data - dias em que o usuário jogou (últimos 7 dias)
    const activeDaysSet = new Set([1, 2, 3, 4, 5, 6]) // Índices dos dias ativos (0 = hoje - 6 dias)

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

  const stats = {
    totalXP: 1250,
    currentStreak: 7,
    longestStreak: 12,
    lessonsCompleted: 15,
    accuracy: 87,
    totalTime: "12h 30min",
  }

  const learningPaths = [
    {
      id: 1,
      title: "Investidor Iniciante",
      description: "Aprenda os fundamentos de investimentos do zero",
      icon: <Target className="h-8 w-8" />,
      iconBg: "bg-blue-500",
      lessons: 15,
      weeks: 2,
      progress: 40,
    },
    {
      id: 2,
      title: "Ações e Mercado",
      description: "Domine o mercado de ações e análise de empresas",
      icon: <BarChart3 className="h-8 w-8" />,
      iconBg: "bg-pink-500",
      lessons: 20,
      weeks: 3,
      progress: 0,
    },
    {
      id: 3,
      title: "Renda Fixa",
      description: "Entenda títulos públicos e privados de renda fixa",
      icon: <PiggyBank className="h-8 w-8" />,
      iconBg: "bg-green-500",
      lessons: 12,
      weeks: 2,
      progress: 0,
    },
    {
      id: 4,
      title: "Fundos de Investimento",
      description: "Explore diferentes tipos de fundos e suas estratégias",
      icon: <Briefcase className="h-8 w-8" />,
      iconBg: "bg-orange-500",
      lessons: 18,
      weeks: 3,
      progress: 0,
    },
  ]

  const achievements = [
    {
      id: 1,
      title: "Primeira Lição",
      description: "Complete sua primeira lição",
      icon: <Star className="h-6 w-6" />,
      unlocked: true,
      date: "15 Jan 2025",
    },
    {
      id: 2,
      title: "Sequência de 7 Dias",
      description: "Mantenha uma sequência de 7 dias",
      icon: <Flame className="h-6 w-6" />,
      unlocked: true,
      date: "20 Jan 2025",
    },
    {
      id: 3,
      title: "Mestre em Investimentos",
      description: "Complete o módulo de investimentos",
      icon: <TrendingUp className="h-6 w-6" />,
      unlocked: true,
      date: "22 Jan 2025",
    },
    {
      id: 4,
      title: "100% de Precisão",
      description: "Acerte todas as questões de uma lição",
      icon: <Target className="h-6 w-6" />,
      unlocked: false,
      date: null,
    },
    {
      id: 5,
      title: "Sequência de 30 Dias",
      description: "Mantenha uma sequência de 30 dias",
      icon: <Award className="h-6 w-6" />,
      unlocked: false,
      date: null,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Seu Progresso</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-full bg-destructive/20 flex items-center justify-center">
                <Flame className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sequência</p>
                <p className="text-2xl font-bold">{stats.currentStreak} dias</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-full bg-success/20 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Lições</p>
                <p className="text-2xl font-bold">{stats.lessonsCompleted}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-full bg-chart-3/20 flex items-center justify-center">
                <Target className="h-5 w-5 text-chart-3" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Precisão</p>
                <p className="text-2xl font-bold">{stats.accuracy}%</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-full bg-chart-5/20 flex items-center justify-center">
                <Flame className="h-5 w-5 text-chart-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Maior Sequência</p>
                <p className="text-2xl font-bold">{stats.longestStreak} dias</p>
              </div>
            </div>
          </Card>
        </div>

        <Card
          className="p-6 mb-8 cursor-pointer hover:border-primary transition-all"
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
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <Flame className="h-6 w-6 text-primary" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                    </div>
                  )}
                </div>
                <p className="text-xs font-medium text-center">{day.day}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center mt-4">Clique para ver o calendário completo</p>
        </Card>

        {/* Trilha de Aprendizado */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-bold mb-2">Trilha de Aprendizado</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Escolha sua trilha de aprendizado e comece sua jornada financeira
          </p>

          <div className="space-y-4">
            {learningPaths.map((path) => (
              <Link key={path.id} href={`/trilha/${path.id}`}>
                <div className="flex items-center gap-4 p-4 rounded-xl border-2 border-border hover:border-primary transition-all cursor-pointer group">
                  <div
                    className={`h-16 w-16 rounded-2xl ${path.iconBg} flex items-center justify-center flex-shrink-0 text-white`}
                  >
                    {path.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{path.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{path.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{path.lessons} lições</span>
                      <span>•</span>
                      <span>{path.weeks} semanas</span>
                    </div>
                    {path.progress > 0 && (
                      <div className="mt-3">
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${path.progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{path.progress}% completo</p>
                      </div>
                    )}
                  </div>
                  <ChevronRight className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </Card>

        {/* Achievements */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-6">Conquistas</h2>
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
                  achievement.unlocked ? "border-primary bg-primary/5" : "border-border bg-muted/50 opacity-60"
                }`}
              >
                <div
                  className={`h-16 w-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    achievement.unlocked ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  {achievement.unlocked && achievement.date && (
                    <p className="text-xs text-muted-foreground mt-1">Desbloqueado em {achievement.date}</p>
                  )}
                </div>
                {achievement.unlocked && <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0" />}
              </div>
            ))}
          </div>
        </Card>

        {/* Motivational Section */}
        <Card className="p-6 mt-8 bg-gradient-to-r from-primary to-secondary border-0 text-white">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Continue assim!</h3>
              <p className="text-sm text-white/90">
                Você está no caminho certo para dominar suas finanças. Mantenha sua sequência e continue aprendendo
                todos os dias!
              </p>
            </div>
          </div>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />

      <StreakCalendar open={showCalendar} onOpenChange={setShowCalendar} />
    </div>
  )
}
