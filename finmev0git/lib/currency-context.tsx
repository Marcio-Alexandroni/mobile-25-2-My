"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface CurrencyContextType {
  fincoins: number
  sparks: number
  energy: number
  addFincoins: (amount: number) => void
  addSparks: (amount: number) => void
  consumeEnergy: () => boolean
  rechargeEnergy: (amount: number, cost: number) => boolean
  addEnergy: (amount: number) => void
  dailyQuests: DailyQuest[]
  completeDailyQuest: (questId: number) => void
}

export interface DailyQuest {
  id: number
  title: string
  description: string
  reward: number
  rewardType: "fincoins" | "sparks"
  completed: boolean
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [fincoins, setFincoins] = useState(200)
  const [sparks, setSparks] = useState(200)
  const [energy, setEnergy] = useState(20)
  const [dailyQuests, setDailyQuests] = useState<DailyQuest[]>([
    {
      id: 1,
      title: "Abra o Finme",
      description: "Faça login no aplicativo",
      reward: 10,
      rewardType: "fincoins",
      completed: true,
    },
    {
      id: 2,
      title: "Complete uma Tarefa",
      description: "Complete uma lição de investimentos",
      reward: 50,
      rewardType: "sparks",
      completed: true,
    },
    {
      id: 3,
      title: "Acerte Tudo",
      description: "Complete uma lição com 100% de acerto",
      reward: 25,
      rewardType: "fincoins",
      completed: false,
    },
  ])

  const addFincoins = (amount: number) => {
    setFincoins((prev) => prev + amount)
  }

  const addSparks = (amount: number) => {
    setSparks((prev) => prev + amount)
  }

  const consumeEnergy = (): boolean => {
    if (energy > 0) {
      setEnergy((prev) => prev - 1)
      return true
    }
    return false
  }

  const rechargeEnergy = (amount: number, cost: number): boolean => {
    if (sparks >= cost) {
      setSparks((prev) => prev - cost)
      setEnergy((prev) => Math.min(20, prev + amount))
      return true
    }
    return false
  }

  const addEnergy = (amount: number) => {
    setEnergy((prev) => Math.min(20, prev + amount))
  }

  const completeDailyQuest = (questId: number) => {
    setDailyQuests((prev) =>
      prev.map((quest) => {
        if (quest.id === questId && !quest.completed) {
          // Add reward
          if (quest.rewardType === "fincoins") {
            addFincoins(quest.reward)
          } else {
            addSparks(quest.reward)
          }
          return { ...quest, completed: true }
        }
        return quest
      }),
    )

    // Check if all quests are completed
    const allCompleted = dailyQuests.every((q) => q.id === questId || q.completed)
    if (allCompleted) {
      addEnergy(3)
    }
  }

  return (
    <CurrencyContext.Provider
      value={{
        fincoins,
        sparks,
        energy,
        addFincoins,
        addSparks,
        consumeEnergy,
        rechargeEnergy,
        addEnergy,
        dailyQuests,
        completeDailyQuest,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider")
  }
  return context
}
