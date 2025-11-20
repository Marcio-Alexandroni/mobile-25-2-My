import { LessonInterface } from "@/components/lesson-interface"

export default function PhaseGamePage({ params }: { params: { id: string } }) {
  const phaseId = Number.parseInt(params.id)

  return <LessonInterface phaseId={phaseId} />
}
