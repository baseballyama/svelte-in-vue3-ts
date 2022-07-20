import { ref } from "vue";
import type { App } from "vue";

export const key = Symbol("count");

export function createContext(app: App) {
  const value = ref("Hello context!");
  app.provide(key, value);
}
