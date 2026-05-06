import { KanbanBoard } from "@/components/KanbanBoard";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <KanbanBoard />
    </ProtectedRoute>
  );
}
