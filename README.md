# `promise.hash`

[![npm version](https://img.shields.io/npm/v/promise.hash.svg?style=flat)](https://www.npmjs.com/package/promise.hash)
[![license](https://img.shields.io/npm/l/promise.hash.svg?style=flat)](LICENSE)
[![tests](https://img.shields.io/github/actions/workflow/status/yourusername/promise.hash/test.yml?branch=main)](https://github.com/yourusername/promise.hash/actions)

> A tiny utility that resolves an **object of promises** into an **object of resolved values**. Like `Promise.all`, but for objects instead of arrays.

---

## ✨ What is it?

`promise.hash` takes an object where the values are promises (or normal values) and returns a **single promise** that:

- Resolves to an object with the **same keys**, but with **resolved values**.
- Rejects immediately if **any** promise rejects.
- Works as a modern drop-in replacement for `RSVP.hash`.

It’s like `Promise.all`, but instead of getting an array of results, you get back a **named object**.

---

## 📦 Installation

```bash
pnpm add promise.hash
# or
npm install promise.hash
# or
yarn add promise.hash
```

---

## 🔥 Usage

```typescript
import { promiseHash } from 'promise.hash';

async function loadData() {
  const result = await promiseHash({
    user: fetchUser(),
    posts: fetchPosts(),
  });

  console.log(result.user); // Resolved user
  console.log(result.posts); // Resolved posts
}
```

You can mix promises and plain values too:

```typescript
const result = await promiseHash({
  a: 1,
  b: Promise.resolve(2),
  c: asyncOperation(),
});
console.log(result); // { a: 1, b: 2, c: <resolved value of asyncOperation> }
```

If any promise rejects, the whole `promiseHash` will reject immediately:

```typescript
await promiseHash({
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

---

## 📜 License

MIT
