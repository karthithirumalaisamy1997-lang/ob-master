// Firebase-backed storage for the Operation Bulletin app.
//
// This replaces the localStorage fallback with real cloud storage (Firestore),
// using the "OB MASTER" Firebase project's config. It implements the exact
// same window.storage API (get/set/delete/list) that src/ob-app.js already
// expects, so none of the app's existing save/load logic needed to change —
// this file is imported once (for its side effect of setting window.storage)
// before that logic runs.
//
// Because this now writes to a shared Firestore database instead of each
// browser's own localStorage, saved data (Master Data, Users, Saved OBs) is
// now shared across every device/browser that opens the app — this is what
// fixes the earlier "data stays on one browser only" limitation.

import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  collection,
  query,
  orderBy,
  startAt,
  endAt,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDKzoG0kEamK3xQENJwd4_NLH4RfxNITew",
  authDomain: "ob-master-1e605.firebaseapp.com",
  projectId: "ob-master-1e605",
  storageBucket: "ob-master-1e605.firebasestorage.app",
  messagingSenderId: "195690790884",
  appId: "1:195690790884:web:77c95b9e069cfb842a91f1",
  measurementId: "G-7B22RPTP6S",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Every saved key (ob_master_data, ob_users, ob_saved:<id>, etc.) becomes
// one document in this Firestore collection, with its Firestore document ID
// set to that key.
const COLLECTION = 'ob_storage'

window.storage = {
  async get(key) {
    const snap = await getDoc(doc(db, COLLECTION, key))
    if (!snap.exists()) return null
    return { key, value: snap.data().value, shared: false }
  },
  async set(key, value) {
    await setDoc(doc(db, COLLECTION, key), { value, updatedAt: serverTimestamp() })
    return { key, value, shared: false }
  },
  async delete(key) {
    const existing = await getDoc(doc(db, COLLECTION, key))
    await deleteDoc(doc(db, COLLECTION, key))
    return { key, deleted: existing.exists(), shared: false }
  },
  async list(prefix) {
    const p = prefix || ''
    // Prefix search on document ID using Firestore's ordering trick:
    // everything from p up to p + the highest possible unicode char.
    const q = query(
      collection(db, COLLECTION),
      orderBy('__name__'),
      startAt(p),
      endAt(p + '\uf8ff')
    )
    const snap = await getDocs(q)
    const keys = []
    snap.forEach((d) => keys.push(d.id))
    return { keys, prefix, shared: false }
  },
}

export default window.storage
