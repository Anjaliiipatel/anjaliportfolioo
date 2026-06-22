import { supabase } from "@/integrations/supabase/client";

export const OWNER_FLAG_KEY = "lovable_exclude_me";
export const VISITOR_ID_KEY = "lovable_visitor_id";

export function isOwner(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(OWNER_FLAG_KEY) === "1";
  } catch {
    return false;
  }
}

export function setOwner(value: boolean) {
  if (typeof window === "undefined") return;
  try {
    if (value) window.localStorage.setItem(OWNER_FLAG_KEY, "1");
    else window.localStorage.removeItem(OWNER_FLAG_KEY);
  } catch {
    /* ignore */
  }
}

function getVisitorHash(): string {
  if (typeof window === "undefined") return "";
  try {
    let v = window.localStorage.getItem(VISITOR_ID_KEY);
    if (!v) {
      v = crypto.randomUUID();
      window.localStorage.setItem(VISITOR_ID_KEY, v);
    }
    return v;
  } catch {
    return "";
  }
}

function detectDevice(): string {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent;
  if (/Mobi|Android|iPhone/i.test(ua)) return "mobile";
  if (/iPad|Tablet/i.test(ua)) return "tablet";
  return "desktop";
}

function detectBrowser(): string {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent;
  if (/Edg\//.test(ua)) return "Edge";
  if (/OPR\/|Opera/.test(ua)) return "Opera";
  if (/Chrome\//.test(ua) && !/Edg\/|OPR\//.test(ua)) return "Chrome";
  if (/Firefox\//.test(ua)) return "Firefox";
  if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) return "Safari";
  return "Other";
}

function detectOS(): string {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent;
  if (/Windows NT/.test(ua)) return "Windows";
  if (/Mac OS X|Macintosh/.test(ua) && !/Mobile/.test(ua)) return "macOS";
  if (/iPhone|iPad|iPod/.test(ua)) return "iOS";
  if (/Android/.test(ua)) return "Android";
  if (/Linux/.test(ua)) return "Linux";
  return "Other";
}

type GeoInfo = { country: string | null; region: string | null; city: string | null };

async function fetchGeo(): Promise<GeoInfo> {
  try {
    const res = await fetch("https://ipapi.co/json/", { cache: "force-cache" });
    if (!res.ok) return { country: null, region: null, city: null };
    const j = (await res.json()) as { country_name?: string; region?: string; city?: string };
    return {
      country: (j.country_name ?? "").slice(0, 128) || null,
      region: (j.region ?? "").slice(0, 128) || null,
      city: (j.city ?? "").slice(0, 128) || null,
    };
  } catch {
    return { country: null, region: null, city: null };
  }
}

let lastTracked = "";

export async function trackPageView(path: string) {
  if (typeof window === "undefined") return;
  if (isOwner()) return;
  // Dedupe same path within 1s (route effect can fire twice in strict mode)
  const key = `${path}|${Date.now() >> 10}`;
  if (key === lastTracked) return;
  lastTracked = key;

  const geo = await fetchGeo();

  const language =
    typeof navigator !== "undefined" ? (navigator.language || "").slice(0, 32) || null : null;
  const screen_size =
    typeof window !== "undefined" && window.screen
      ? `${window.screen.width}x${window.screen.height}`
      : null;
  let timezone: string | null = null;
  try {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || null;
    if (timezone) timezone = timezone.slice(0, 64);
  } catch {
    /* ignore */
  }

  await supabase.from("page_views").insert({
    path,
    referrer: document.referrer || null,
    device: detectDevice(),
    browser: detectBrowser(),
    os: detectOS(),
    country: geo.country,
    region: geo.region,
    city: geo.city,
    language,
    screen_size,
    timezone,
    visitor_hash: getVisitorHash(),
  });
}
