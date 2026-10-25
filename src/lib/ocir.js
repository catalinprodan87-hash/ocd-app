// OCI-R scoring, draft (resume after SOS / reload) and timing rules.
import { getAll, put, newId, getMeta, setMeta } from '../db/db.js'
import { ocir } from '../content/ocir.js'

export const ITEM_COUNT = ocir.items.length // 18
export const MAX_ANSWER = 4
export const MAX_SCORE = ITEM_COUNT * MAX_ANSWER // 72

// Retaking sooner than this shows a gentle "you did it recently" note first
// (re-taking to see if the number moved can become a checking loop).
export const RETAKE_MIN_DAYS = 14
// Home shows a gentle invitation when there's no score yet or the last is older than this.
export const REMIND_AFTER_DAYS = 28

const DAY = 24 * 60 * 60 * 1000

export const totalScore = (answers) => answers.reduce((sum, a) => sum + a, 0)

export function daysSince(isoDate, now = Date.now()) {
  return Math.floor((now - new Date(isoDate).getTime()) / DAY)
}

// All results, oldest first.
export async function getResults() {
  const all = await getAll('ocir')
  return all.sort((a, b) => a.date.localeCompare(b.date))
}

// Answers are kept as a draft while filling in, so leaving mid-way loses nothing.
// answers[i] is 0–4, or null if not answered yet.
export async function getDraft() {
  return (await getMeta('ocirDraft')) ?? null
}

export function saveDraft(answers) {
  return setMeta('ocirDraft', answers)
}

export async function saveResult(answers) {
  const result = { id: newId(), date: new Date().toISOString(), answers, total: totalScore(answers) }
  await put('ocir', result)
  await setMeta('ocirDraft', null)
  return result
}
