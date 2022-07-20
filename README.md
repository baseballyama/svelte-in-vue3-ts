# svelte-in-vue3-ts

This repository was created based on [svelte-in-react-ts](https://github.com/baseballyama/svelte-in-react-ts).

DEMO: https://baseballyama.github.io/svelte-in-vue3-ts/

This repository supported below features.

- Reactive props between Vue3 and Svelte / Two-way data binding
- Reactive context between Vue3 and Svelte
- Calling Svelte functions from Vue3

## Setup

```
# should select TypeScript.
npm init vue@latest
npm i
npm install --save
npm install -D svelte svelte-preprocess @sveltejs/vite-plugin-svelte
curl https://raw.githubusercontent.com/sveltejs/language-tools/master/packages/svelte2tsx/svelte-shims.d.ts > ./src/svelte-shims.d.ts
```
