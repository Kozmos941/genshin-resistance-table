<script setup>
import { ref, onMounted } from 'vue'
import Download from '@/scripts/Download'
import { CaptionText } from '@/scripts/Config'

const size = ref('…')
const button = ref(null)

onMounted(async () => {
  const node = document.querySelector('table')

  if (localStorage.getItem('dataURL')) {
    size.value = localStorage.getItem('size')
    button.value.onclick = click
  } else {
    const dl = new Download(node)
    await dl.dataURL
    size.value = localStorage.getItem('size')
    button.value.onclick = click
  }

  function click() {
    const a = document.createElement('a')
    a.href = localStorage.getItem('dataURL')
    const ext = localStorage.getItem('type').split('/')[1]
    a.download = `${CaptionText}.${ext}`
    a.click();
  }
})

</script>

<template>
  <button ref="button">Save As Image
    <div>{{size}} MB</div>
  </button>
</template>

<style scope>
button {
  position: absolute;
  top: 1rem;
  left: 1rem;

  width: 8rem;
  height: 8rem;

  font-family: 'Poppins';
  font-weight: 700;
  font-size: 0.9em;
  color: var(--light-color);
  background-color: var(--dark-color);

  border-width: 2px;
  border-style: solid;
  border-color: var(--light-color);
  /* border-radius: 50%; */

  z-index: 9999;
}
</style>
