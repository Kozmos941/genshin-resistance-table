<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useImageStore, usePiniaStore } from '$/store'

const { size } = storeToRefs(useImageStore())
const pinia = usePiniaStore()

</script>

<template>
  <button :ref="(e) => { pinia.button = e as HTMLButtonElement }">
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
  left: 0;
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
