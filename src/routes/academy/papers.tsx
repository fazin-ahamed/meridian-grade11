import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/academy/papers")({
  component: () => <Outlet />,
});
