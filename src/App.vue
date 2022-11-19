<script setup lang="ts">
import { debounce } from 'lodash'
import { ref, onMounted, computed } from 'vue'
import Main from '#/MainContent.vue'
import Side from '#/SideNavigation.vue'
import { usePiniaStore } from '$/store'
import { RACES, TABLE_HEADS } from '$/config'
const pinia = usePiniaStore()

/* Sider Visibility */
const charLength = RACES.map(({ value }) => value).join('').length + 2
const innerWidth = ref(window.innerWidth)
const innerHeight = ref(window.innerHeight)
const tableWidth = ref(0)
const SideVisibility = computed(() => {
  const isEnoughWidth = innerWidth.value >= tableWidth.value + 16 * 2
  const isEnoughHeight = innerHeight.value >= charLength * 18 * 0.75
  return isEnoughWidth && isEnoughHeight
})

/* Life Hooks */
onMounted(() => {
  tableWidth.value = pinia.TABLE_WIDTH
  /* onResize */
  window.addEventListener('resize', debounce(() => {
    innerWidth.value = window.innerWidth
    innerHeight.value = window.innerHeight
  }, 20, { 'leading': false, 'trailing': true }))

  window.addEventListener('scroll', debounce(() => {
    pinia.scrollY = (window.scrollY)
    console.log(pinia.scrollY)
  }, 200, { 'leading': false, 'trailing': true }))
})

/* Init Document */
/* Set Document Title */
document.title = pinia.TABLE_CAPTION

/* Set CSS element color variables */
TABLE_HEADS.filter(({ color }) => color)
  .forEach(({ key, color }) => document.documentElement.style.setProperty(`--color-${key}`, color))

</script>

<template>
  <Transition name="side">
    <Side v-show="SideVisibility" />
  </Transition>
  <Main />
</template>
