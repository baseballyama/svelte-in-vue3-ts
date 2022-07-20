<script setup lang="ts">
import type { Ref } from "vue";
import { ref, onMounted, onUnmounted, watch, inject } from "vue";
import SvelteComponent from "./SvelteComponent.svelte";
import type { WrapperProps, $on } from "./SvelteComponent.svelte";
import type { Writable } from "svelte/store";
import { writable } from "svelte/store";
import { key } from "../context";

const svelteWrapper = ref<HTMLElement | null>(null);
let component: SvelteComponent;

const props: WrapperProps = defineProps<{
  count: WrapperProps["count"];
  onChangeCount: WrapperProps["onChangeCount"];
}>();
const context: Ref<unknown> = inject(key) ?? ref();
const storeRef = ref<Writable<unknown>>(writable(context?.value));

const reset = () => {
  component.reset();
};

onMounted(() => {
  const target = svelteWrapper.value;
  if (!target) return;
  component = new SvelteComponent({
    target,
    props: props,
    context: new Map([[key, storeRef.value]]),
  });
});

onUnmounted(() => {
  if (component) component.$destroy();
});

watch(context, () => {
  if (storeRef.value) storeRef.value.set(context.value);
});

watch(props, () => {
  if (component) component.$set(props);
});

watch(svelteWrapper, () => {
  (component.$on as $on)("change", (event) => {
    const { type, value } = event.detail;
    if (type === "count") props.onChangeCount(value);
  });
});
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
