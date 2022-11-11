<script setup lang="ts">
import { throttle } from 'lodash'
import { ref, onMounted } from 'vue'
import DModal from '#/Download/DModal.vue'
import DButton from '#/Download/DButton.vue'
import GithubCorner from '#/GithubCorner.vue'
import TableView from '#/TableView.vue'
import FooterView from '#/FooterView.vue'
import { Download } from '$/classes'
import { imageForage, usePiniaStore, useImageStore } from '$/store'

/* OnMounted */
const image = useImageStore()
const pinia = usePiniaStore()

onMounted(async () => {
  const table = pinia.table as HTMLTableElement
  if (!localStorage.getItem('size')) {
    const { scale, type, quality } = image
    const download = new Download(table, { scale, type, quality })
    Object.entries(download.options).forEach(
      ([key, value]) => imageForage.setItem(key, value))
    const dataURL = await download.dataURL
    const sizeMB = 3 / 4 * dataURL.length / Math.pow(2, 20)
    image.size = sizeMB.toFixed(2)
    localStorage.setItem('size', image.size)
    imageForage.setItem('dataURL', dataURL)
    imageForage.setItem('length', dataURL.length)
  } 
  image.size = localStorage.getItem('size') as string

  const button = pinia.button as HTMLButtonElement
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
  <d-modal v-if="DModalVisibility" @close-modal="displayDModal(false)" />
  <main>
    <d-button />
    <GithubCorner url="https://github.com/Kozmos941/genshin-resistance-table" />
    <table-view />
    <footer-view />
  </main>
</template>

<style scoped lang="postcss">
main {
  width: max-content;
  position: relative;
  margin: 0 auto;
  background-color: transparent;

  & :deep(svg) {
    z-index: 9999;
  }
}
</style>
