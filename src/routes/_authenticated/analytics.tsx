import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { getAnalyticsSummary, type AnalyticsSummary } from "@/lib/analytics.functions";

export const Route = createFileRoute("/_authenticated/analytics")({
  head: () => ({ meta: [{ title: "Analytics" }, { name: "robots", content: "noindex" }] }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const fetchSummary = useServerFn(getAnalyticsSummary);
  const navigate = useNavigate();
  const [days, setDays] = useState(30);
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  async function load(d: number) {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetchSummary({ data: { days: d } });
      setData(res);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to load");
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load(days);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="min-h-screen bg-background text-foreground px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">Analytics</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Self-hosted page-view stats. Your own visits are excluded via{" "}
              <a href="/me" className="underline">/me</a>.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={days}
              onChange={(e) => {
                const d = Number(e.target.value);
                setDays(d);
                void load(d);
              }}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value={7}>Last 7 days</option>
              <option value={30}>Last 30 days</option>
              <option value={90}>Last 90 days</option>
              <option value={365}>Last year</option>
            </select>
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-accent"
            >
              Sign out
            </button>
          </div>
        </header>

        {loading && <div className="text-sm text-muted-foreground">Loading…</div>}

        {err && (
          <div className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {err}
          </div>
        )}

        {data && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Stat label="Total views" value={data.totalViews} />
              <Stat label="Unique visitors" value={data.uniqueVisitors} />
              <Stat label="Pages tracked" value={data.topPaths.length} />
              <Stat label="Days with data" value={data.byDay.length} />
            </div>

            <Section title="Views per day">
              <DayChart data={data.byDay} />
            </Section>

            <div className="grid md:grid-cols-2 gap-6">
              <Section title="Top pages">
                <RankList items={data.topPaths.map((p) => ({ label: p.path, value: p.views }))} />
              </Section>
              <Section title="Top referrers">
                <RankList items={data.topReferrers.map((p) => ({ label: p.referrer, value: p.views }))} />
              </Section>
              <Section title="Devices">
                <RankList items={data.byDevice.map((p) => ({ label: p.device, value: p.views }))} />
              </Section>
              <Section title="Countries">
                <RankList items={data.byCountry.map((p) => ({ label: p.country, value: p.views }))} />
              </Section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-border p-4">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="text-2xl font-semibold mt-1">{value.toLocaleString()}</div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border p-4">
      <h2 className="text-sm font-semibold mb-3">{title}</h2>
      {children}
    </div>
  );
}

function RankList({ items }: { items: Array<{ label: string; value: number }> }) {
  if (items.length === 0) return <div className="text-sm text-muted-foreground">No data</div>;
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <ul className="space-y-2">
      {items.map((i) => (
        <li key={i.label}>
          <div className="flex justify-between text-sm">
            <span className="truncate pr-2">{i.label}</span>
            <span className="tabular-nums text-muted-foreground">{i.value}</span>
          </div>
          <div className="h-1.5 bg-muted rounded mt-1 overflow-hidden">
            <div
              className="h-full bg-primary"
              style={{ width: `${(i.value / max) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

function DayChart({ data }: { data: Array<{ day: string; views: number }> }) {
  if (data.length === 0) return <div className="text-sm text-muted-foreground">No data</div>;
  const max = Math.max(...data.map((d) => d.views), 1);
  return (
    <div className="flex items-end gap-1 h-32">
      {data.map((d) => (
        <div key={d.day} className="flex-1 flex flex-col items-center gap-1" title={`${d.day}: ${d.views}`}>
          <div
            className="w-full bg-primary rounded-t"
            style={{ height: `${(d.views / max) * 100}%`, minHeight: 2 }}
          />
        </div>
      ))}
    </div>
  );
}
