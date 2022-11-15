<script setup lang="ts">
import { throttle } from 'lodash'
import { ref, onMounted } from 'vue'
import DModal from '#/Download/DModal.vue'
import DButton from '#/Download/DButton.vue'
import GithubCorner from '#/GithubCorner.vue'
import TableView from '#/TableView.vue'
import FooterView from '#/FooterView.vue'
import { setImageForage, usePiniaStore, useImageStore } from '$/store'

/* OnMounted */
const image = useImageStore()
const pinia = usePiniaStore()

onMounted(async () => {
  const table = pinia.table as HTMLTableElement
  await setImageForage(table)

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
    <GithubCorner />
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
