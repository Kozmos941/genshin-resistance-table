<script setup lang="ts">
import DModal from '#/Download/DModal.vue'
import DButton from '#/Download/DButton.vue'
import GithubCorner from '#/GithubCorner.vue'
import TView from '#/Table/TView.vue'
import { ref, onMounted, computed } from 'vue'
import { throttle } from 'lodash'
import { Download } from '$/classes'
import { imageForage, fileOptions } from '$/store'
import { TABLE_WIDTH } from '$/config'

/* OnMounted */
const tViewRef = ref<InstanceType<typeof TView>>()
const dButtonRef = ref<InstanceType<typeof DButton>>()

onMounted(async () => {
  if (await imageForage.keys()) {
    const tView = tViewRef.value as InstanceType<typeof TView>
    const table = tView.tableRef as HTMLTableElement
    const download = new Download(table, fileOptions)
    Object.entries(download.options).forEach(
      ([key, value]) => imageForage.setItem(key, value))
    const dataURL = await download.dataURL
    const sizeMB = 3 / 4 * dataURL.length / Math.pow(2, 20)
    fileOptions.size = sizeMB.toFixed(2)
    imageForage.setItem('dataURL', dataURL)
    imageForage.setItem('length', dataURL.length)
    imageForage.setItem('size', fileOptions.size)
  }
  else {
    fileOptions.size = await imageForage.getItem('size') as string
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

const getWidth = computed(() => {
  if (isNaN(TABLE_WIDTH))
    return TABLE_WIDTH + ''
  else return TABLE_WIDTH + 'px'
})

</script>

<template>
  <d-modal :name="fileOptions.name" :size="fileOptions.size" :type="fileOptions.type" v-show="DModalVisibility"
    @close-modal="displayDModal(false)" />
  <main>
    <d-button :size="fileOptions.size" ref="dButtonRef" />
    <GithubCorner url="https://github.com/Kozmos941/genshin-resistance-table" />
    <t-view ref="tViewRef" :width='getWidth' />
  </main>
</template>

<style scoped lang="postcss">
main {
  width: v-bind(getWidth);
  position: relative;
  margin: 0 auto;
  background-color: transparent;

  & :deep(svg) {
    z-index: 9999;
  }
}
</style>
