import { LessonInterface } from "@/components/lesson-interface"

export default function LessonPage({ params }: { params: { id: string } }) {
  return <LessonInterface lessonId={params.id} />
}
