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
