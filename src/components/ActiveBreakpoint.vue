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
    <hr>
    <div class="output">
      <p>Breakpoint: <strong>{{ newActive.key }}</strong><br/><small>(screen >= {{ newActive.value }})</small></p>
    </div>
    <div
      v-for="b, i in newBreakpoints"
      :key="b.key"
      :class="[{ 'display-none': i > 0 }, `display-${b.key}-block`, { [`display-${newBreakpoints[i + 1]?.key}-none`]: i < newBreakpoints.length - 1 }]"
      :ref="el => newBreakpointRefs.push(el)"
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
      breakpointRefs: [],
      newActive: {
        name: undefined,
        value: undefined
      },
      newBreakpoints: Object.entries(scss_variables)
        .filter(([key]) => key.startsWith('new-breakpoint'))
        .map(([key, value]) => ({ key: key.replace('new-breakpoint-', ''), value })),
      newBreakpointRefs: []
    }
  },
  mounted () {
    this.$nextTick(this.setActiveBreakpoint);
    window.addEventListener('resize', this.setActiveBreakpoint);
  },
  beforeUpdate() {
    this.currentBreakpointRefs = []
    this.newBreakpointRefs = []
  },
  beforeUnmount () {
    window.removeEventListener('resize', this.setActiveBreakpoint);
  },
  methods: {
    setActiveBreakpoint () {
      const activeIndex = this.breakpointRefs.find(el => el.offsetParent !== null)?.getAttribute('data-breakpoint-index');
      this.active = this.breakpoints[activeIndex];

      const newActiveIndex = this.newBreakpointRefs.find(el => el.offsetParent !== null)?.getAttribute('data-breakpoint-index');
      this.newActive = this.newBreakpoints[newActiveIndex];
    }
  }
}
</script>

<style lang="scss">
@use 'sass:map';
@use '~@swisspost/design-system-styles/core' as post;

$grid-breakpoints: (
  xs: map.get(post.$grid-breakpoints, 'xs'),
  sm: 540px,
  md: map.get(post.$grid-breakpoints, 'md'),
  lg: map.get(post.$grid-breakpoints, 'lg'),
  xl: map.get(post.$grid-breakpoints, 'xl'),
  xxl: map.get(post.$grid-breakpoints, 'xxl'),
);

:export {
  @each $key, $value in post.$grid-breakpoints {
    breakpoint-#{$key}: $value;
  }

  @each $key, $value in $grid-breakpoints {
    new-breakpoint-#{$key}: $value;
  }
}

@each $name, $value in $grid-breakpoints {
  @include post.media-breakpoint-up($name, $grid-breakpoints) {
    @if $name == 'xs' {
      .display-none { display: none!important; }
      .display-block { display: block!important; }
    } @else {
      .display-#{$name}-none { display: none!important; }
      .display-#{$name}-block { display: block!important; }
    }
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