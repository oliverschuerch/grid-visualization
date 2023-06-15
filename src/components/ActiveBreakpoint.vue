<template>
  <div class="active-breakpoint">
    <div class="output">
      <p>Breakpoint: <strong>{{ active.key }}</strong><br/><small>(screen >= {{ active.value }})</small></p>
    </div>
    <div
      v-for="b, i in breakpoints"
      :key="b.key"
      :class="[{ 'd-none': i > 0 }, `d-${b.key}-block`, { [`d-${breakpoints[i + 1]?.key}-none`]: i < breakpoints.length - 1 }]"
      :ref="el => breakpointRefs.push(el)"
      :data-breakpoint-index="i"
    />
  </div>
</template>

<script>
import scss_variables from './ActiveBreakpoint.vue?vue&type=style&index=0&lang=scss&module=1';

export default {
  name: 'ActiveBreakpoint',
  data () {
    return {
      active: {
        name: undefined,
        value: undefined
      },
      breakpoints: Object.entries(scss_variables)
        .filter(([key]) => key.startsWith('breakpoint'))
        .map(([key, value]) => ({ key: key.replace('breakpoint-', ''), value })),
      breakpointRefs: []
    }
  },
  mounted () {
    this.$nextTick(this.setActiveBreakpoint);
    window.addEventListener('resize', this.setActiveBreakpoint);
  },
  beforeUpdate() {
    this.breakpointRefs = []
  },
  beforeUnmount () {
    window.removeEventListener('resize', this.setActiveBreakpoint);
  },
  methods: {
    setActiveBreakpoint () {
      const activeIndex = this.breakpointRefs.find(el => el.offsetParent !== null)?.getAttribute('data-breakpoint-index');
      this.active = this.breakpoints[activeIndex];
    }
  }
}
</script>

<style lang="scss">
@use 'sass:map';
@use '~@swisspost/design-system-styles/core' as post;

:export {
  @each $key, $value in post.$grid-breakpoints {
    breakpoint-#{$key}: $value;
  }
}

.active-breakpoint {
  margin: -1rem 0;

  .output {
    display: flex;
    justify-content: center;

    p {
      margin: 0;
      text-align: center;
      line-height: 1;
    }
  }
}

</style>