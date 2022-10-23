<template>
  <button>
    <slot />
  </button>
</template>

<style scoped lang="postcss">
button {
  padding: .5rem;
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
    background-color: var(--blue-lighten2);
  }

  &.cancel {
    background-color: var(--red-accent2);
  }
}
</style>
