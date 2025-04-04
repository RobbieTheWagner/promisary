# `promisely`

[![npm version](https://img.shields.io/npm/v/promisely.svg?style=flat)](https://www.npmjs.com/package/promisely)
[![license](https://img.shields.io/npm/l/promisely.svg?style=flat)](LICENSE)
[![tests](https://img.shields.io/github/actions/workflow/status/RobbieTheWagner/promisely/test.yml?branch=main)](https://github.com/RobbieTheWagner/promisely/actions)

> A collection of tiny utilities to make working with Promises easier.

---

## ✨ What is it?

`promisely` is a growing collection of promise utilities to make async JavaScript easier and cleaner.

The first utility available is `hash`, which takes an object where the values are promises (or normal values) and returns a **single promise** that:

- Resolves to an object with the **same keys**, but with **resolved values**.
- Rejects immediately if **any** promise rejects.
- Works as a modern drop-in replacement for `RSVP.hash`.

It’s like `Promise.all`, but instead of getting an array of results, you get back a **named object**.

**More utilities are planned for future releases!**

---

## 📦 Installation

```bash
pnpm add promisely
# or
npm install promisely
# or
yarn add promisely
```

---

## 🔥 Usage

```typescript
import { hash } from 'promisely';

async function loadData() {
  const result = await hash({
    user: fetchUser(),
    posts: fetchPosts(),
  });

  console.log(result.user); // Resolved user
  console.log(result.posts); // Resolved posts
}
```

You can mix promises and plain values too:

```typescript
const result = await hash({
  a: 1,
  b: Promise.resolve(2),
  c: asyncOperation(),
});
console.log(result); // { a: 1, b: 2, c: <resolved value of asyncOperation> }
```

If any promise rejects, the whole `hash` will reject immediately:

```typescript
await hash({
  a: Promise.reject(new Error('fail')),
  b: Promise.resolve(2),
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

## 📜 License

MIT
