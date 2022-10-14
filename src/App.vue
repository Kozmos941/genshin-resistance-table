<script setup>
import * as Config from '@config.js'
import TCaption from '@/components/TCaption.vue'
import THead from '@/components/THead.vue'
import TBody from '@/components/TBody.vue'
import TFoot from '@/components/TFoot.vue'
import Download from '@/components/Download.vue'

document.title = Config.CaptionText
</script>

<template>
  <Download ref="button" />
  <table>
    <TCaption :text="Config.CaptionText" />
    <THead :ths="Config.THeads" />
    <TBody :infty="Config.InfinitySign" :aster="Config.AsteriskSign" />
    <TFoot :colSpan="Config.THeads.length" :comment="Config.TFootComment" />
  </table>
</template>

<style>
/* width */
::-webkit-scrollbar {
  width: 0.5rem;
}

/* Track */
::-webkit-scrollbar-track {
  background: var(--color-dark);
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--color-hydro);
  border-radius: 0.5rem;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: var(--color-anemo);
}
</style>
