Add four analytics enhancements to the existing analytics dashboard:

1. Resume CTA tracking
   - Create a new `analytics_events` table to store click events (resume download, resume view, contact-link clicks, etc.).
   - Add a `trackEvent` helper in the tracker module.
   - Wire the resume split button and contact links to fire events.
   - Add a "Goals" tab/sidebar section to the dashboard showing total CTA conversions and a ranked list of events.

2. CSV export
   - Add a client-side CSV export button to the Live feed tab that downloads the current filtered recent visits as a CSV.

3. UTM tracking
   - Add `utm_source`, `utm_medium`, and `utm_campaign` columns to `page_views`.
   - Capture UTM parameters from the current URL on each page view.
   - Add a "UTM sources" section in the dashboard showing top campaigns and sources.

4. Week-over-week comparison
   - Update the analytics summary server function to compute both current period and previous same-length period metrics.
   - Add percentage-change badges on the overview stat cards (e.g., total views, unique visitors, active now).

Database changes:
- Alter `page_views` to add UTM columns.
- Create `analytics_events` table with GRANTs and an anonymous insert policy.
- Bot filter: skip page views and events from common bot user agents in the tracker code.

Files to touch:
- `src/lib/analytics-tracker.ts` (event tracking, UTM capture, bot filter).
- `src/lib/analytics.functions.ts` (event aggregation, period comparison, UTM summaries).
- `src/routes/index.tsx` (fire resume/contact events).
- `src/routes/analytics.tsx` (new sections, CSV export, WoW badges).
- Migration for schema changes.