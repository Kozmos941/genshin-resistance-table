<script setup lang="ts">
import GithubCorner from '@/components/GithubCorner.vue'

interface Props {
  title: string
}

const { title } = defineProps<Props>()
</script>

<template>
  <caption>
    <span>{{ title }}</span>
    <GithubCorner
      url="https://github.com/Kozmos941/genshin-resistance-table" />
  </caption>
</template>

<style scoped lang="postcss">
caption {
  position: relative;
  font-family: 'Poppins', 'Noto Serif SC', serif;
  font-weight: 900;
  vertical-align: middle;
  font-size: 4rem;
  padding-left: 1.75rem;
}
</style>
