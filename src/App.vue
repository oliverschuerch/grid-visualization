<template>
  <h1>Swiss Post - Grid Visualization</h1>

  <h2>Current Implementation</h2>
  <SwissPostGrid/>

  <h2>Future Implementation</h2>
  <SwissPostGrid future/>
</template>

<script>
import SwissPostGrid from './components/SwissPostGrid.vue'

export default {
  name: 'App',
  components: {
    SwissPostGrid
  }
}
</script>

<style lang="scss">
@use '@swisspost/design-system-styles/basics';

#App {
  overflow: hidden;
}

hr {
  opacity: 1;
}
</style>
