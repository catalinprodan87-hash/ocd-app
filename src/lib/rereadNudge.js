// Re-read tracking for the "no checking loops" rule.
// Used for learning content only — NEVER for SOS or the worst-moments page,
// which people should be able to open as often as they need.
import { get, put, getMeta, setMeta } from '../db/db.js'

// Opening the same chapter again after this many minutes starts a fresh count:
// coming back to a chapter the next day is normal reviewing, not a loop.
export const SESSION_GAP_MINUTES = 60

// The rule for when the nudge appears. Starting values — the founder's decision.
// timesInARow: how many times this chapter was opened in a row, with no other chapter
//              in between and no gap longer than SESSION_GAP_MINUTES (1 = first open).
// minutesSinceFirst: minutes since the first open of this run.
export function shouldShowRereadNudge({ timesInARow, minutesSinceFirst }) {
  return timesInARow >= 3
}

// Call once each time a chapter is opened. Updates the "reading trail" and returns
// the numbers shouldShowRereadNudge needs.
export async function recordOpen(contentId, now = Date.now()) {
  const trail = await getMeta('readingTrail')
  const continues =
    trail?.contentId === contentId && (now - trail.lastAt) / 60000 <= SESSION_GAP_MINUTES

  const next = continues
    ? { contentId, timesInARow: trail.timesInARow + 1, firstAt: trail.firstAt, lastAt: now }
    : { contentId, timesInARow: 1, firstAt: now, lastAt: now }
  await setMeta('readingTrail', next)

  // Lifetime total per item (not shown anywhere as a score; kept for the user's own export).
  const previous = await get('readCounts', contentId)
  await put('readCounts', { contentId, count: (previous?.count ?? 0) + 1, lastRead: now })

  return { timesInARow: next.timesInARow, minutesSinceFirst: (now - next.firstAt) / 60000 }
}
