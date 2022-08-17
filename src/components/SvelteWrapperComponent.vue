<script setup lang="ts">
import type { Ref } from "vue";
import { ref, onMounted, onUnmounted, watchEffect, inject } from "vue";
import SvelteComponent from "./SvelteComponent.svelte";
import type { WrapperProps, $on } from "./SvelteComponent.svelte";
import type { Writable } from "svelte/store";
import { writable } from "svelte/store";
import { key } from "../context";

const props: WrapperProps = defineProps<{
  count: WrapperProps["count"];
  onChangeCount: WrapperProps["onChangeCount"];
}>();

const svelteWrapper = ref<HTMLElement | null>(null);
const component: Ref<SvelteComponent | null> = ref(null);
const context: Ref<unknown> = inject(key) ?? ref();
const storeRef = ref<Writable<unknown>>(writable(context?.value));

watchEffect(() => storeRef.value?.set(context.value));
watchEffect(() => component.value?.$set(props));

const reset = () => component.value?.reset();

onMounted(() => {
  const target = svelteWrapper.value;
  if (!target) return;
  component.value = new SvelteComponent({
    target,
    props: props,
    context: new Map([[key, storeRef.value]]),
  });
  (component.value.$on as $on)("change", (event) => {
    const { type, value } = event.detail;
    if (type === "count") props.onChangeCount(value);
  });
});

onUnmounted(() => component.value?.$destroy());
</script>

<template>
  <button @click="reset">Reset Counter (call Svelte function)</button>
  <section ref="svelteWrapper"></section>
</template>

<style scoped>
.vue-world {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
