<template>
  <h1 class="mx-regular">Swiss Post - Grid Visualization</h1>

  <hr>
  <SwissPostGrid heading="Current Implementation"/>
  <div style="height: 5px;"></div>
  <SwissPostGrid heading="Future Implementation" future/>
  <hr>
</template>

<script>
import SwissPostGrid from './components/SwissPostGrid.vue';

export default {
  name: 'App',
  components: {
    SwissPostGrid
  }
}
</script>

<style lang="scss">
@use '@swisspost/design-system-styles/basics';

#app {
  margin-block: 30px;
  overflow: hidden;
}

hr {
  opacity: 1;
}
</style>
