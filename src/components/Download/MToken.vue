<template>
  <span>
    <slot />
  </span>
</template>

<style scoped lang="postcss">
span {
  align-self: center;
  font-weight: 900;
  font-size: 1.5rem;
  color: #00000066;
  user-select: none;
  text-align: center;
  cursor: pointer;

  &.cache {
    color: var(--red-accent2);
  }

  &.modify {
    text-align: end;

    &.is {
      color: var(--cyan-lighten2);
    }
  }
}
</style>
