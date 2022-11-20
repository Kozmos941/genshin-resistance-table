<script setup lang="ts">
import { ref } from 'vue'
import { throttle } from 'lodash'
import { storeToRefs } from 'pinia'
import MToken from '#/Download/MToken.vue'
import MButton from '#/Download/MButton.vue'
import DModify from '#/Download/DModify.vue'
import { loadWebFont } from '$/webfont'
import { imageForage, usePiniaStore, useImageStore } from '$/store'
import { Download } from '$/classes'

const image = useImageStore()
const pinia = usePiniaStore()
const { size } = storeToRefs(image)

/* Load Font */
const section = ref<HTMLElement>()
loadWebFont('Noto Sans SC', section)

/* Emit */
const emit = defineEmits<{ (e: 'closeModal'): void }>()

/* Click Handler */
async function saveAs() {
  const a = document.createElement('a')
  a.href = download.value ?
    await download.value.dataURL :
    await imageForage.getItem('dataURL') as string
  a.download = image.fileName
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

const ModifyMode = ref(false)
const download = ref<Download>()
async function getDownload(changed: boolean) {
  if (!changed) return
  const { scale, type, quality } = image
  console.log({ scale, type, quality })
  download.value = new Download(
    pinia.table as HTMLTableElement,
    { scale, type, quality },
  )
  size.value = '...'
  size.value = await download.value.getURLSize() + ''
}
const toggleModify = throttle(() => { ModifyMode.value = !ModifyMode.value }, 300, { trailing: false })

</script>

<template>
  <div class="modal" @dblclick.prevent="emit('closeModal')">
    <section @dblclick.stop ref="section">
      <h1>保存图片</h1>
      <m-token class="modify" :class="ModifyMode ? 'is' : null" @click.stop="toggleModify">
        MODIFY
      </m-token>
      <m-token class="cache" @dblclick="clearCache">CACHE</m-token>
      <article>
        <p>* 若发现图片与网页内容排版明显不一致，可尝试双击上面 <strong>CACHE</strong> 字样清除缓存并刷新。</p>
        <p>* 点击 <strong>MODIFY</strong> 亮起后可配置图片的缩放、类型和质量，再次点击应用配置。</p>
        <p style="align-self: center;"><strong>{{ image.fileName }} ({{ size }} MB)</strong></p>
      </article>
      <d-modify :mode="ModifyMode" @changed="getDownload" />
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
    "head head mod  clr " auto
    "text text text text" auto
    "modi modi modi modi" auto
    ".    .    cfm  ccl " auto / 1fr 1fr 1fr 1fr;
  row-gap: 1rem;
  column-gap: 2rem;
}

article {
  padding: 0 2rem;
  grid-area: text;
  width: 750px;
  font-size: 1.5rem;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  gap: 1rem;

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

.modify {
  grid-area: mod;
}

.confirm {
  grid-area: cfm;
}

.cancel {
  grid-area: ccl;
}
</style>
