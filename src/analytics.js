const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

/**
 * @returns {typeof window.gtag | undefined}
 */
function getGtag() {
  return typeof window !== "undefined" ? window.gtag : undefined;
}

function loadGtagScript() {
  if (!MEASUREMENT_ID || typeof document === "undefined") return;
  if (document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`)) return;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(MEASUREMENT_ID)}`;
  document.head.appendChild(script);
}

/**
 * Call once from the app entry (e.g. main.jsx) when the bundle loads.
 */
export function initGoogleAnalytics() {
  if (!MEASUREMENT_ID || typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", MEASUREMENT_ID, {
    anonymize_ip: true,
    send_page_view: true,
  });

  loadGtagScript();
  setupLingerTracking();
}

let lingerSent = false;
const sessionStartMs = typeof performance !== "undefined" && performance.timeOrigin
  ? Math.round(performance.timeOrigin)
  : Date.now();

function sendLingerBeacon() {
  const gtag = getGtag();
  if (!gtag || lingerSent || !MEASUREMENT_ID) return;
  lingerSent = true;
  const engagementMs = Math.max(0, Date.now() - sessionStartMs);
  const lingerSeconds = Math.round(engagementMs / 1000);
  gtag("event", "site_leave", {
    engagement_time_msec: engagementMs,
    linger_seconds: lingerSeconds,
    transport_type: "beacon",
  });
}

function setupLingerTracking() {
  if (typeof window === "undefined") return;
  window.addEventListener("pagehide", () => {
    sendLingerBeacon();
  });
}

/**
 * GA4 recommended event names use snake_case. Params should be simple (string/number).
 * @param {string} eventName
 * @param {Record<string, string | number | boolean | undefined>} [params]
 */
export function trackEvent(eventName, params) {
  const gtag = getGtag();
  if (!gtag || !MEASUREMENT_ID) return;
  const payload = { ...params };
  Object.keys(payload).forEach(k => {
    if (payload[k] === undefined) delete payload[k];
  });
  gtag("event", eventName, payload);
}
