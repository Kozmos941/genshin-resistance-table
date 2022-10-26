<script setup lang="ts">
import MToken from './MToken.vue'
import MButton from './MButton.vue'
import { ref } from 'vue'
import { loadWebFont } from '$/webfont'
import { imageForage, isMobile, usePiniaStore } from '$/store'
import { storeToRefs } from 'pinia'

const store = usePiniaStore()
const { size } = storeToRefs(store)
const { fileName } = store

/* Load Font */
const section = ref<HTMLElement>()
loadWebFont('Noto Sans SC', section)

/* Emit */
const emit = defineEmits<{ (e: 'closeModal'): void }>()

/* Click Handler */
async function saveAs() {
  const a = document.createElement('a')
  a.href = await imageForage.getItem('dataURL') as string
  a.download = fileName
  a.click()
  emit('closeModal')
}

/* DoubleClick to clear cache */
function clearCache() {
  if (window.confirm('清除缓存并刷新?')) {
    localStorage.clear()
    imageForage.clear()
    location.reload()
  }
}

</script>

<template>
  <div class="modal" @dblclick.prevent="emit('closeModal')">
    <section @dblclick.stop ref="section">
      <h1>保存图片</h1>
      <m-token class="mobile" :class="isMobile ? 'is' : null">MOBILE</m-token>
      <m-token class="cache" @dblclick="clearCache">CACHE</m-token>
      <article>
        <p>* 若发现图片与网页内容排版明显不一致，可尝试双击上面 <strong>CACHE</strong> 字样清除缓存并刷新</p>
        <p style="align-self: center;"><strong>{{ fileName }} ({{ size }} MB)</strong></p>
      </article>
      <m-button class="confirm" @click="saveAs()">确 定</m-button>
      <m-button class="cancel" @click="emit('closeModal')">取 消</m-button>
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
    ".    .    .     .   " auto
    ".    .    cnfm  cncl" auto / 1fr 1fr 1fr 1fr;

  row-gap: 1rem;
  column-gap: 2rem;
}

article {
  padding: 0 2rem;
  grid-area: text;
  width: 600px;
  font-size: 1.5rem;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  & strong {
    color: var(--color-dark2);
    background-color: white;
    font-weight: 900;
    border-radius: .5rem;
    padding: 0 0.5rem;
  }
}

h1 {
  grid-area: head;
  font-size: 3.5rem;
  font-weight: 900;
  align-self: center;
  user-select: none;
}

.modal {
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
  touch-action: manipulation;
}

.cache {
  grid-area: clr;
}

.mobile {
  grid-area: mobl;
}

.confirm {
  grid-area: cnfm;
}

.cancel {
  grid-area: cncl;
}
</style>
