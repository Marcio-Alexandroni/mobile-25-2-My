import { PhaseList } from "@/components/phase-list"

export default function TrilhaDetailPage({ params }: { params: { id: string } }) {
  return <PhaseList trilhaId={params.id} />
}
