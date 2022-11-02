<script setup lang="ts">
const { href = '/' } = defineProps<{
  href?: string
}>()
</script>

<template>
  <a :href="href" target="_blank">
    <slot />
  </a>
</template>

<style scoped lang="postcss">
a {
  color: inherit;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    color: rgb(78 124 255);
  }
}
</style>
