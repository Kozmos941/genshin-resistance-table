<script setup lang="ts">
import { reactive, onBeforeUpdate } from 'vue'
import { useImageStore } from '$/store'

const { mode = false } = defineProps<{
  mode: boolean
}>()

const emit = defineEmits<{
  (e: 'changed', changed: boolean): void
}>()
const image = useImageStore()

const modified = reactive({
  scale: image.scale,
  type: image.type,
  quality: image.quality ?? 0.92,
  isPng() {
    return this.type === 'image/png'
  },
})

onBeforeUpdate(() => {
  if (mode) return
  let isChanged = false
  if (modified.scale !== image.scale) {
    image.scale = modified.scale
    isChanged = true
  }
  if (modified.type !== image.type) {
    image.type = modified.type
    isChanged = true
  }
  if (modified.isPng()) image.quality = undefined
  else if (modified.quality !== image.quality) {
    image.quality = modified.quality
    isChanged = true
  }
  return emit('changed', isChanged)
})

// watchEffect(async () => {})
</script>

<template>
  <div class="form">
    <div class="type">
      <label for="type">Type</label>
      <select name="type" v-model="modified.type" :disabled="!mode">
        <option value="image/png">PNG</option>
        <option value="image/jpeg">JPEG</option>
        <option value="image/webp">WEBP</option>
      </select>
    </div>

    <div class="quality">
      <label for="quality">Quality</label>
      <input name="quality" type="range" min="0" max="1" step="0.01" v-model.number="modified.quality"
        :disabled="!mode || modified.isPng()">
      <output name="quality">{{ modified.isPng() ? 'NaN' : modified.quality.toFixed(2) }}</output>
    </div>

    <div class="scale">
      <label for="scale">Scale</label>
      <input name="scale" type="range" min="1" max="3" step="0.05" v-model.number="modified.scale" :disabled="!mode">
      <output name="quality">{{ modified.scale.toFixed(2) }}</output>
    </div>
  </div>
</template>

<style scoped lang="postcss">
div.form {
  grid-area: modi;
  display: grid;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  justify-content: space-around;
  font-family: var(--font-sans);
  font-size: 1.25rem;
  font-weight: 900;
  color: var(--color-light);
  background-color: var(--color-dark2);
  grid-template:
    "type qual" auto
    "scal scal" auto / auto 1fr;

  &>div {
    display: flex;
    flex-wrap: nowrap;

    &.quality {
      grid-area: qual;
    }

    &.scale {
      grid-area: scal;
    }

    &.type {
      grid-area: type;
    }

    &>input {
      flex-grow: 1;
    }

    & label {
      user-select: none;
      color: var(--color-dark2);
      background-color: white;
      font-weight: 900;
      border-radius: .5rem;
      padding: 0 0.5rem;
    }

    & input,
    & select {
      width: min-content;
      font-size: inherit;
      font-weight: inherit;
      color: inherit;
      background-color: inherit;
      outline: none;
      border: none;
      text-align: center;

      &:disabled {
        cursor: not-allowed;
      }
    }

    & option {
      font-size: inherit;
      font-weight: inherit;
      color: var(--color-light);
      background-color: var(--color-dark2);
    }

    & output {
      width: 3rem;
      text-align: end;
      font-weight: inherit;
    }
  }
}

</style>
