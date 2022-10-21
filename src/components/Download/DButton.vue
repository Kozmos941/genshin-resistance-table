<script setup lang="ts">
import { ref, onMounted, inject } from 'vue'
import { throttle } from 'lodash'
import Download from '@/scripts/Download'
// Inject
import { MobileKey } from '$/keys'
const isMobile = inject<boolean>(MobileKey)
// Emit
const emit = defineEmits<{
  (e: 'openModal'): void
}>()
// Props
const { left = 0 } = defineProps<{
  left?: number
}>()
// Data
const size = ref<string>('…')
const button = ref<HTMLButtonElement | null>(null)
const image = ref<{ [key: string]: string }>({})

onMounted(async () => {
  const btn = button.value as HTMLButtonElement
  if (!localStorage.getItem('image')) {
    const node = document.querySelector('table') as HTMLTableElement
    const dl = new Download(node, isMobile)
    await dl.dataURL
    const json = JSON.stringify(Object.fromEntries(dl.image))
    localStorage.setItem('image', json)
  }
  image.value = JSON.parse(localStorage.getItem('image') as string)
  size.value = image.value.size
  btn.addEventListener('click', throttle(
    () => { emit('openModal') },
    300, { leading: true, trailing: false },
  ))
})
</script>

<template>
  <button ref="button">
    Save As Image
    <div>{{ size }} MB</div>
  </button>
</template>

<style scoped lang="postcss">
button {
  cursor: pointer;
  /* Box */
  position: absolute;
  top: 0;
  left: v-bind('left+"px"');
  width: 5rem;
  height: 5rem;
  margin: 0;
  border: none;
  /* Font */
  font-family: 'Poppins';
  font-weight: 800;
  font-size: 0.875rem;
  color: var(--color-dark);
  background-color: var(--color-light);
  /* To avoid be covered by caption */
  z-index: var(--zindex);
  /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
  user-select: none;
}
</style>
