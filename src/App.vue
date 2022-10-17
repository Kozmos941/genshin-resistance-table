<script setup lang="ts">
import Download from '@/components/DownloadButton.vue'
import TCaption from '@/components/TCaption.vue'
import THead from '@/components/THead.vue'
import TBody from '@/components/TBody.vue'
import TFoot from '@/components/TFoot.vue'
import * as _ from '$config'
document.title = _.CAPTION_TITLE
</script>

<template>
  <download :title="_.CAPTION_TITLE" />
  <table>
    <t-caption :title="_.CAPTION_TITLE" />
    <t-head :ths="_.THEADS" />
    <t-body :sign="_.SIGN" :ths="_.THEADS" />
    <t-foot :col-span="_.THEADS_LENGTH" :comments="_.TFOOT_COMMENTS" />
  </table>
</template>
