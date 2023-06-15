<template>
  <h1 class="mx-regular">Swiss Post - Grid Visualization</h1>

  <hr>
  <SwissPostGrid heading="Current Implementation"/>
  <SwissPostGrid heading="Future Implementation" future/>
  <hr>

  <active-breakpoint class="mx-regular"/>
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
  margin-block: 30px;
  overflow: hidden;
}

hr {
  opacity: 1;
}
</style>
