<template>
  <swisspost-internet-header
    project="test"
    environment="int01"
    language="de"
    stickyness="full"
  />

  <h1 class="visually-hidden">Swiss Post - Grid Visualization</h1>

  <main class="my-3">
    <SwissPostGrid heading="Current Implementation" :colCount="colCount" @change="setDiffs"/>
    <active-breakpoint class="mx-regular" @change="getActiveBreakpoint"/>
    <SwissPostGrid heading="Future Implementation" :colCount="newColCount" :diffs="diffs" future/>
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
  },
  data () {
    return {
      activeBreakpoint: 'xxl',
      newActiveBreakpoint: 'xxl',
      colCounts: {
        xs: 6,
        sm: 6,
        rg: 6,
        md: 12,
        lg: 12,
        xl: 12,
        xxl: 12
      },
      diffs: null
    }
  },
  computed: {
    colCount () {
      return this.colCounts[this.activeBreakpoint];
    },
    newColCount () {
      return this.colCounts[this.newActiveBreakpoint];
    }
  },
  methods: {
    getActiveBreakpoint (data) {
      this.activeBreakpoint = data.active.key;
      this.newActiveBreakpoint = data.newActive.key;
    },
    setDiffs (data) {
      this.diffs = data;
    }
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
