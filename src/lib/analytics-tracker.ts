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

let lastTracked = "";

export async function trackPageView(path: string) {
  if (typeof window === "undefined") return;
  if (isOwner()) return;
  // Dedupe same path within 1s (route effect can fire twice in strict mode)
  const key = `${path}|${Date.now() >> 10}`;
  if (key === lastTracked) return;
  lastTracked = key;

  let country: string | null = null;
  try {
    // Best-effort geolocation; fail silently
    const res = await fetch("https://ipapi.co/country/", { cache: "force-cache" });
    if (res.ok) country = (await res.text()).trim().slice(0, 8) || null;
  } catch {
    /* ignore */
  }

  await supabase.from("page_views").insert({
    path,
    referrer: document.referrer || null,
    device: detectDevice(),
    country,
    visitor_hash: getVisitorHash(),
  });
}
