# `promisary`

[![npm version](https://img.shields.io/npm/v/promisary.svg?style=flat)](https://www.npmjs.com/package/promisary)
[![license](https://img.shields.io/npm/l/promisary.svg?style=flat)](LICENSE)
[![tests](https://img.shields.io/github/actions/workflow/status/RobbieTheWagner/promisary/test.yml?branch=main)](https://github.com/RobbieTheWagner/promisary/actions)

> A growing collection of utilities to make working with Promises easier and cleaner.

---

## ✨ What is it?

`promisary` is a growing collection of promise utilities to make async JavaScript easier and cleaner.

The first utility available is `hash`, which takes an object where the values are promises (or normal values) and returns a **single promise** that:

- Resolves to an object with the **same keys**, but with **resolved values**.
- Rejects immediately if **any** promise rejects.
- Works as a modern drop-in replacement for `RSVP.hash`.

It’s like `Promise.all`, but instead of getting an array of results, you get back a **named object**.

**More utilities are planned for future releases!**

---

## 📦 Installation

```bash
pnpm add promisary
# or
npm install promisary
# or
yarn add promisary
```

---

## 🔥 Usage

```typescript
import { hash } from 'promisary';

async function loadData() {
  const result = await hash({
    user: fetchUser(),
    posts: fetchPosts()
  });

  console.log(result.user);  // Resolved user
  console.log(result.posts); // Resolved posts
}
```

You can mix promises and plain values too:

```typescript
const result = await hash({
  a: 1,
  b: Promise.resolve(2),
  c: asyncOperation()
});
console.log(result); // { a: 1, b: 2, c: <resolved value of asyncOperation> }
```

If any promise rejects, the whole `hash` will reject immediately:

```typescript
await hash({
  a: Promise.reject(new Error('fail')),
  b: Promise.resolve(2)
});
// -> throws Error: fail
```

---

## 🛠 Why use this?

- **Drop-in replacement for `RSVP.hash`** in modern apps.
- **No extra dependencies** besides native Promises.
- **Tiny and tree-shakable** (~300 bytes minified).
- **TypeScript ready** and fully tested.

Perfect for cleaning up older Ember.js apps or anywhere you want better Promise ergonomics.

---

## ✅ Features

- Supports plain values and promises.
- Rejects early on failure.
- Fully typed with TypeScript.
- Lightweight and fast.
- More Promise utilities coming soon!

---

## 📅 Roadmap

Here are some utilities planned for future releases:

- **`hashSettled`** — Resolve an object of promises like `Promise.allSettled`, capturing both successes and failures.
- **`timeout`** — Add a timeout to any promise, rejecting if it takes too long.
- **`raceObject`** — Like `Promise.race`, but for an object of promises.
- **`delay`** — Create a promise that resolves after a specified delay.
- **More to come!**

Have ideas? [Open an issue](https://github.com/RobbieTheWagner/promisary/issues) or send a PR!

---

## 📜 License

MIT
