<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import SvelteComponent from "./SvelteComponent.svelte";
import type { WrapperProps, $on } from "./SvelteComponent.svelte";

const svelteWrapper = ref<HTMLElement | null>(null);
let component: SvelteComponent;

const props: WrapperProps = defineProps<{
  count: WrapperProps["count"];
  onChangeCount: WrapperProps["onChangeCount"];
}>();

onMounted(() => {
  const target = svelteWrapper.value;
  if (!target) return;
  component = new SvelteComponent({
    target,
    props: props,
  });
});

onUnmounted(() => {
  if (component) component.$destroy();
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
  <section ref="svelteWrapper"></section>
</template>

<style scoped>
.vue-world {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
