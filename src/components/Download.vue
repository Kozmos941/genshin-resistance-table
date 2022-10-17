<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Download from '@/scripts/Download'

interface Props {
  title: string
}

const { title } = defineProps<Props>()

const size = ref<string>('…')
const button = ref<HTMLButtonElement | null>(null)
const image = ref<{ [key: string]: string }>({})

function saveAs() {
  const a = document.createElement('a')
  a.href = image.value.dataURL
  const ext = image.value.type.split('/')[1]
  a.download = `${title}.${ext}`
  a.click()
}

onMounted(async () => {
  if (!localStorage.getItem('image')) {
    const node = document.querySelector('table') as HTMLTableElement
    const dl = new Download(node)
    await dl.dataURL
    const json = JSON.stringify(Object.fromEntries(dl.image))
    localStorage.setItem('image', json)
  }
  image.value = JSON.parse(localStorage.getItem('image') as string)
  size.value = image.value.size
  button.value?.addEventListener('click', saveAs)
})
</script>

<template>
  <button ref="button">
    Save As Image
    <div>{{ size }} MB</div>
  </button>
</template>

<style scope lang="postcss">
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
