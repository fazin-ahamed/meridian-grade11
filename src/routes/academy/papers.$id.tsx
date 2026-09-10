import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PaperSession } from "@/components/paper-session";
import { paperById } from "@/data/papers";

export const Route = createFileRoute("/academy/papers/$id")({
  component: PaperPage,
});

function PaperPage() {
  const { id } = Route.useParams();
  const paper = paperById(id);
  if (!paper) throw notFound();

  return (
    <div>
      <Link to="/academy/papers" className="text-sm text-muted hover:text-fg">
        All classroom papers
      </Link>
      <div className="mt-4">
        <PaperSession paper={paper} />
      </div>
    </div>
  );
}
