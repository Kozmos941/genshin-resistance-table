<script setup lang="ts">
import Main from '#/MainContent.vue'
import Side from '#/SideNavigation.vue'
import { usePiniaStore } from '$/store'
const pinia = usePiniaStore()
</script>

<template>
  <Transition name="side">
    <Side v-show="pinia.sideVisibility" />
  </Transition>
  <Main />
</template>
