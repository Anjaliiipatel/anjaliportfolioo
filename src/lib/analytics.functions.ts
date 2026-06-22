import { createServerFn } from "@tanstack/react-start";

export type AnalyticsSummary = {
  totalViews: number;
  uniqueVisitors: number;
  byDay: Array<{ day: string; views: number }>;
  topPaths: Array<{ path: string; views: number }>;
  topReferrers: Array<{ referrer: string; views: number }>;
  byDevice: Array<{ device: string; views: number }>;
  byCountry: Array<{ country: string; views: number }>;
};

export const getAnalyticsSummary = createServerFn({ method: "POST" })
  .inputValidator((data: { token: string; days?: number }) => data)
  .handler(async ({ data }): Promise<AnalyticsSummary> => {
    if (!data.token || data.token !== process.env.ANALYTICS_DASHBOARD_TOKEN) {
      throw new Error("Unauthorized");
    }
    const days = Math.min(Math.max(data.days ?? 30, 1), 365);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

    const { data: rows, error } = await supabaseAdmin
      .from("page_views")
      .select("path,referrer,device,country,visitor_hash,created_at")
      .gte("created_at", since)
      .limit(50000);
    if (error) throw new Error(error.message);

    const safe = rows ?? [];
    const totalViews = safe.length;
    const uniqueVisitors = new Set(
      safe.map((r) => r.visitor_hash).filter(Boolean),
    ).size;

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
    for (const r of safe) {
      const d = (r.created_at as string).slice(0, 10);
      dayMap.set(d, (dayMap.get(d) ?? 0) + 1);
    }
    const byDay = [...dayMap.entries()]
      .sort((a, b) => (a[0] < b[0] ? -1 : 1))
      .map(([day, views]) => ({ day, views }));

    return {
      totalViews,
      uniqueVisitors,
      byDay,
      topPaths: bucket(safe.map((r) => r.path)).slice(0, 10).map((x) => ({ path: x.key, views: x.views })),
      topReferrers: bucket(
        safe.map((r) => {
          if (!r.referrer) return "direct";
          try { return new URL(r.referrer).hostname || "direct"; } catch { return "direct"; }
        }),
      ).slice(0, 10).map((x) => ({ referrer: x.key, views: x.views })),
      byDevice: bucket(safe.map((r) => r.device)).map((x) => ({ device: x.key, views: x.views })),
      byCountry: bucket(safe.map((r) => r.country)).slice(0, 10).map((x) => ({ country: x.key, views: x.views })),
    };
  });
