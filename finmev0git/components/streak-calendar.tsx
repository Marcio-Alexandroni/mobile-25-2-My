"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Flame } from "lucide-react"

interface StreakCalendarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function StreakCalendar({ open, onOpenChange }: StreakCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  // Sample data - dias em que o usuário jogou
  const activeDays = [
    "2025-11-01",
    "2025-11-02",
    "2025-11-03",
    "2025-11-04",
    "2025-11-05",
    "2025-11-08",
    "2025-11-09",
    "2025-11-10",
    "2025-11-11",
    "2025-11-12",
    "2025-11-15",
    "2025-11-16",
    "2025-11-17",
    "2025-11-18",
    "2025-11-19",
  ]

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]

  const dayNames = ["D", "S", "T", "Q", "Q", "S", "S"]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    return { daysInMonth, startingDayOfWeek }
  }

  const isActiveDay = (day: number) => {
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, "0")
    const dayStr = String(day).padStart(2, "0")
    const dateStr = `${year}-${month}-${dayStr}`
    return activeDays.includes(dateStr)
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate)

  const calendarDays = []
  // Empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null)
  }
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Calendário de Streak</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" size="icon" onClick={previousMonth}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h3 className="text-xl font-semibold">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <Button variant="ghost" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Day names header */}
            {dayNames.map((day, index) => (
              <div key={index} className="text-center text-sm font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}

            {/* Calendar days */}
            {calendarDays.map((day, index) => (
              <div key={index} className="aspect-square flex items-center justify-center">
                {day ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    {isActiveDay(day) ? (
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-sm font-bold text-primary-foreground">{day}</span>
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-sm text-muted-foreground">{day}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div />
                )}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-6 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <Flame className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-muted-foreground">Dia com atividade</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 flex items-center justify-center">
                <span className="text-muted-foreground">15</span>
              </div>
              <span className="text-muted-foreground">Dia sem atividade</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
