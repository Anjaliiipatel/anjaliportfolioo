import { createServerFn } from "@tanstack/react-start";

export type RecentVisit = {
  created_at: string;
  path: string;
  city: string | null;
  region: string | null;
  country: string | null;
  device: string | null;
  browser: string | null;
  os: string | null;
  referrer: string | null;
  timezone: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
};

export type PeriodCompare = {
  totalViews: number;
  uniqueVisitors: number;
};

export type AnalyticsSummary = {
  totalViews: number;
  uniqueVisitors: number;
  prevPeriod: PeriodCompare;
  byDay: Array<{ day: string; views: number }>;
  topPaths: Array<{ path: string; views: number }>;
  topReferrers: Array<{ referrer: string; views: number }>;
  byDevice: Array<{ device: string; views: number }>;
  byBrowser: Array<{ browser: string; views: number }>;
  byOS: Array<{ os: string; views: number }>;
  byCountry: Array<{ country: string; views: number }>;
  byLocation: Array<{ location: string; views: number }>;
  byLanguage: Array<{ language: string; views: number }>;
  byTimezone: Array<{ timezone: string; views: number }>;
  byHour: Array<{ hour: number; views: number }>;
  byUtmSource: Array<{ source: string; views: number }>;
  byUtmMedium: Array<{ medium: string; views: number }>;
  byUtmCampaign: Array<{ campaign: string; views: number }>;
  events: Array<{ name: string; count: number }>;
  recent: RecentVisit[];
};

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export const verifyAdminPassword = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) => data)
  .handler(async ({ data }): Promise<{ ok: boolean }> => {
    const expected = process.env.ANALYTICS_DASHBOARD_TOKEN ?? "";
    if (!expected) throw new Error("Admin password is not configured.");
    return { ok: timingSafeEqual(String(data.password ?? ""), expected) };
  });

