<script setup lang="ts">
import { ref, onMounted, provide } from 'vue'
import { debounce } from 'lodash'
import { MobileKey } from '$/keys'
import * as _ from '$/config'
// Components
import SiderBar from './components/SiderBar.vue'
import DButton from '@/components/Download/DButton.vue'
import DModal from '@/components/Download/DModal.vue'
import TCaption from '@/components/Table/TCaption.vue'
import THead from '@/components/Table/THead.vue'
import TBody from '@/components/Table/TBody.vue'
import TFoot from '@/components/Table/TFoot.vue'
// Set Documnet Title
document.title = _.CAPTION_TITLE
// Set CSS Color Variable
const root = document.querySelector(':root') as HTMLElement
_.THEADS.forEach(({ key, color }) => {
  if (color) root.style.setProperty(`--color-${key}`, color)
})
if (localStorage.getItem('lastUpdate') !== _.LAST_UPDATE) {
  localStorage.clear()
  localStorage.setItem('lastUpdate', _.LAST_UPDATE)
}
// Download
const isDModal = ref<boolean>(false)
function displayDModal(state = true) {
  isDModal.value = state
}
// DButton Data
const table = ref<HTMLTableElement | null>(null)
const btnLeft = ref()
// Sidebar Data
const width = ref(window.innerWidth)
const height = ref(window.innerHeight)
const scrollY = ref(window.scrollY)
const isShowSidebar = (): boolean => {
  const w = _.TABLE_WIDTH + 50
  const h = w / 2
  return width.value >= w && height.value >= h
}
// Life Hooks
onMounted(() => {
  const t = table.value as HTMLTableElement
  btnLeft.value = t.offsetLeft

  window.onresize = debounce(() => {
    btnLeft.value = t.offsetLeft
    width.value = window.innerWidth
    height.value = window.innerHeight
  }, 10, { 'leading': false, 'trailing': true })

  window.onscroll = debounce(() => {
    scrollY.value = window.scrollY
    sessionStorage.setItem('arp_scroll_position', `${window.scrollY}`)
  }, 100, { 'leading': false, 'trailing': true })

  window.onkeyup = (event: KeyboardEvent) => {
    const { key } = event
    switch (key) {
      case 'Escape':
        break
    }
  }
})
// provide
const isMobile = navigator.userAgentData
  ? navigator.userAgentData.mobile
  : !!navigator.userAgent.match(/Mobile/i)
provide(MobileKey, isMobile)
</script>

<template>
  <!-- Aside -->
  <Transition name="sidebar">
    <sider-bar v-if="isShowSidebar()" :y="scrollY" />
  </Transition>
  <!-- Download -->
  <d-button :left="btnLeft" @open-modal="displayDModal()" />
  <d-modal v-show="isDModal" :title="_.CAPTION_TITLE" @close-modal="displayDModal(false)" />
  <!-- Main Table -->
  <table ref="table">
    <t-caption :title="_.CAPTION_TITLE" />
    <t-head :ths="_.THEADS" />
    <t-body :sign="_.SIGN" :ths="_.THEADS" />
    <t-foot :col-span="_.THEADS_LENGTH" />
  </table>
  <div class="y">{{scrollY}}</div>
</template>

<style  lang="postcss">
table {
  width: v-bind('`${_.TABLE_WIDTH}px`')
}

/* https: //cn.vuejs.org/guide/built-ins/transition.html#the-transition-component */
.sidebar-enter-active,
.sidebar-leave-active {
  transition: opacity 0.5s ease;
}

.sidebar-enter-from,
.sidebar-leave-to {
  opacity: 0;
}

div.y {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  right: 0;
  bottom: 0;
  width: 5rem;
  height: 5rem;
  border: 1px solid white;
}
</style>
