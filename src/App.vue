<script setup lang="ts">
import { ref } from "vue";
import SvelteWrapperComponent from "./components/SvelteWrapperComponent.vue";

const count = ref(0);

const onClick = () => (count.value += 1);
const reset = () => (count.value = 0);
const onChangeCount = (newCount: number) => (count.value  = newCount);
</script>

<template>
  <section class="vue-world">
    <h1>This is Vue3 world</h1>
    <p>count: {{ count }}</p>
    <input v-model="count" type="number" />
    <button @click="onClick">Click Me</button>
    <button @click="reset">Reset</button>
    <SvelteWrapperComponent :count="count" :onChangeCount="onChangeCount" />
  </section>
</template>

<style>
.vue-world {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.vue-world > * {
  margin: 8px 0;
}
</style>