export const getAnalyticsSummary = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string; days?: number }) => data)
  .handler(async ({ data }): Promise<AnalyticsSummary> => {
    const expected = process.env.ANALYTICS_DASHBOARD_TOKEN ?? "";
    if (!expected || !timingSafeEqual(String(data.password ?? ""), expected)) {
      throw new Error("Incorrect password.");
    }

    const days = Math.min(Math.max(data.days ?? 30, 1), 365);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const now = Date.now();
    const since = new Date(now - days * 24 * 60 * 60 * 1000).toISOString();
    const prevSince = new Date(now - 2 * days * 24 * 60 * 60 * 1000).toISOString();

    const [viewsRes, prevViewsRes, eventsRes] = await Promise.all([
      supabaseAdmin
        .from("page_views")
        .select(
          "path,referrer,device,browser,os,country,region,city,language,screen_size,timezone,visitor_hash,created_at,utm_source,utm_medium,utm_campaign",
        )
        .gte("created_at", since)
        .order("created_at", { ascending: false })
        .limit(50000),
      supabaseAdmin
        .from("page_views")
        .select("visitor_hash,created_at")
        .gte("created_at", prevSince)
        .lt("created_at", since)
        .limit(50000),
      supabaseAdmin
        .from("analytics_events")
        .select("name")
        .gte("created_at", since)
        .limit(50000),
    ]);

    if (viewsRes.error) throw new Error(viewsRes.error.message);
    if (prevViewsRes.error) throw new Error(prevViewsRes.error.message);
    if (eventsRes.error) throw new Error(eventsRes.error.message);

    const safe = viewsRes.data ?? [];
    const totalViews = safe.length;
    const uniqueVisitors = new Set(
      safe.map((r) => r.visitor_hash).filter(Boolean),
    ).size;

    const prevRows = prevViewsRes.data ?? [];
    const prevPeriod: PeriodCompare = {
      totalViews: prevRows.length,
      uniqueVisitors: new Set(prevRows.map((r) => r.visitor_hash).filter(Boolean)).size,
    };

    const bucket = <T extends string>(items: Array<T | null | undefined>) => {
      const m = new Map<string, number>();
      for (const it of items) {
        const k = (it ?? "unknown") as string;
        m.set(k, (m.get(k) ?? 0) + 1);
      }
      return [...m.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([k, v]) => ({ key: k, views: v }));
    };

    const dayMap = new Map<string, number>();
    const hourMap = new Map<number, number>();
    for (const r of safe) {
      const ts = r.created_at as string;
      dayMap.set(ts.slice(0, 10), (dayMap.get(ts.slice(0, 10)) ?? 0) + 1);
      const h = new Date(ts).getHours();
      hourMap.set(h, (hourMap.get(h) ?? 0) + 1);
    }
    const byDay = [...dayMap.entries()]
      .sort((a, b) => (a[0] < b[0] ? -1 : 1))
      .map(([day, views]) => ({ day, views }));
    const byHour = Array.from({ length: 24 }, (_, h) => ({ hour: h, views: hourMap.get(h) ?? 0 }));

    const recent: RecentVisit[] = safe.slice(0, 50).map((r) => ({
      created_at: r.created_at as string,
      path: r.path as string,
      city: (r.city as string | null) ?? null,
      region: (r.region as string | null) ?? null,
      country: (r.country as string | null) ?? null,
      device: (r.device as string | null) ?? null,
      browser: (r.browser as string | null) ?? null,
      os: (r.os as string | null) ?? null,
      referrer: (r.referrer as string | null) ?? null,
      timezone: (r.timezone as string | null) ?? null,
      utm_source: (r.utm_source as string | null) ?? null,
      utm_medium: (r.utm_medium as string | null) ?? null,
      utm_campaign: (r.utm_campaign as string | null) ?? null,
    }));

    const eventRows = eventsRes.data ?? [];
    const eventCounts = bucket(eventRows.map((r) => r.name));

    return {
      totalViews,
      uniqueVisitors,
      prevPeriod,
      byDay,
      byHour,
      topPaths: bucket(safe.map((r) => r.path)).slice(0, 10).map((x) => ({ path: x.key, views: x.views })),
      topReferrers: bucket(
        safe.map((r) => {
          if (!r.referrer) return "direct";
          try { return new URL(r.referrer).hostname || "direct"; } catch { return "direct"; }
        }),
      ).slice(0, 10).map((x) => ({ referrer: x.key, views: x.views })),
      byDevice: bucket(safe.map((r) => r.device)).map((x) => ({ device: x.key, views: x.views })),
      byBrowser: bucket(safe.map((r) => r.browser)).map((x) => ({ browser: x.key, views: x.views })),
      byOS: bucket(safe.map((r) => r.os)).map((x) => ({ os: x.key, views: x.views })),
      byCountry: bucket(safe.map((r) => r.country)).slice(0, 10).map((x) => ({ country: x.key, views: x.views })),
      byLocation: bucket(
        safe.map((r) => {
          const city = (r.city as string | null) || "";
          const region = (r.region as string | null) || "";
          const country = (r.country as string | null) || "";
          const parts = [city, region, country].filter(Boolean);
          return parts.length ? parts.join(", ") : "unknown";
        }),
      ).slice(0, 15).map((x) => ({ location: x.key, views: x.views })),
      byLanguage: bucket(safe.map((r) => r.language)).slice(0, 10).map((x) => ({ language: x.key, views: x.views })),
      byTimezone: bucket(safe.map((r) => r.timezone)).slice(0, 10).map((x) => ({ timezone: x.key, views: x.views })),
      byUtmSource: bucket(safe.map((r) => r.utm_source)).slice(0, 10).map((x) => ({ source: x.key, views: x.views })),
      byUtmMedium: bucket(safe.map((r) => r.utm_medium)).slice(0, 10).map((x) => ({ medium: x.key, views: x.views })),
      byUtmCampaign: bucket(safe.map((r) => r.utm_campaign)).slice(0, 10).map((x) => ({ campaign: x.key, views: x.views })),
      events: eventCounts.map((x) => ({ name: x.key, count: x.views })),
      recent,
    };
  });
