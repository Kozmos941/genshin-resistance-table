<script setup lang="ts">
import SiderBar from '#/SiderBar.vue'
import MainView from '#/MainView.vue'
import FView from '#/Footer/FView.vue'
import { ref, onMounted, computed } from 'vue'
import { debounce } from 'lodash'
import { RACES } from '$/config'
/* Sidebar */
const scrollY = ref(0)
// v-show
const tableWidth = ref(1120)
const width = ref(window.innerWidth)
const height = ref(window.innerHeight)
const SideVisibility = computed(() => {
  const minWidth = tableWidth.value + 50
  const charLength = RACES.map(({ value }) => value).join('').length + 2
  const [isLandscape, isEnoughWidth, isEnoughHeight] = [
    width.value > height.value,
    width.value >= minWidth,
    height.value >= charLength * 18,
  ]
  return isLandscape && isEnoughWidth && isEnoughHeight
})

/* Life Hooks */
const mViewRef = ref<InstanceType<typeof MainView>>()
const roundY = computed(() => Math.round(window.scrollY))
onMounted(() => {
  const mView = mViewRef.value as InstanceType<typeof MainView>
  const table = mView.tViewRef?.tableRef as HTMLTableElement
  tableWidth.value = table.offsetWidth

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
    <sider-bar v-show="SideVisibility" :Y="scrollY" />
  </Transition>
  <!-- Main Table -->
  <main-view ref="mViewRef" />
  <f-view />
</template>
