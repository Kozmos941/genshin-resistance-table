<script setup>
const props = defineProps({
  text: { type: String, default: '原神抗性表' },
});
</script>

<template>
  <caption>
    {{
      props.text
    }}
    <a href="https://github.com/Kozmos941/genshin-resistance-table" target="_blank">
      <img src="/GitHub.svg" alt="GitHub" /><span>Kozmos941</span>
    </a>
  </caption>
</template>

<style scoped>
caption {
  position: relative;
  font-family: 'Poppins', 'Noto Serif SC', serif;
  font-weight: 900;
  font-size: 4em;
  padding-left: 0.2em;
}

a {
  font-size: 2rem;
  position: absolute;
  display: inline-block;
  right: 3rem;
  bottom: 0.5rem;
  vertical-align: middle;
}

a img {
  width: 3.2rem;
  height: 3.2rem;
  vertical-align: middle;
  margin-right: 0.5rem;
}

a span {
  vertical-align: middle;
}
</style>
