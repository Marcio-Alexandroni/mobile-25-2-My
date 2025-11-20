"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { X, Volume2, CheckCircle2, XCircle, Trophy, ArrowRight, Battery, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCurrency } from "@/lib/currency-context"

interface Question {
  id: number
  type: "multiple-choice" | "true-false" | "fill-blank"
  question: string
  options?: string[]
  correctAnswer: string | number
  explanation: string
}

interface LessonInterfaceProps {
  phaseId: number
}

export function LessonInterface({ phaseId }: LessonInterfaceProps) {
  const router = useRouter()
  const { energy, consumeEnergy, addFincoins, completeDailyQuest } = useCurrency()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [hearts, setHearts] = useState(5)
  const [showCompletion, setShowCompletion] = useState(false)
  const [questionsToRepeat, setQuestionsToRepeat] = useState<Question[]>([])
  const [questionQueue, setQuestionQueue] = useState<Question[]>([])
  const [showEnergyWarning, setShowEnergyWarning] = useState(false)

  const getQuestionsForPhase = (phaseId: number): Question[] => {
    const allQuestions: Record<number, Question[]> = {
      1: [
        {
          id: 1,
          type: "multiple-choice",
          question: "O que é diversificação de investimentos?",
          options: [
            "Investir todo o dinheiro em uma única ação",
            "Distribuir investimentos em diferentes ativos",
            "Guardar dinheiro apenas na poupança",
            "Investir apenas em renda fixa",
          ],
          correctAnswer: 1,
          explanation:
            "Diversificação significa distribuir seus investimentos em diferentes tipos de ativos para reduzir riscos.",
        },
        {
          id: 2,
          type: "true-false",
          question: "A poupança é o investimento com maior rentabilidade no Brasil.",
          options: ["Verdadeiro", "Falso"],
          correctAnswer: 1,
          explanation:
            "Falso! A poupança geralmente tem rentabilidade menor que outros investimentos como Tesouro Direto, CDBs e fundos.",
        },
        {
          id: 3,
          type: "multiple-choice",
          question: "Qual é a principal vantagem da renda fixa?",
          options: [
            "Maior risco e maior retorno",
            "Previsibilidade e segurança",
            "Liquidez imediata sempre",
            "Isenção total de impostos",
          ],
          correctAnswer: 1,
          explanation:
            "A renda fixa oferece previsibilidade nos rendimentos e maior segurança comparada à renda variável.",
        },
        {
          id: 4,
          type: "multiple-choice",
          question: 'O que significa "liquidez" de um investimento?',
          options: [
            "O quanto o investimento rende",
            "A facilidade de converter em dinheiro",
            "O risco do investimento",
            "O prazo de vencimento",
          ],
          correctAnswer: 1,
          explanation:
            "Liquidez é a facilidade e rapidez com que você pode transformar um investimento em dinheiro sem perder valor.",
        },
        {
          id: 5,
          type: "true-false",
          question: "É recomendado ter uma reserva de emergência antes de investir em renda variável.",
          options: ["Verdadeiro", "Falso"],
          correctAnswer: 0,
          explanation:
            "Verdadeiro! Uma reserva de emergência (6 meses de despesas) em investimentos líquidos é essencial antes de investir em ativos mais arriscados.",
        },
      ],
      2: [
        {
          id: 6,
          type: "multiple-choice",
          question: "O que são ações?",
          options: ["Empréstimos para empresas", "Partes de uma empresa", "Títulos do governo", "Moedas estrangeiras"],
          correctAnswer: 1,
          explanation:
            "Ações representam pequenas partes (frações) de uma empresa. Ao comprar ações, você se torna sócio.",
        },
        {
          id: 7,
          type: "multiple-choice",
          question: "O que é a Bolsa de Valores?",
          options: [
            "Um banco especial",
            "Mercado onde ações são negociadas",
            "Uma empresa de investimentos",
            "Um tipo de fundo",
          ],
          correctAnswer: 1,
          explanation: "A Bolsa de Valores é o mercado organizado onde ações e outros ativos são comprados e vendidos.",
        },
      ],
      3: [
        {
          id: 8,
          type: "multiple-choice",
          question: "O que é o Tesouro Direto?",
          options: [
            "Um banco do governo",
            "Programa de venda de títulos públicos",
            "Um tipo de poupança",
            "Uma ação do governo",
          ],
          correctAnswer: 1,
          explanation:
            "Tesouro Direto é o programa do governo federal para venda de títulos públicos a pessoas físicas pela internet.",
        },
      ],
      4: [
        {
          id: 9,
          type: "multiple-choice",
          question: "O que são fundos de investimento?",
          options: [
            "Contas bancárias especiais",
            "Grupos de investidores com recursos em comum",
            "Ações de empresas",
            "Títulos do governo",
          ],
          correctAnswer: 1,
          explanation:
            "Fundos de investimento reúnem recursos de vários investidores para aplicar em diversos ativos, gerenciados por profissionais.",
        },
      ],
    }

    return allQuestions[phaseId] || allQuestions[1]
  }

  useEffect(() => {
    if (questionQueue.length === 0) {
      const initialQuestions = getQuestionsForPhase(phaseId)
      setQuestionQueue(initialQuestions)
    }
  }, [phaseId])

  const currentQ = questionQueue[currentQuestionIndex]
  const totalQuestions = questionQueue.length
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100

  const handleAnswerSelect = (answer: string, index: number) => {
    if (showResult) return
    setSelectedAnswer(answer)
  }

  const handleCheckAnswer = () => {
    if (selectedAnswer === null || !currentQ) return

    if (energy === 0) {
      setShowEnergyWarning(true)
      return
    }

    const answerIndex = currentQ.options?.indexOf(selectedAnswer)
    const correct = answerIndex === currentQ.correctAnswer

    setIsCorrect(correct)
    setShowResult(true)

    if (correct) {
      setScore(score + 20)
    } else {
      setHearts(Math.max(0, hearts - 1))
      setQuestionsToRepeat([...questionsToRepeat, currentQ])
    }
    consumeEnergy()
  }

  const handleContinue = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setIsCorrect(false)
    } else if (questionsToRepeat.length > 0) {
      setQuestionQueue([...questionQueue, ...questionsToRepeat])
      setQuestionsToRepeat([])
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setIsCorrect(false)
    } else {
      setShowCompletion(true)
    }
  }

  const handleExit = () => {
    router.push("/")
  }

  const handleComplete = () => {
    const totalQuestions = getQuestionsForPhase(phaseId).length
    const perfectScore = totalQuestions * 20
    if (score === perfectScore) {
      completeDailyQuest(3) // Complete "Acerte Tudo" quest
    }
    completeDailyQuest(2)
    router.push("/")
  }

  if (!currentQ) {
    return null
  }

  if (showCompletion) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-success/20 to-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="mb-6">
            <div className="h-24 w-24 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-12 w-12 text-success" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Parabéns!</h2>
            <p className="text-muted-foreground">Você completou a fase!</p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
              <span className="font-semibold">Pontuação Total</span>
              <span className="text-2xl font-bold text-success">{score} XP</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
              <span className="font-semibold">Precisão</span>
              <span className="text-2xl font-bold">
                {Math.round((score / (getQuestionsForPhase(phaseId).length * 20)) * 100)}%
              </span>
            </div>
          </div>

          <Button onClick={handleComplete} size="lg" className="w-full">
            Continuar Aprendendo
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={handleExit}>
              <X className="h-5 w-5" />
            </Button>

            <div className="flex-1 mx-4">
              <Progress value={progress} className="h-3" />
            </div>

            <div className="flex items-center gap-2 bg-[oklch(0.65_0.15_320)]/20 px-3 py-2 rounded-full">
              <Battery className="h-5 w-5 text-[oklch(0.65_0.15_320)]" />
              <span className="font-bold text-foreground">{energy}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {showEnergyWarning && (
          <Card className="p-6 mb-6 bg-destructive/10 border-destructive">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-6 w-6 text-destructive flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">Energia Insuficiente!</h3>
                <p className="text-muted-foreground mb-4">
                  Você precisa de energia para continuar jogando. Complete missões diárias ou compre energia com Sparks.
                </p>
                <div className="flex gap-2">
                  <Button onClick={() => router.push("/missao-diaria")} variant="default">
                    Ver Missões
                  </Button>
                  <Button onClick={() => setShowEnergyWarning(false)} variant="outline">
                    Fechar
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Volume2 className="h-5 w-5" />
            </Button>
          </div>

          <h2 className="text-3xl font-bold mb-6 text-balance">{currentQ.question}</h2>

          {/* Answer Options */}
          <div className="space-y-3 mb-8">
            {currentQ.options?.map((option, index) => {
              const isSelected = selectedAnswer === option
              const showCorrect = showResult && index === currentQ.correctAnswer
              const showWrong = showResult && isSelected && !isCorrect

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option, index)}
                  disabled={showResult}
                  className={`w-full p-6 rounded-xl border-2 text-left transition-all ${
                    showCorrect
                      ? "border-success bg-success/10"
                      : showWrong
                        ? "border-destructive bg-destructive/10"
                        : isSelected
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50 hover:bg-accent"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">{option}</span>
                    {showCorrect && <CheckCircle2 className="h-6 w-6 text-success" />}
                    {showWrong && <XCircle className="h-6 w-6 text-destructive" />}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Result Feedback */}
          {showResult && (
            <Card
              className={`p-6 mb-6 ${
                isCorrect ? "bg-success/10 border-success" : "bg-destructive/10 border-destructive"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isCorrect ? "bg-success" : "bg-destructive"
                  }`}
                >
                  {isCorrect ? (
                    <CheckCircle2 className="h-6 w-6 text-white" />
                  ) : (
                    <XCircle className="h-6 w-6 text-white" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{isCorrect ? "Excelente!" : "Não foi dessa vez"}</h3>
                  <p className="text-muted-foreground">{currentQ.explanation}</p>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Action Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border">
          <div className="container mx-auto max-w-3xl">
            {showResult ? (
              <Button onClick={handleContinue} size="lg" className="w-full">
                Continuar
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            ) : (
              <Button onClick={handleCheckAnswer} size="lg" className="w-full" disabled={selectedAnswer === null}>
                Verificar
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
