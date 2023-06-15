<template>
  <swisspost-internet-header
    project="test"
    environment="int01"
    language="de"
    stickyness="full"
  />

  <h1 class="visually-hidden">Swiss Post - Grid Visualization</h1>

  <main class="my-3">
    <SwissPostGrid heading="Current Implementation"/>
    <active-breakpoint class="mx-regular"/>
    <SwissPostGrid heading="Future Implementation" future/>
  </main>

</template>

<script>
import ActiveBreakpoint from './components/ActiveBreakpoint.vue';
import SwissPostGrid from './components/SwissPostGrid.vue';

export default {
  name: 'App',
  components: {
    ActiveBreakpoint,
    SwissPostGrid
  }
}
</script>

<style lang="scss">
@use '~@swisspost/design-system-styles/basics';

#app {
  min-height: 200vh;
}

hr {
  opacity: 1;
}
</style>
