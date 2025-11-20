"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Wifi,
  Battery,
  ShoppingCart,
  GraduationCap,
  TrendingUp,
  ShoppingBag,
  Sparkles,
  DollarSign,
} from "lucide-react"
import Link from "next/link"
import { BottomNavigation } from "@/components/bottom-navigation"

export function ExpensesDashboard() {
  const [activeTab, setActiveTab] = useState<"gastos" | "sugestoes">("gastos")

  const spendingData = [
    { category: "Educação", amount: 1200, color: "text-[#8B5CF6]", bgColor: "bg-[#8B5CF6]", percentage: 25 },
    { category: "Investimentos", amount: 1800, color: "text-[#3B82F6]", bgColor: "bg-[#3B82F6]", percentage: 35 },
    { category: "Compras", amount: 800, color: "text-[#10B981]", bgColor: "bg-[#10B981]", percentage: 15 },
    { category: "Mercado", amount: 1400, color: "text-[#F59E0B]", bgColor: "bg-[#F59E0B]", percentage: 25 },
  ]

  const suggestedInvestments = [
    {
      name: "Tesouro Selic",
      type: "Renda Fixa",
      risk: "Baixo",
      expectedReturn: "13.65% a.a.",
      icon: "🏦",
      color: "from-green-500 to-emerald-600",
    },
    {
      name: "Fundo Imobiliário",
      type: "FII",
      risk: "Médio",
      expectedReturn: "8-12% a.a.",
      icon: "🏢",
      color: "from-blue-500 to-cyan-600",
    },
    {
      name: "Ações Tech",
      type: "Renda Variável",
      risk: "Alto",
      expectedReturn: "15-25% a.a.",
      icon: "📈",
      color: "from-purple-500 to-pink-600",
    },
    {
      name: "CDB Premium",
      type: "Renda Fixa",
      risk: "Baixo",
      expectedReturn: "14.2% a.a.",
      icon: "💰",
      color: "from-amber-500 to-orange-600",
    },
  ]

  const investmentData = [
    { month: "Jan", value: 5000 },
    { month: "Fev", value: 5200 },
    { month: "Mar", value: 5800 },
    { month: "Abr", value: 5500 },
    { month: "Mai", value: 6200 },
    { month: "Jun", value: 6800 },
    { month: "Jul", value: 7200 },
    { month: "Ago", value: 7500 },
    { month: "Set", value: 8100 },
    { month: "Out", value: 8500 },
    { month: "Nov", value: 9200 },
  ]

  const maxValue = Math.max(...investmentData.map((d) => d.value))
  const minValue = Math.min(...investmentData.map((d) => d.value))
  const currentValue = investmentData[investmentData.length - 1].value
  const initialValue = investmentData[0].value
  const totalGain = currentValue - initialValue
  const percentageGain = ((totalGain / initialValue) * 100).toFixed(2)

  const totalSpending = spendingData.reduce((sum, item) => sum + item.amount, 0)

  let currentAngle = 0
  const segments = spendingData.map((item) => {
    const angle = (item.percentage / 100) * 360
    const segment = {
      ...item,
      startAngle: currentAngle,
      endAngle: currentAngle + angle,
    }
    currentAngle += angle
    return segment
  })

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
        <h1 className="text-lg font-semibold">Gastos</h1>
        <div className="w-10" />
      </header>

      {/* Tabs */}
      <div className="bg-card px-6 flex gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab("gastos")}
          className={`flex-1 py-3 text-sm font-semibold transition-colors relative ${
            activeTab === "gastos" ? "text-[#3B82F6]" : "text-muted-foreground"
          }`}
        >
          Seus Gastos
          {activeTab === "gastos" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3B82F6]" />}
        </button>
        <button
          onClick={() => setActiveTab("sugestoes")}
          className={`flex-1 py-3 text-sm font-semibold transition-colors relative ${
            activeTab === "sugestoes" ? "text-[#3B82F6]" : "text-muted-foreground"
          }`}
        >
          Sugestões
          {activeTab === "sugestoes" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3B82F6]" />}
        </button>
      </div>

      <main className="px-6 py-6">
        {activeTab === "gastos" && (
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-6 text-center">Seus Gastos</h3>

            <div className="flex justify-center mb-8">
              <div className="relative w-64 h-64">
                <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                  {segments.map((segment, index) => {
                    const startAngle = (segment.startAngle * Math.PI) / 180
                    const endAngle = (segment.endAngle * Math.PI) / 180
                    const largeArcFlag = segment.percentage > 50 ? 1 : 0

                    const startX = 100 + 80 * Math.cos(startAngle)
                    const startY = 100 + 80 * Math.sin(startAngle)
                    const endX = 100 + 80 * Math.cos(endAngle)
                    const endY = 100 + 80 * Math.sin(endAngle)

                    const innerStartX = 100 + 50 * Math.cos(startAngle)
                    const innerStartY = 100 + 50 * Math.sin(startAngle)
                    const innerEndX = 100 + 50 * Math.cos(endAngle)
                    const innerEndY = 100 + 50 * Math.sin(endAngle)

                    return (
                      <path
                        key={index}
                        d={`M ${startX} ${startY} A 80 80 0 ${largeArcFlag} 1 ${endX} ${endY} L ${innerEndX} ${innerEndY} A 50 50 0 ${largeArcFlag} 0 ${innerStartX} ${innerStartY} Z`}
                        fill={segment.bgColor.replace("bg-", "")}
                        className="transition-all hover:opacity-80"
                      />
                    )
                  })}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-bold">R$ {totalSpending.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Total</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {spendingData.map((item, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl p-4 flex items-center justify-between border border-border"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full ${item.bgColor} flex items-center justify-center`}>
                      {item.category === "Educação" && <GraduationCap className="h-6 w-6 text-white" />}
                      {item.category === "Investimentos" && <TrendingUp className="h-6 w-6 text-white" />}
                      {item.category === "Compras" && <ShoppingBag className="h-6 w-6 text-white" />}
                      {item.category === "Mercado" && <ShoppingCart className="h-6 w-6 text-white" />}
                    </div>
                    <div>
                      <p className="font-semibold">{item.category}</p>
                      <p className="text-sm text-muted-foreground">{item.percentage}% do total</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold">R$ {item.amount.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "sugestoes" && (
          <div className="space-y-6">
            <div className="bg-card rounded-xl p-5 border border-[#F59E0B]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Balanço da Conta</h3>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#10B981]">R$ {currentValue.toLocaleString()}</p>
                  <p className="text-xs text-[#10B981]">
                    +{percentageGain}% ({investmentData[0].month})
                  </p>
                </div>
              </div>

              <div className="relative h-48 mb-2">
                <svg viewBox="0 0 400 150" className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Area under the line */}
                  <path
                    d={`M 0 150 ${investmentData
                      .map((point, i) => {
                        const x = (i / (investmentData.length - 1)) * 400
                        const y = 150 - ((point.value - minValue) / (maxValue - minValue)) * 130
                        return `L ${x} ${y}`
                      })
                      .join(" ")} L 400 150 Z`}
                    fill="url(#areaGradient)"
                  />

                  {/* Line */}
                  <path
                    d={investmentData
                      .map((point, i) => {
                        const x = (i / (investmentData.length - 1)) * 400
                        const y = 150 - ((point.value - minValue) / (maxValue - minValue)) * 130
                        return `${i === 0 ? "M" : "L"} ${x} ${y}`
                      })
                      .join(" ")}
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Points */}
                  {investmentData.map((point, i) => {
                    const x = (i / (investmentData.length - 1)) * 400
                    const y = 150 - ((point.value - minValue) / (maxValue - minValue)) * 130
                    return <circle key={i} cx={x} cy={y} r="4" fill="#10B981" />
                  })}
                </svg>
              </div>

              <div className="flex justify-between text-xs text-muted-foreground">
                {investmentData.map((point, i) => {
                  if (i % 2 === 0 || i === investmentData.length - 1) {
                    return (
                      <span key={i} className="text-center">
                        {point.month}
                      </span>
                    )
                  }
                  return null
                })}
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <div>
                    <p className="text-muted-foreground">Investimento Inicial</p>
                    <p className="font-semibold">R$ {initialValue.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground">Rendimento Total</p>
                    <p className="font-semibold text-[#10B981]">+R$ {totalGain.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-[#F59E0B]" />
                <h3 className="text-lg font-bold">Sugestões de IA para Você</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Baseado no seu perfil e histórico de gastos</p>

              <div className="grid grid-cols-2 gap-3">
                {suggestedInvestments.map((investment, index) => (
                  <button
                    key={index}
                    className={`bg-gradient-to-br ${investment.color} rounded-xl p-4 text-left hover:scale-105 transition-transform shadow-lg text-white`}
                  >
                    <div className="text-3xl mb-2">{investment.icon}</div>
                    <h4 className="font-bold text-sm mb-1 text-white">{investment.name}</h4>
                    <p className="text-xs text-white mb-2">{investment.type}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="bg-white/20 px-2 py-1 rounded-full text-white">{investment.risk}</span>
                    </div>
                    <p className="text-xs font-semibold mt-2 text-white">{investment.expectedReturn}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-xl p-4 border border-border">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#3B82F6]/20 flex items-center justify-center flex-shrink-0">
                  <DollarSign className="h-5 w-5 text-[#3B82F6]" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Dica de Investimento</h4>
                  <p className="text-sm text-muted-foreground">
                    Com base nos seus gastos, você poderia investir 20% da sua renda em ativos de baixo risco para
                    começar a construir seu patrimônio.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="h-20" />
      </main>

      <BottomNavigation />
    </div>
  )
}
