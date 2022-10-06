<script setup>
const props = defineProps({
  text: { type: String, default: '原神抗性表' },
})
</script>

<template>
  <caption>
    <span>{{ props.text }}</span>
    <a
      target="_blank"
      href="https://github.com/Kozmos941/genshin-resistance-table">
      <img src="/GitHub.svg" alt="GitHubIcon" />Kozmos941
    </a>
  </caption>
</template>

<style scoped>
caption {
  position: relative;
  font-family: 'Poppins', 'Noto Serif SC', serif;
  font-weight: 900;
}

span {
  vertical-align: middle;
  font-size: 4rem;
  padding-left: 0.25rem;
}

a {
  vertical-align: middle;
  position: absolute;
  right: 1.75rem;
  bottom: 0.375rem;
  font-size: 1.5rem;
}

img {
  vertical-align: middle;
  display: inline-block;
  width: 2rem;
  height: 2rem;
  margin-right: 0.375rem;
}
</style>
