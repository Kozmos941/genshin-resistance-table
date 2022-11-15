<script lang="ts">
  import { image, imageForage, fileName } from '$lib/store'

  export let ModalVisibility = false

  /* Click Handler */
  async function saveAs() {
    const a = document.createElement('a')
    a.href = (await imageForage.getItem('dataURL')) as string
    a.download = $fileName
    a.click()
    ModalVisibility = false
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

{#if ModalVisibility}
  <div
    class="modal"
    on:dblclick={() => (ModalVisibility = false)}
  >
    <section on:dblclick|stopPropagation>
      <h1>保存图片</h1>
      <!-- <span class="token mobile {1 ? 'is' : null}">MOBILE</span> -->
      <span
        class="token cache"
        on:dblclick={clearCache}>CACHE</span
      >
      <article>
        <p>
          * 若发现图片与网页内容排版明显不一致，可尝试双击上面 <strong
            >CACHE</strong
          > 字样清除缓存并刷新
        </p>
        <p style="align-self: center;">
          <strong>{$fileName} ({$image.size} MB)</strong>
        </p>
      </article>
      <button
        class="btn confirm"
        on:click={saveAs}>确 定</button
      >
      <button
        class="btn cancel"
        on:click={() => (ModalVisibility = false)}
        >取 消
      </button>
    </section>
  </div>
{/if}

<style lang="postcss">
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
      'head head mobl  clr ' auto
      'text text text  text' auto
      '.    .    .     .   ' auto
      '.    .    cnfm  cncl' auto / 1fr 1fr 1fr 1fr;

    row-gap: 1rem;
    column-gap: 2rem;

    & span.token {
      align-self: center;
      font-weight: 900;
      font-size: 1.5rem;
      color: #00000066;
      user-select: none;
      text-align: center;

      &.cache {
        grid-area: clr;
        color: var(--red-accent2);
      }

      &.mobile {
        grid-area: mobl;
        text-align: end;
        &.is {
          color: var(--blue-lighten2);
        }
      }
    }

    & article {
      padding: 0 2rem;
      grid-area: text;
      width: 600px;
      font-size: 1.5rem;
      font-weight: 500;
      display: flex;
      flex-direction: column;
      gap: 2rem;

      & p {
        margin: 0;
      }

      & strong {
        color: var(--color-dark2);
        background-color: white;
        font-weight: 900;
        border-radius: 0.5rem;
        padding: 0 0.5rem;
      }
    }

    & h1 {
      margin: 0;
      grid-area: head;
      font-size: 3.5rem;
      font-weight: 900;
      align-self: center;
      user-select: none;
    }

    & button.btn {
      padding: 0.5rem;
      cursor: pointer;
      user-select: none;
      /* Font */
      font-size: 2rem;
      font-weight: 900;
      color: #ffffff;
      /* Border */
      border-width: 0;
      border-radius: 0.5rem;
      &.confirm {
        grid-area: cnfm;
        background-color: var(--blue-lighten2);
      }

      &.cancel {
        grid-area: cncl;
        background-color: var(--red-accent2);
      }
    }
  }

  div.modal {
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
</style>
