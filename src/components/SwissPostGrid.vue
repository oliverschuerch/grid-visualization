<template>
  <div class="swisspost-grid" :class="{ 'is-future-implementation': future }">
    <div v-if="!future" class="container-fluid">
      <h2 class="h5 text-center">{{ heading }}</h2>
      <div class="row g-3">
        <div class="col-auto">
          <h3 class="h6 m-0">Container</h3>
          <dl class="grid-spec">
            <template v-for="(value, key) in container" :key="key">
              <dt>{{ key }}</dt>
              <div>:</div>
              <dd>
                <code>{{ value }}</code>
              </dd>
            </template>
          </dl>
        </div>
        <div class="col-auto">
          <h3 class="h6 m-0">Column</h3>
          <dl class="grid-spec">
            <template v-for="(value, key) in column" :key="key">
              <dt>{{ key }}</dt>
              <div>:</div>
              <dd>
                <code>{{ value }}</code>
              </dd>
            </template>
          </dl>
        </div>
      </div>
    </div>

    <div class="my-bigger-big bg-margin">
      <div class="container bg-padding" ref="container">
        <div class="bg-container">
          <div class="row mb-regular" ref="row">
            <div v-for="col in colCount" :key="col" class="col" ref="col">
              <div class="grid-col">
                <div
                  class="col-gutter gutter-start"
                  :style="{ width: column.padding }"
                ></div>
                {{ col }}
                <div
                  class="col-gutter gutter-end"
                  :style="{ width: column.padding }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="future" class="container-fluid">
      <h2 class="h5 text-center">{{ heading }}</h2>
      <div class="row g-3">
        <div class="col-auto">
          <h3 class="h6 m-0">Container</h3>
          <dl class="grid-spec">
            <template v-for="(value, key) in container" :key="key">
              <dt>{{ key }}</dt>
              <div>:</div>
              <dd :class="{ 'bg-danger': value !== diffs?.container[key] }">
                <code>{{ value }}</code>
              </dd>
            </template>
          </dl>
        </div>
        <div class="col-auto">
          <h3 class="h6 m-0">Column</h3>
          <dl class="grid-spec">
            <template v-for="(value, key) in column" :key="key">
              <dt>{{ key }}</dt>
              <div>:</div>
              <dd :class="{ 'bg-danger': value !== diffs?.column[key] }">
                <code>{{ value }}</code>
              </dd>
            </template>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SwissPostGrid",
  props: {
    heading: {
      type: String,
    },
    colCount: {
      type: Number,
    },
    diffs: {
      type: Object,
      default: () => ({}),
    },
    future: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      container: {
        padding: 0,
        innerWidth: 0,
        outerWidth: 0,
        maxWidth: 0,
      },
      column: {
        padding: 0,
        gap: 0,
      },
    };
  },
  mounted() {
    this.$nextTick(this.calculate);
    window.addEventListener("resize", this.calculate);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.calculate);
  },
  methods: {
    getComputedStyleProp(el) {
      return window.getComputedStyle(el);
    },
    calculate() {
      const containerStyles = this.getComputedStyleProp(this.$refs.container);
      const columnStyles = this.getComputedStyleProp(this.$refs.col);

      const containerPadding = parseInt(
        containerStyles.getPropertyValue("padding-inline")
      );
      const columnPadding = parseInt(
        columnStyles.getPropertyValue("padding-inline")
      );

      this.container.padding = `${containerPadding}px`;
      this.container.innerWidth = `${
        this.$refs.container.clientWidth - containerPadding * 2
      }px`;
      this.container.outerWidth = `${this.$refs.container.clientWidth}px`;
      this.container.maxWidth = containerStyles.getPropertyValue("max-width");

      this.column.padding = `${columnPadding}px`;
      this.column.gap = `${columnPadding * 2}px`;

      if (!this.future) {
        this.$emit("change", this.$data);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@use "sass:map";
@use "~@swisspost/design-system-styles/core" as post;
@use "~@swisspost/design-system-styles/components/grid";

.bg-margin {
  background-color: rgb(249, 204, 157);
}
.bg-padding {
  background-color: rgb(195, 222, 183);
}
.bg-container {
  background-color: rgb(160, 197, 232);
}

dt:first-letter {
  text-transform: uppercase;
}

.grid-col {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 60px;
  font-size: 12px;

  .col-gutter {
    position: absolute;
    top: -1rem;
    bottom: -1rem;
    background-color: rgba(post.$white, 0.6);

    &.gutter-start {
      right: 100%;
      border-right: 1px dashed lighten(post.$coral-bright, 15%);

      .row > :first-child & {
        display: none;
      }
    }

    &.gutter-end {
      left: 100%;
      border-left: 1px dashed lighten(post.$coral-bright, 15%);

      .row > :last-child & {
        display: none;
      }
    }
  }
}

.grid-spec {
  display: inline-grid;
  grid-template-columns: repeat(3, auto);
  column-gap: 0.5rem;
  margin: 0 0 post.$size-regular;
  line-height: 1.1;
  font-size: 12px;

  dt,
  dd {
    margin: 0 0 1px;
    padding: 1px 0;
    font-weight: post.$font-weight-normal;
  }

  dt {
    color: post.$gray-80;
  }

  dd {
    padding-inline: 3px;
    border-radius: 3px;
    font-weight: post.$font-weight-bold;
  }
}

$grid-breakpoints: (
  xs: map.get(post.$grid-breakpoints, "xs"),
  sm: 540px,
  md: map.get(post.$grid-breakpoints, "md"),
  lg: map.get(post.$grid-breakpoints, "lg"),
  xl: map.get(post.$grid-breakpoints, "xl"),
  xxl: map.get(post.$grid-breakpoints, "xxl"),
);

.is-future-implementation {
  // modify existing css to show how future implementation will look like

  @include post.media-breakpoint-only(xs, $grid-breakpoints) {
    .container {
      padding-inline: 12px;
      max-width: none !important;
    }

    .row {
      --bs-gutter-x: 12px;
    }
  }

  @include post.media-breakpoint-only(sm, $grid-breakpoints) {
    .container {
      padding-inline: 16px;
      max-width: none !important;
    }

    .row {
      --bs-gutter-x: 16px;
    }
  }
  @include post.media-breakpoint-only(md, $grid-breakpoints) {
    .container {
      padding-inline: 32px;
      max-width: none !important;
    }

    .row {
      --bs-gutter-x: 16px;
    }
  }

  @include post.media-breakpoint-only(lg, $grid-breakpoints) {
    .container {
      padding-inline: 32px;
      max-width: none !important;
    }

    .row {
      --bs-gutter-x: 16px;
    }
  }

  @include post.media-breakpoint-only(xl, $grid-breakpoints) {
    .container {
      padding-inline: 40px;
      max-width: 1280px !important;
    }

    .row {
      --bs-gutter-x: 16px;
    }
  }

  @include post.media-breakpoint-only(xxl, $grid-breakpoints) {
    .container {
      padding-inline: 120px;
      max-width: 1440px !important;
    }

    .row {
      --bs-gutter-x: 16px;
    }
  }
}
</style>
