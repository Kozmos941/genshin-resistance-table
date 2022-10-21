<script setup lang="ts">
import GithubCorner from '@/components/GithubCorner.vue'

const { title } = defineProps<{
  title: string
}>()

</script>

<template>
  <caption>
    <span>{{ title }}</span>
    <GithubCorner url="https://github.com/Kozmos941/genshin-resistance-table" />
  </caption>
</template>

<style scoped lang="postcss">
caption {
  /* Box */
  position: relative;
  padding-left: 1.75rem;
  /* Font */
  font-family: var(--font-serif);
  font-size: 5rem;
  font-weight: 900;
}
</style>
