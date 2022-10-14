<script setup>
import GithubCorner from '@/components/GithubCorner.vue'

const props = defineProps({
  text: { type: String, default: '原神抗性表' },
})

const githubParams = {
  url: 'https://github.com/Kozmos941/genshin-resistance-table',
}
</script>

<template>
  <caption>
    <span>{{ props.text }}</span>
    <GithubCorner v-bind="githubParams" />
  </caption>
</template>

<style scoped>
caption {
  position: relative;
  font-family: 'Poppins', 'Noto Serif SC', serif;
  font-weight: 900;
  vertical-align: middle;
  font-size: 4rem;
  padding-left: 1.75rem;
}
</style>
