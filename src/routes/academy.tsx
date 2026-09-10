import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Shell } from "@/components/layout/shell";

export const Route = createFileRoute("/academy")({
  component: () => (
    <Shell>
      <Outlet />
    </Shell>
  ),
});
