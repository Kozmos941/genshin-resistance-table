<script setup lang="ts">
import FLink from '#/Footer/FLink.vue'

interface Link {
  value: string
  url: string
}

const { title = '', links = [] } = defineProps<{
  title?: string
  links: Link[]
}>()

</script>

<template>
  <section>
    <span>{{ title }}</span>
    <div v-if="links.length">
      <f-link v-for="(link, i) in links" :key="i" :href="link.url">{{ link.value }}</f-link>
    </div>
  </section>
</template>

<style scoped lang="postcss">
section {
  padding-left: 1rem;
  margin-left: 1rem;
  border-left: 1px solid;
  border-color: inherit;
}

span {
  color: rgb(160 174 192);
}
</style>
