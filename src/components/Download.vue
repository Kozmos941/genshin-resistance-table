<script setup>
import { ref, onMounted } from 'vue'
import Download from '@/scripts/Download'
import { CaptionText } from '@config.js'

const size = ref('…')
const button = ref(null)

function saveAs() {
  const a = document.createElement('a')
  a.href = localStorage.getItem('dataURL')
  const ext = localStorage.getItem('type').split('/')[1]
  a.download = `${CaptionText}.${ext}`
  a.click()
}

onMounted(async () => {
  const node = document.querySelector('table')
  if (localStorage.getItem('dataURL')) {
    size.value = localStorage.getItem('size')
    button.value.onclick = saveAs
  } else {
    const dl = new Download(node)
    await dl.dataURL
    size.value = localStorage.getItem('size')
    button.value.onclick = saveAs
  }
})
</script>

<template>
  <button ref="button">
    Save As Image
    <div>{{ size }} MB</div>
  </button>
</template>

<style scope>
button {
  position: absolute;
  top: 1rem;
  left: 1rem;

  width: 5rem;
  height: 5rem;

  font-family: 'Poppins';
  font-weight: 700;
  font-size: 0.875rem;
  color: var(--light-color);
  background-color: var(--dark-color);

  border-width: 0.175rem;
  border-style: solid;
  border-color: var(--light-color);

  /* 移动端宽度小，会被 caption 盖住，导致 click 事件触发不了 */
  z-index: 999;
}
</style>
