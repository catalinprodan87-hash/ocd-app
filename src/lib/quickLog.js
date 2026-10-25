// Quick compulsion log: saving, undo, and the order compulsions are offered in.
import { getAll, put, remove, newId } from '../db/db.js'

const RECENT_DAYS = 14

// Order for the quick-log chips: the ones logged most in the last RECENT_DAYS first
// (so the likely one is already at the top), then the rest in inventory order.
export function orderForQuickLog(compulsions, logs, now = Date.now()) {
  const since = now - RECENT_DAYS * 24 * 60 * 60 * 1000
  const recentCount = {}
  for (const log of logs) {
    if (log.compulsionId && log.ts >= since) {
      recentCount[log.compulsionId] = (recentCount[log.compulsionId] ?? 0) + 1
    }
  }
  return [...compulsions].sort(
    (a, b) => (recentCount[b.id] ?? 0) - (recentCount[a.id] ?? 0) || a.createdAt.localeCompare(b.createdAt),
  )
}

export async function loadQuickLogChoices() {
  const [compulsions, logs] = await Promise.all([getAll('compulsions'), getAll('logs')])
  return orderForQuickLog(compulsions, logs)
}

// compulsion is optional (null = not specified). Returns the saved entry.
export async function logCompulsion(compulsion, gaveIn) {
  const entry = {
    id: newId(),
    ts: Date.now(),
    compulsionId: compulsion?.id ?? null,
    // Copy of the name, so the entry still reads well if the compulsion is deleted later.
    label: compulsion?.label ?? null,
    gaveIn,
  }
  await put('logs', entry)
  return entry
}

export function undoLog(entry) {
  return remove('logs', entry.id)
}
