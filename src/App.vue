<script setup>
import * as Config from '@/scripts/Config.js';
import TCaption from '@/comps/TCaption.vue';
import THead from '@/comps/THead.vue';
import TBody from '@/comps/TBody.vue';
import TFoot from '@/comps/TFoot.vue';
import Download from './comps/Download.vue';
document.title = Config.CaptionText;
</script>

<template>
  <table>
    <TCaption :text="Config.CaptionText" />
    <THead :ths="Config.THeads" />
    <TBody :infty="Config.InfinitySign" :aster="Config.AsteriskSign" />
    <TFoot :colSpan="Config.THeads.length" :comment="Config.TFootComment" />
  </table>
  <Download ref="button" />
</template>

<style>
table {
  min-width: max-content;
  margin: 0 auto;
  padding: 2em;
  text-align: center;
  background-color: var(--dark-color);
  border-collapse: collapse;
  width: 1160;
}
</style>
