import { ModuleLearningPath } from "@/components/module-learning-path"

export default function ModuloPage({ params }: { params: { id: string } }) {
  return <ModuleLearningPath moduleId={params.id} />
}
