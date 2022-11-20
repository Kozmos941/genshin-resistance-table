<script setup lang="ts">
import Main from '#/MainContent.vue'
import Side from '#/SideNavigation.vue'
import { TABLE_HEADS } from '$/config'
import { usePiniaStore } from '$/store'
const pinia = usePiniaStore()
/* Set Document Title */
document.title = pinia.TABLE_CAPTION
/* Set CSS element color variables */
TABLE_HEADS.filter(({ color }) => color)
  .forEach(({ key, color }) => document.documentElement.style.setProperty(`--color-${key}`, color))
</script>

<template>
  <Transition name="side">
    <Side v-show="pinia.sideVisibility" />
  </Transition>
  <Main />
</template>
