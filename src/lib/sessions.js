// Exposure sessions are saved to the database at every step (not only at the end),
// so tapping SOS, switching apps or a reload mid-exposure never loses the session.
import { put, newId } from '../db/db.js'

export const SESSION_STEPS = ['predict', 'expose', 'reflect', 'done']

// Creates and saves a new session for a ladder item; returns it.
export async function startSession(item) {
  const session = {
    id: newId(),
    ladderItemId: item.id,
    // Copy of the item as it was, so history still makes sense if the item
    // is edited or deleted later.
    item: { description: item.description, level: item.level },
    step: 'predict',
    prediction: { text: '', confidence: 50 },
    resisted: null, // 'yes' | 'partly' | 'no'
    reflection: { whatHappened: '', whatLearned: '' },
    startedAt: new Date().toISOString(),
    completedAt: null,
  }
  await put('sessions', session)
  return session
}

export function saveSession(session) {
  return put('sessions', session)
}
