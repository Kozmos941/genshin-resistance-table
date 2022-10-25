<script setup lang="ts">
import DModal from '#/Download/DModal.vue'
import DButton from '#/Download/DButton.vue'
import GithubCorner from '#/GithubCorner.vue'
import TView from '#/Table/TView.vue'
import { ref, onMounted } from 'vue'
import { throttle } from 'lodash'
import { Download } from '$/classes'
import { imageForage, usePiniaStore } from '$/store'
import { MAIN_WIDTH } from '$/config'

/* OnMounted */
const store = usePiniaStore()

const tViewRef = ref<InstanceType<typeof TView>>()
const dButtonRef = ref<InstanceType<typeof DButton>>()
defineExpose({ tViewRef })
onMounted(async () => {
  if (!localStorage.getItem('size')) {
    const tView = tViewRef.value as InstanceType<typeof TView>
    const table = tView.tableRef as HTMLTableElement
    const { scale, type, quality } = store
    const download = new Download(table, { scale, type, quality })
    Object.entries(download.options).forEach(
      ([key, value]) => imageForage.setItem(key, value))
    const dataURL = await download.dataURL
    const sizeMB = 3 / 4 * dataURL.length / Math.pow(2, 20)
    store.size = sizeMB.toFixed(2)
    imageForage.setItem('dataURL', dataURL)
    imageForage.setItem('length', dataURL.length)
    localStorage.setItem('size', store.size)
  } else {
    store.size = localStorage.getItem('size') as string
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
  <d-modal v-show="DModalVisibility"
    @close-modal="displayDModal(false)" />
  <main>
    <d-button ref="dButtonRef" />
    <GithubCorner url="https://github.com/Kozmos941/genshin-resistance-table" />
    <t-view ref="tViewRef" />
  </main>
</template>

<style scoped lang="postcss">
main {
  width: v-bind(MAIN_WIDTH);
  position: relative;
  margin: 0 auto;
  background-color: transparent;

  & :deep(svg) {
    z-index: 9999;
  }
}
</style>
