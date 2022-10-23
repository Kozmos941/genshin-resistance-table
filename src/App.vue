<script setup lang="ts">
import SiderBar from '#/SiderBar.vue'
import MainView from '#/MainView.vue'
import { ref, onMounted, computed } from 'vue'
import { debounce } from 'lodash'
import { TABLE_WIDTH } from '$/config'
/* Sidebar */
const scrollY = ref(0)
// v-show
const width = ref(window.innerWidth)
const height = ref(window.innerHeight)
const SideVisibility = computed(() => {
  const w = TABLE_WIDTH + 50
  return width.value >= w && height.value >= w / 2
})

/* Life Hooks */
const roundY = computed(() => Math.round(window.scrollY))
onMounted(() => {
  /* onResize */
  window.addEventListener('resize', debounce(() => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }, 20, { 'leading': false, 'trailing': true }))

  /* onScroll */
  window.addEventListener('scroll', debounce(() => {
    scrollY.value = roundY.value
    sessionStorage.setItem('scrollY', `${scrollY.value}`)
  }, 100, { 'leading': false, 'trailing': true }))
})

</script>

<template>
  <!-- Aside -->
  <Transition name="sidebar">
    <sider-bar v-if="SideVisibility" :Y="scrollY" />
  </Transition>
  <!-- Main Table -->
  <main-view />
</template>
