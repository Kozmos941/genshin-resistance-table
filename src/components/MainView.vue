<script setup lang="ts">
import DModal from '#/Download/DModal.vue'
import DButton from '#/Download/DButton.vue'
import GithubCorner from '#/GithubCorner.vue'
import TView from '#/Table/TView.vue'
import { ref, onMounted, inject } from 'vue'
import { throttle } from 'lodash'
import Download from '$/Download'
import { imageForage } from '$/forage'
import { TABLE_WIDTH, TABLE_CAPTION } from '$/config'

/* Inject */
import { Mobile } from '$/keys'
const isMobile = inject<boolean>(Mobile) as boolean

/* Data */
const size = ref<string>('…')
const options = {
  scale: isMobile ? 1.0 : 1.25,
  type: isMobile ? 'image/jpeg' : 'image/png',
  quality: isMobile ? 0.92 : undefined,
}

/* OnMounted */
const tViewRef = ref<InstanceType<typeof TView>>()
const dButtonRef = ref<InstanceType<typeof DButton>>()
  
onMounted(async () => {
  if (await imageForage.keys()) {
    const tView = tViewRef.value as InstanceType<typeof TView>
    const table = tView.tableRef as HTMLTableElement
    const download = new Download(table, options)
    Object.entries(download.options).forEach(([key, value]) => {
      imageForage.setItem(key, value)
    })
    const dataURL = await download.dataURL
    imageForage.setItem('dataURL', dataURL)
    imageForage.setItem('length', dataURL.length)
    const sizeMB = 3 / 4 * dataURL.length / Math.pow(2, 20)
    size.value = sizeMB.toFixed(2)
    imageForage.setItem('size', size.value)
  }
  else {
    size.value = await imageForage.getItem('size') as string
  }
  const dButton = dButtonRef.value as InstanceType<typeof DButton>
  const button = dButton.buttonRef as HTMLButtonElement
  button.addEventListener('click', throttle(
    () => { displayDModal() },
    300, { leading: true, trailing: false },
  ))
})

/* DModal */
const DModalVisibility = ref(false)
function displayDModal(visible = true) {
  DModalVisibility.value = visible
}

</script>

<template>
  <d-modal :name="TABLE_CAPTION" :size="size" :type="options.type" v-show="DModalVisibility"
    @close-modal="displayDModal(false)" />
  <main>
    <d-button :size="size" ref="dButtonRef" />
    <GithubCorner url="https://github.com/Kozmos941/genshin-resistance-table" />
    <t-view ref="tViewRef" />
  </main>
</template>

<style scoped lang="postcss">
main {
  width: v-bind('`${TABLE_WIDTH}px`');
  position: relative;
  margin: 0 auto;
  background-color: transparent;

  & :deep(svg) {
    z-index: 9999;
  }
}
</style>
