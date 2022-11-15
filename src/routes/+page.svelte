<script lang="ts">
  import { onMount } from 'svelte'
  import Sider from '$lib/components/Sider.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import Button from '$lib/components/Button.svelte'
  import GitHub from '$lib/components/GitHub.svelte'
  import Table from '$lib/components/Table.svelte'
  import Footer from '$lib/components/Footer.svelte'
  import { Download } from '$lib/modules/Download'
  import { mainWidth, tHeadHeight, imageForage, image } from '$lib/store'

  /* Download */
  let ModalVisibility: boolean
  let table: HTMLTableElement
  onMount(async () => {
    if (!localStorage.getItem('size')) {
      // https://stackoverflow.com/a/65106235/15369811
      const { scale, type, quality } = $image
      const download = new Download(table, { scale, type, quality })
      Object.entries(download.options).forEach(([key, value]) =>
        imageForage.setItem(key, value)
      )
      const dataURL = await download.dataURL
      const sizeMB = ((3 / 4) * dataURL.length) / Math.pow(2, 20)
      $image.size = sizeMB.toFixed(2)
      imageForage.setItem('dataURL', dataURL)
      imageForage.setItem('length', dataURL.length)
      localStorage.setItem('size', $image.size)
    } else {
      $image.size = localStorage.getItem('size') as string
    }
  })
</script>

<Sider />

<Modal bind:ModalVisibility />

<main bind:offsetWidth={$mainWidth}>
  <Button bind:ModalVisibility />
  <GitHub />
  <Table
    bind:table
    bind:offsetHeight={$tHeadHeight}
  />
  <Footer />
</main>

<style>
  main {
    width: max-content;
    position: relative;
    margin: 0 auto;
    background-color: transparent;
  }
</style>
