import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { isOwner, setOwner } from "@/lib/analytics-tracker";

export const Route = createFileRoute("/me")({
  head: () => ({ meta: [{ title: "Tracking preferences" }, { name: "robots", content: "noindex" }] }),
  component: MePage,
});

function MePage() {
  const [excluded, setExcluded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setExcluded(isOwner());
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = !excluded;
    setOwner(next);
    setExcluded(next);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Tracking preferences</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            When enabled, your visits to this site (from this browser) are excluded
            from the analytics dashboard.
          </p>
        </div>

        <div className="rounded-lg border border-border p-4 flex items-center justify-between">
          <div>
            <div className="font-medium">Exclude my views</div>
            <div className="text-xs text-muted-foreground mt-1">
              {mounted ? (excluded ? "Active on this browser" : "Not active") : "…"}
            </div>
          </div>
          <button
            onClick={toggle}
            className={`inline-flex items-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              excluded
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "border border-input bg-background hover:bg-accent"
            }`}
          >
            {excluded ? "Disable" : "Enable"}
          </button>
        </div>

        <p className="text-xs text-muted-foreground">
          This setting is stored in this browser's localStorage. Repeat on every
          device/browser you want excluded. Clearing site data turns it off.
        </p>
      </div>
    </div>
  );
}
