import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  getAnalyticsSummary,
  verifyAdminPassword,
  type AnalyticsSummary,
  type RecentVisit,
} from "@/lib/analytics.functions";
import { setOwner } from "@/lib/analytics-tracker";
import {
  LayoutDashboard,
  Users,
  FileText,
  Globe,
  MonitorSmartphone,
  Activity,
  Lock,
  RefreshCw,
  TrendingUp,
  Eye,
  Calendar,
  Clock,
  Radio,
  Pause,
  Play,
  ArrowUp,
} from "lucide-react";


export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [{ title: "Admin · Analytics" }, { name: "robots", content: "noindex" }],
  }),
  component: AnalyticsPage,
});

const PW_KEY = "analytics_pw";

type SectionKey = "overview" | "visitors" | "pages" | "locations" | "tech" | "live";

function AnalyticsPage() {
  const fetchSummary = useServerFn(getAnalyticsSummary);
  const verify = useServerFn(verifyAdminPassword);

  const [password, setPassword] = useState<string | null>(null);
  const [pwInput, setPwInput] = useState("");
  const [unlocking, setUnlocking] = useState(false);
  const [unlockErr, setUnlockErr] = useState<string | null>(null);

  const [days, setDays] = useState(30);
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [section, setSection] = useState<SectionKey>("overview");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [newViews, setNewViews] = useState(0);
  const prevTotalRef = useRef<number | null>(null);

  async function load(pw: string, d: number, opts?: { silent?: boolean }) {
    if (!opts?.silent) setLoading(true);
    setErr(null);
    try {
      const res = await fetchSummary({ data: { password: pw, days: d } });
      if (prevTotalRef.current !== null && res.totalViews > prevTotalRef.current) {
        setNewViews(res.totalViews - prevTotalRef.current);
        setTimeout(() => setNewViews(0), 4000);
      }
      prevTotalRef.current = res.totalViews;
      setData(res);
      setLastUpdated(new Date());
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to load");
      if (!opts?.silent) setData(null);
    } finally {
      if (!opts?.silent) setLoading(false);
    }
  }

  useEffect(() => {
    const saved = typeof window !== "undefined" ? sessionStorage.getItem(PW_KEY) : null;
    if (saved) {
      setOwner(true);
      setPassword(saved);
      void load(saved, days);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-refresh polling
  useEffect(() => {
    if (!password || !autoRefresh) return;
    const id = setInterval(() => {
      void load(password, days, { silent: true });
    }, 10000);
    return () => clearInterval(id);
  }, [password, autoRefresh, days]); // eslint-disable-line react-hooks/exhaustive-deps


  async function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    setUnlocking(true);
    setUnlockErr(null);
    try {
      const { ok } = await verify({ data: { password: pwInput } });
      if (!ok) {
        setUnlockErr("Incorrect password.");
        return;
      }
      sessionStorage.setItem(PW_KEY, pwInput);
      setOwner(true);
      setPassword(pwInput);
      setPwInput("");
      void load(pwInput, days);
    } catch (e) {
      setUnlockErr(e instanceof Error ? e.message : "Verification failed");
    } finally {
      setUnlocking(false);
    }
  }

  function handleLock() {
    sessionStorage.removeItem(PW_KEY);
    setPassword(null);
    setData(null);
  }

  if (!password) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
        <form
          onSubmit={handleUnlock}
          className="w-full max-w-sm space-y-4 rounded-xl border border-border bg-card p-6 shadow-lg"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Admin Center</h1>
              <p className="text-xs text-muted-foreground">Owner access only</p>
            </div>
          </div>
          <input
            type="password"
            placeholder="Password"
            autoFocus
            required
            value={pwInput}
            onChange={(e) => setPwInput(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
          {unlockErr && <div className="text-sm text-destructive">{unlockErr}</div>}
          <button
            type="submit"
            disabled={unlocking}
            className="w-full rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 disabled:opacity-50"
          >
            {unlocking ? "Checking…" : "Unlock"}
          </button>
        </form>
      </div>
    );
  }

  const nav: Array<{ key: SectionKey; label: string; icon: typeof LayoutDashboard }> = [
    { key: "overview", label: "Overview", icon: LayoutDashboard },
    { key: "visitors", label: "Visitors", icon: Users },
    { key: "pages", label: "Pages", icon: FileText },
    { key: "locations", label: "Locations", icon: Globe },
    { key: "tech", label: "Tech", icon: MonitorSmartphone },
    { key: "live", label: "Live feed", icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-muted/30 text-foreground flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-border bg-card">
        <div className="px-5 py-5 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary/10 text-primary flex items-center justify-center">
              <LayoutDashboard className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-semibold leading-tight">Admin Center</div>
              <div className="text-[11px] text-muted-foreground">Private dashboard</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-2 py-3 space-y-1">
          {nav.map((n) => {
            const Icon = n.icon;
            const active = section === n.key;
            return (
              <button
                key={n.key}
                onClick={() => setSection(n.key)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                  active
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-foreground/80 hover:bg-accent hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {n.label}
              </button>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border">
          <button
            onClick={handleLock}
            className="w-full flex items-center justify-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-accent"
          >
            <Lock className="h-3.5 w-3.5" />
            Lock
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Topbar */}
        <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 md:px-6 gap-3">
          <div className="flex items-center gap-2 overflow-x-auto md:overflow-visible">
            {/* Mobile nav */}
            <div className="md:hidden flex items-center gap-1">
              {nav.map((n) => {
                const Icon = n.icon;
                const active = section === n.key;
                return (
                  <button
                    key={n.key}
                    onClick={() => setSection(n.key)}
                    title={n.label}
                    className={`h-9 w-9 flex items-center justify-center rounded-md ${
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/70 hover:bg-accent"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                );
              })}
            </div>
            <h2 className="hidden md:block text-lg font-semibold capitalize">{section}</h2>
            <LiveBadge active={autoRefresh} />
            {newViews > 0 && (
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 text-xs font-medium animate-in fade-in slide-in-from-top-1">
                <ArrowUp className="h-3 w-3" />
                {newViews} new
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <select
              value={days}
              onChange={(e) => {
                const d = Number(e.target.value);
                setDays(d);
                if (password) void load(password, d);
              }}
              className="rounded-md border border-input bg-background px-2 py-1.5 text-xs md:text-sm"
            >
              <option value={7}>Last 7 days</option>
              <option value={30}>Last 30 days</option>
              <option value={90}>Last 90 days</option>
              <option value={365}>Last year</option>
            </select>
            <button
              onClick={() => setAutoRefresh((v) => !v)}
              className={`h-9 px-3 flex items-center gap-1.5 rounded-md border text-xs font-medium transition-colors ${
                autoRefresh
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/15"
                  : "border-input bg-background hover:bg-accent"
              }`}
              title={autoRefresh ? "Pause live updates" : "Resume live updates"}
            >
              {autoRefresh ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              <span className="hidden sm:inline">{autoRefresh ? "Live" : "Paused"}</span>
            </button>
            <button
              onClick={() => password && load(password, days)}
              disabled={loading}
              className="h-9 w-9 flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent disabled:opacity-50"
              title="Refresh"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={handleLock}
              className="md:hidden h-9 w-9 flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent"
              title="Lock"
            >
              <Lock className="h-4 w-4" />
            </button>

          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 space-y-6">
          {err && (
            <div className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {err}
            </div>
          )}

          {!data && loading && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-24 rounded-lg border border-border bg-card animate-pulse" />
              ))}
            </div>
          )}

          {data && (
            <>
              {section === "overview" && <Overview data={data} lastUpdated={lastUpdated} />}
              {section === "visitors" && <Visitors data={data} />}
              {section === "pages" && <Pages data={data} />}
              {section === "locations" && <Locations data={data} />}
              {section === "tech" && <Tech data={data} />}
              {section === "live" && <Live data={data} />}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

/* ---------------- Sections ---------------- */

function Overview({ data, lastUpdated }: { data: AnalyticsSummary; lastUpdated: Date | null }) {
  const today = new Date().toISOString().slice(0, 10);
  const todayViews = data.byDay.find((d) => d.day === today)?.views ?? 0;
  const last7 = data.byDay.slice(-7).reduce((s, d) => s + d.views, 0);
  const avgPerDay = data.byDay.length
    ? Math.round(data.totalViews / data.byDay.length)
    : 0;
  const peak = data.byDay.reduce(
    (best, d) => (d.views > best.views ? d : best),
    { day: "—", views: 0 },
  );
  const peakHour = data.byHour.reduce(
    (best, h) => (h.views > best.views ? h : best),
    { hour: 0, views: 0 },
  );

  const activeNow = useMemo(() => {
    const cutoff = Date.now() - 5 * 60 * 1000;
    return data.recent.filter((r) => new Date(r.created_at).getTime() >= cutoff).length;
  }, [data.recent]);
  const viewsLastHour = useMemo(() => {
    const cutoff = Date.now() - 60 * 60 * 1000;
    return data.recent.filter((r) => new Date(r.created_at).getTime() >= cutoff).length;
  }, [data.recent]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat
          label="Active now"
          value={activeNow}
          sub="last 5 min"
          icon={Radio}
          accent
          pulse={activeNow > 0}
        />
        <Stat label="Views last hour" value={viewsLastHour} icon={Activity} />
        <Stat label="Total views" value={data.totalViews} icon={Eye} />
        <Stat label="Unique visitors" value={data.uniqueVisitors} icon={Users} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="Views today" value={todayViews} icon={Calendar} />
        <Stat label="Last 7 days" value={last7} icon={TrendingUp} />
        <Stat label="Avg / day" value={avgPerDay} icon={TrendingUp} />
        <Stat label="Peak hour" value={peakHour.views} sub={`${peakHour.hour}:00`} icon={Clock} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Section title="Views per day" subtitle="Trend over selected range">
            <DayChart data={data.byDay} />
          </Section>
        </div>
        <Section title="Live activity" subtitle="Latest visits, updating in real time">
          <ActivityTicker rows={data.recent.slice(0, 8)} />
        </Section>
      </div>


      <div className="grid lg:grid-cols-2 gap-6">
        <Section title="Top pages">
          <RankList items={data.topPaths.map((p) => ({ label: p.path, value: p.views }))} />
        </Section>
        <Section title="Top referrers">
          <RankList items={data.topReferrers.map((p) => ({ label: p.referrer, value: p.views }))} />
        </Section>
      </div>

      {lastUpdated && (
        <div className="text-xs text-muted-foreground text-right">
          Last refreshed {lastUpdated.toLocaleTimeString()}
        </div>
      )}
    </div>
  );
}

function Visitors({ data }: { data: AnalyticsSummary }) {
  const viewsPerVisitor = data.uniqueVisitors
    ? (data.totalViews / data.uniqueVisitors).toFixed(2)
    : "0";
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="Unique visitors" value={data.uniqueVisitors} icon={Users} accent />
        <Stat label="Total views" value={data.totalViews} icon={Eye} />
        <Stat label="Views / visitor" value={viewsPerVisitor} icon={TrendingUp} />
        <Stat label="Languages" value={data.byLanguage.length} icon={Globe} />
      </div>
      <Section title="Views by hour of day" subtitle="Server time">
        <HourChart data={data.byHour} />
      </Section>
      <div className="grid md:grid-cols-2 gap-6">
        <Section title="Languages">
          <RankList items={data.byLanguage.map((p) => ({ label: p.language, value: p.views }))} />
        </Section>
        <Section title="Timezones">
          <RankList items={data.byTimezone.map((p) => ({ label: p.timezone, value: p.views }))} />
        </Section>
      </div>
    </div>
  );
}

function Pages({ data }: { data: AnalyticsSummary }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Stat label="Pages tracked" value={data.topPaths.length} icon={FileText} accent />
        <Stat label="Total views" value={data.totalViews} icon={Eye} />
        <Stat label="Referrers" value={data.topReferrers.length} icon={Globe} />
      </div>
      <Section title="Top pages">
        <RankList items={data.topPaths.map((p) => ({ label: p.path, value: p.views }))} />
      </Section>
      <Section title="Top referrers">
        <RankList items={data.topReferrers.map((p) => ({ label: p.referrer, value: p.views }))} />
      </Section>
    </div>
  );
}

function Locations({ data }: { data: AnalyticsSummary }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Stat label="Countries" value={data.byCountry.length} icon={Globe} accent />
        <Stat label="Cities / regions" value={data.byLocation.length} icon={Globe} />
        <Stat label="Timezones" value={data.byTimezone.length} icon={Clock} />
      </div>
      <Section title="Visitor locations" subtitle="City, region, country">
        <RankList items={data.byLocation.map((p) => ({ label: p.location, value: p.views }))} />
      </Section>
      <div className="grid md:grid-cols-2 gap-6">
        <Section title="Countries">
          <RankList items={data.byCountry.map((p) => ({ label: p.country, value: p.views }))} />
        </Section>
        <Section title="Timezones">
          <RankList items={data.byTimezone.map((p) => ({ label: p.timezone, value: p.views }))} />
        </Section>
      </div>
    </div>
  );
}

function Tech({ data }: { data: AnalyticsSummary }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Stat label="Devices" value={data.byDevice.length} icon={MonitorSmartphone} accent />
        <Stat label="Browsers" value={data.byBrowser.length} icon={MonitorSmartphone} />
        <Stat label="Operating systems" value={data.byOS.length} icon={MonitorSmartphone} />
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <Section title="Devices">
          <RankList items={data.byDevice.map((p) => ({ label: p.device, value: p.views }))} />
        </Section>
        <Section title="Browsers">
          <RankList items={data.byBrowser.map((p) => ({ label: p.browser, value: p.views }))} />
        </Section>
        <Section title="Operating systems">
          <RankList items={data.byOS.map((p) => ({ label: p.os, value: p.views }))} />
        </Section>
      </div>
    </div>
  );
}

function Live({ data }: { data: AnalyticsSummary }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data.recent;
    return data.recent.filter((r) =>
      [r.path, r.city, r.region, r.country, r.device, r.browser, r.os, r.referrer]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [query, data.recent]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold">Recent visits</h3>
          <p className="text-xs text-muted-foreground">
            Latest {data.recent.length} page views
          </p>
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter…"
          className="rounded-md border border-input bg-background px-3 py-1.5 text-sm w-44"
        />
      </div>
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <RecentTable rows={filtered} />
      </div>
    </div>
  );
}

/* ---------------- Building blocks ---------------- */

function Stat({
  label,
  value,
  sub,
  icon: Icon,
  accent,
  pulse,
}: {
  label: string;
  value: number | string;
  sub?: string;
  icon?: typeof Eye;
  accent?: boolean;
  pulse?: boolean;
}) {
  return (
    <div
      className={`relative rounded-lg border p-4 ${
        accent ? "border-primary/30 bg-primary/5" : "border-border bg-card"
      }`}
    >
      {pulse && (
        <span className="absolute top-3 right-3 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
      )}
      <div className="flex items-center justify-between">
        <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</div>
        {Icon && !pulse && (
          <div
            className={`h-7 w-7 rounded-md flex items-center justify-center ${
              accent ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
          </div>
        )}
      </div>

      <div className="text-2xl font-semibold mt-2 tabular-nums">
        {typeof value === "number" ? value.toLocaleString() : value}
      </div>
      {sub && <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>}
    </div>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="mb-3">
        <h2 className="text-sm font-semibold">{title}</h2>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
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
    <div className="flex items-end gap-1 h-36">
      {data.map((d) => (
        <div
          key={d.day}
          className="flex-1 flex flex-col items-center gap-1 group"
          title={`${d.day}: ${d.views}`}
        >
          <div
            className="w-full bg-primary/70 group-hover:bg-primary rounded-t transition-colors"
            style={{ height: `${(d.views / max) * 100}%`, minHeight: 2 }}
          />
        </div>
      ))}
    </div>
  );
}

function HourChart({ data }: { data: Array<{ hour: number; views: number }> }) {
  const max = Math.max(...data.map((d) => d.views), 1);
  return (
    <div className="flex items-end gap-1 h-28">
      {data.map((d) => (
        <div
          key={d.hour}
          className="flex-1 flex flex-col items-center gap-1"
          title={`${d.hour}:00 — ${d.views}`}
        >
          <div
            className="w-full bg-primary/70 hover:bg-primary rounded-t transition-colors"
            style={{ height: `${(d.views / max) * 100}%`, minHeight: 2 }}
          />
          <div className="text-[10px] text-muted-foreground tabular-nums">{d.hour}</div>
        </div>
      ))}
    </div>
  );
}

function RecentTable({
  rows,
}: {
  rows: Array<{
    created_at: string;
    path: string;
    city: string | null;
    region: string | null;
    country: string | null;
    device: string | null;
    browser: string | null;
    os: string | null;
    referrer: string | null;
  }>;
}) {
  if (rows.length === 0)
    return <div className="p-4 text-sm text-muted-foreground">No visits match</div>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-muted/40">
          <tr className="text-left text-xs uppercase text-muted-foreground">
            <th className="py-2 px-3 font-medium">When</th>
            <th className="py-2 px-3 font-medium">Page</th>
            <th className="py-2 px-3 font-medium">Location</th>
            <th className="py-2 px-3 font-medium">Device</th>
            <th className="py-2 px-3 font-medium">Browser</th>
            <th className="py-2 px-3 font-medium">OS</th>
            <th className="py-2 px-3 font-medium">Referrer</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const loc = [r.city, r.region, r.country].filter(Boolean).join(", ") || "—";
            const ref = (() => {
              if (!r.referrer) return "direct";
              try {
                return new URL(r.referrer).hostname;
              } catch {
                return r.referrer;
              }
            })();
            return (
              <tr key={i} className="border-t border-border hover:bg-muted/30">
                <td className="py-2 px-3 whitespace-nowrap text-muted-foreground">
                  {new Date(r.created_at).toLocaleString()}
                </td>
                <td className="py-2 px-3 truncate max-w-[180px]" title={r.path}>
                  {r.path}
                </td>
                <td className="py-2 px-3">{loc}</td>
                <td className="py-2 px-3">{r.device ?? "—"}</td>
                <td className="py-2 px-3">{r.browser ?? "—"}</td>
                <td className="py-2 px-3">{r.os ?? "—"}</td>
                <td
                  className="py-2 px-3 truncate max-w-[140px]"
                  title={r.referrer ?? ""}
                >
                  {ref}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
