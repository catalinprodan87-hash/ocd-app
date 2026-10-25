// On-device database (IndexedDB). The ONLY place the app reads or writes user data.
// Nothing here talks to the network: data never leaves the phone.
import { openDB, deleteDB } from 'idb'

const DB_NAME = 'ocd-app'
const DB_VERSION = 1

// Every store the app uses. Export and delete-all loop over this list,
// so a new store added here is automatically included in both.
export const STORES = ['meta', 'compulsions', 'ladderItems', 'sessions', 'logs', 'ocir', 'readCounts']

/*
 * Data shapes (for reference — JavaScript doesn't enforce them):
 *
 * meta        { key, value }  e.g. { key: 'disclaimerAcceptedAt', value: '2026-10-25T…' }
 * compulsions { id, label, kind: 'visible'|'mental', category: typeId|null, instead, createdAt, updatedAt }
 * ladderItems { id, description, theme, baselineSuds: 0–100, archived, createdAt }
 * sessions    { id, ladderItemId, prediction: { text, confidence: 0–100 }, sudsBefore,
 *               resisted, reflection: { whatHappened, whatLearned }, startedAt, completedAt }
 * logs        { id, ts, compulsionId?, gaveIn: boolean, note? }
 * ocir        { id, date, answers: number[18], total }
 * readCounts  { contentId, count, lastRead }
 */

let dbPromise = null

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // Runs once when the database is first created (and on future version bumps).
        db.createObjectStore('meta', { keyPath: 'key' })
        db.createObjectStore('readCounts', { keyPath: 'contentId' })
        for (const name of ['compulsions', 'ladderItems', 'sessions', 'logs', 'ocir']) {
          db.createObjectStore(name, { keyPath: 'id' })
        }
      },
      // Another tab (or the installed app) wants to delete/upgrade the database:
      // let go of our connection so its delete isn't blocked forever.
      blocking() {
        dbPromise?.then((db) => db.close())
        dbPromise = null
      },
    })
  }
  return dbPromise
}

// crypto.randomUUID only exists on https/localhost. When testing on a phone over
// http://192.168.x.x it's missing, so fall back to a timestamp + random id.
export function newId() {
  if (globalThis.crypto?.randomUUID) return crypto.randomUUID()
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 10)
}

// --- Generic helpers ---------------------------------------------------------

export async function getAll(store) {
  return (await getDB()).getAll(store)
}

export async function get(store, key) {
  return (await getDB()).get(store, key)
}

export async function put(store, record) {
  return (await getDB()).put(store, record)
}

export async function remove(store, key) {
  return (await getDB()).delete(store, key)
}

export async function count(store) {
  return (await getDB()).count(store)
}

// --- Meta (simple app settings stored as key/value) --------------------------

export async function getMeta(key) {
  return (await get('meta', key))?.value
}

export async function setMeta(key, value) {
  return put('meta', { key, value })
}

// --- Privacy: export and delete ----------------------------------------------

// Everything stored on this device, as one plain object (for the JSON export).
export async function exportAll() {
  const db = await getDB()
  const data = {}
  for (const name of STORES) data[name] = await db.getAll(name)
  return {
    app: DB_NAME,
    schemaVersion: DB_VERSION,
    exportedAt: new Date().toISOString(),
    data,
  }
}

// Permanently removes the whole database from this device.
export async function deleteEverything() {
  if (dbPromise) {
    // An open connection would block the delete, so close it first.
    ;(await dbPromise).close()
    dbPromise = null
  }
  await deleteDB(DB_NAME)
}

// Ask the browser not to clear our data when the phone runs low on space.
// Browsers may say no (e.g. Safari for sites not added to the home screen); that's fine.
export async function requestPersistentStorage() {
  if (!navigator.storage?.persist) return false
  if (await navigator.storage.persisted()) return true
  return navigator.storage.persist()
}
