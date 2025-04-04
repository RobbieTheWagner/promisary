# `promisary`

[![npm version](https://img.shields.io/npm/v/promisary.svg?style=flat)](https://www.npmjs.com/package/promisary)
[![license](https://img.shields.io/npm/l/promisary.svg?style=flat)](LICENSE)
[![tests](https://img.shields.io/github/actions/workflow/status/RobbieTheWagner/promisary/test.yml?branch=main)](https://github.com/RobbieTheWagner/promisary/actions)

> A growing collection of utilities to make working with Promises easier and cleaner.

---

## ✨ What is it?

`promisary` is a growing collection of promise utilities to make async JavaScript easier and cleaner.

The first utilities available are `hash` and `hashSettled`, which help you work with objects of promises.

- `hash`: Like `Promise.all`, but for objects. Rejects if any promise rejects.
- `hashSettled`: Like `Promise.allSettled`, but for objects. Always resolves with a fulfilled or rejected state.

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

### `hash`

```typescript
import { hash } from 'promisary';

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

### `hashSettled`

```typescript
import { hashSettled } from 'promisary';

async function loadDataSettled() {
  const result = await hashSettled({
    user: fetchUser(),
    posts: fetchPosts(),
  });

  console.log(result.user); // { state: 'fulfilled', value: ... }
  console.log(result.posts); // { state: 'fulfilled', value: ... } or { state: 'rejected', reason: ... }
}
```

You can safely inspect each result without worrying about rejected promises throwing errors.

---

## 🛠 Why use this?

- **Drop-in replacement for `RSVP.hash` and `RSVP.hashSettled`**.
- **No extra dependencies** besides native Promises.
- **Tiny and tree-shakable** (~300 bytes minified).
- **TypeScript ready** and fully tested.

Perfect for cleaning up older Ember.js apps or anywhere you want better Promise ergonomics.

---

## ✅ Features

- Supports plain values and promises.
- Rejects early (with `hash`) or always resolves (with `hashSettled`).
- Fully typed with TypeScript.
- Lightweight and fast.
- More Promise utilities coming soon!

---

## 📅 Roadmap

Here are some utilities planned for future releases:

- **`timeout`** — Add a timeout to any promise, rejecting if it takes too long.
- **`raceObject`** — Like `Promise.race`, but for an object of promises.
- **`delay`** — Create a promise that resolves after a specified delay.
- **More to come!**

Have ideas? [Open an issue](https://github.com/RobbieTheWagner/promisary/issues) or send a PR!

---

## 📜 License

MIT
