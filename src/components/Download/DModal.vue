<script setup lang="ts">
import { ref, onMounted, onUpdated, inject } from 'vue'
import { loadGoogleWebFont, textDeduplicate } from '@/scripts/webfont'
// Inject
import { MobileKey } from '$/keys'
const isMobile = inject<boolean>(MobileKey)
// Emit
const emit = defineEmits<{
  (e: 'closeModal'): void
}>()
// Props
const { title } = defineProps<{
  title: string
}>()
// Data
interface Image {
  dataURL: string
  scale: number
  size: string
  type: string
}
const image = ref<Image>(JSON.parse(localStorage.getItem('image') as string))

// Click Handler
function saveAs(name: string) {
  console.log(image)

  const filename = name ? name : title
  const ext = image.value.type.split('/')[1]
  const a = document.createElement('a')
  a.href = image.value.dataURL
  a.download = `${filename}.${ext}`
  a.click()
  emit('closeModal')
}
// DoubleClick to clear cache
function clearCache(event: MouseEvent) {
  event.stopPropagation()
  if (window.confirm('清除缓存并刷新?')) {
    localStorage.removeItem('image')
    location.reload()
  }
}
// Load Font
const section = ref<HTMLElement | null>(null)
onMounted(() => {
  const text = (section.value as HTMLElement).innerText
  loadGoogleWebFont('Noto Sans SC', textDeduplicate(text))
})

onUpdated(() => {
  image.value = JSON.parse(localStorage.getItem('image') as string)
})
</script>

<template>
  <div class="container" @dblclick="emit('closeModal')">
    <section @dblclick="e=>{e.stopPropagation()}" ref="section">
      <h1>保存图片</h1>
      <span class="mobile" :class="isMobile?'is':null">MOBILE</span>
      <span class="cache" @dblclick="clearCache">CACHE</span>
      <article>
        <p>若发现图片与网页内容排版明显不一致，可尝试双击上面 <strong>CACHE</strong> 字样清除缓存并刷新。</p>
        <p>当前图片的大小为</p>
      </article>
      <button class="confirm" @click="saveAs('')">确 定</button>
      <button class="cancel" @click="emit('closeModal')">取 消</button>
    </section>
  </div>
</template>

<style scoped lang="postcss">
section {
  font-family: var(--font-sans);
  /* Box */
  padding: 2rem 3rem;
  background-color: var(--color-dark2);
  /* Border */
  border-style: none;
  border-radius: 2rem;
  /* Grid Layout */
  display: grid;
  grid-template:
    "head head mobl  clr " auto
    "text text text  text" auto
    ".    .    .     .   " 4rem
    ".    .    cncl  cnfm" auto / 1fr 1fr 1fr 1fr;

  row-gap: 1rem;
  column-gap: 2rem;
}

h1 {
  grid-area: head;
  font-size: 3.5rem;
  font-weight: 900;
  align-self: center;
}

span {
  align-self: center;
  font-weight: 900;
  font-size: 1.5rem;
  color: #00000066;
  user-select: none;
  text-align: center;

  &.cache {
    color: #F44336;
    grid-area: clr;
  }

  &.mobile {
    grid-area: mobl;
    text-align: end;

    &.is {
      color: var(--blue-lighten2);
    }
  }
}

article {
  padding: 0 2rem;
  grid-area: text;
  width: 600px;
  font-size: 1.5rem;
  font-weight: 500;

  & strong {
    font-weight: 900;
    border: 1px solid white;
    border-radius: .5rem;
    padding: 0 .5rem;
  }
}

button {
  padding: .5rem;
  cursor: pointer;
  /* Font */
  font-size: 2rem;
  font-weight: 900;
  color: #ffffff;
  /* Border */
  border-width: 0;
  border-radius: 0.5rem;

  &.confirm {
    grid-area: cnfm;
    background-color: var(--blue-lighten2);
  }

  &.cancel {
    grid-area: cncl;
    background-color: var(--red-accent2);
  }
}

.container {
  /* Box */
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #00000099;
  z-index: var(--zindex-modal);
  /* flex */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
