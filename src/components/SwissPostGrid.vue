<template>
  <div class="swisspost-grid" :class="{ 'is-future-implementation': future }">
    <div v-if="!future" class="mx-regular">
      <h2>{{ heading }}</h2>
      <div class="row gap-3">
        <div class="col-auto">
          <h3 class="h5">Container</h3>
          <dl class="grid-spec">
            <template v-for="value, key in container" :key="key">
              <dt>{{ key }}</dt>
              <div>:</div>
              <dd><code>{{ value }}</code></dd>
            </template>
          </dl>
        </div>
        <div class="col-auto">
          <h3 class="h6">Row</h3>
          <dl class="grid-spec">
            <template v-for="value, key in row" :key="key">
              <dt>{{ key }}</dt>
              <div>:</div>
              <dd><code>{{ value }}</code></dd>
            </template>
          </dl>
        </div>
        <div class="col-auto">
          <h3 class="h6">Column</h3>
          <dl class="grid-spec">
            <template v-for="value, key in column" :key="key">
              <dt>{{ key }}</dt>
              <div>:</div>
              <dd><code>{{ value }}</code></dd>
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
                <div class="col-gutter gutter-start" :style="{ width: column.padding }"></div>
                {{ col }}
                <div class="col-gutter gutter-end" :style="{ width: column.padding }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="future" class="mx-regular">
      <h2>{{ heading }}</h2>
      <div class="row gap-3">
        <div class="col-auto">
          <h3 class="h5">Container</h3>
          <dl class="grid-spec">
            <template v-for="value, key in container" :key="key">
              <dt>{{ key }}</dt>
              <div>:</div>
              <dd><code>{{ value }}</code></dd>
            </template>
          </dl>
        </div>
        <div class="col-auto">
          <h3 class="h6">Row</h3>
          <dl class="grid-spec">
            <template v-for="value, key in row" :key="key">
              <dt>{{ key }}</dt>
              <div>:</div>
              <dd><code>{{ value }}</code></dd>
            </template>
          </dl>
        </div>
        <div class="col-auto">
          <h3 class="h6">Column</h3>
          <dl class="grid-spec">
            <template v-for="value, key in column" :key="key">
              <dt>{{ key }}</dt>
              <div>:</div>
              <dd><code>{{ value }}</code></dd>
            </template>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SwissPostGrid',
  props: {
    heading: {
      type: String
    },
    future: {
      type: Boolean,
      default: false,
    }
  },
  data () {
    return {
      colCount: 12,
      container: {
        margin: 0,
        padding: 0,
        innerWidth: 0,
        outerWidth: 0,
        maxWidth: 0,
      },
      row: {
        width: 0,
      },
      column: {
        padding: 0,
        innerWidth: 0,
        outerWidth: 0,
        gap: 0,
      }
    }
  },
  mounted () {
    this.$nextTick(this.calculate);
    window.addEventListener('resize', this.calculate);
  },
  beforeUnmount () {
    window.removeEventListener('resize', this.calculate);
  },
  methods: {
    getComputedStyleProp (el) {
      return window.getComputedStyle(el);
    },
    calculate() {
      const containerStyles = this.getComputedStyleProp(this.$refs.container);
      const columnStyles = this.getComputedStyleProp(this.$refs.col);

      const containerPadding = parseInt(containerStyles.getPropertyValue('padding-inline'));
      const columnPadding = parseInt(columnStyles.getPropertyValue('padding-inline'));

      this.container.margin = containerStyles.getPropertyValue('margin-inline');
      this.container.padding = `${containerPadding}px`;
      this.container.innerWidth = `${this.$refs.container.clientWidth - (containerPadding * 2)}px`;
      this.container.outerWidth = `${this.$refs.container.clientWidth}px`;
      this.container.maxWidth = containerStyles.getPropertyValue('max-width');

      this.row.width = `${this.$refs.row.clientWidth - (columnPadding * 2)}px`;

      this.column.padding = `${columnPadding}px`;
      this.column.innerWidth = `${this.$refs.col.clientWidth - (columnPadding * 2)}px`;
      this.column.outerWidth = `${this.$refs.col.clientWidth}px`;
      this.column.gap = `${columnPadding * 2}px`;
    }
  }
}
</script>

<style scoped lang="scss">
@use '~@swisspost/design-system-styles/core' as post;
@use '~@swisspost/design-system-styles/components/grid';

.bg-margin { background-color: rgb(249, 204, 157); }
.bg-padding { background-color: rgb(195, 222, 183); }
.bg-container { background-color: rgb(160, 197, 232); }

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
    background-color: rgba(post.$coral-bright, 0.1);

    &.gutter-start {
      right: 100%;
      border-right: 1px dashed lighten(post.$coral-bright, 15%);

      .row > :first-child & {
        width: 0!important;
      }
    }

    &.gutter-end {
      left: 100%;
      border-left: 1px dashed lighten(post.$coral-bright, 15%);

      .row > :last-child & {
        width: 0!important;
      }
    }

  }
}

.grid-spec {
  display: grid;
  grid-template-columns: repeat(3, auto);
  column-gap: 0.5rem;
  margin: 0;
  line-height: 1.1;

  dt, dd {
    margin: 0;
    font-weight: post.$font-weight-normal;
  }

  dt {
    color: post.$gray-80;
  }

  dd {
    font-weight: post.$font-weight-bold;
  }
}

.is-future-implementation {
  // modify existing css to show how future implementation will look like

  @include post.media-breakpoint-only(xs) {
    .container {
      // padding-inline: 12px;
      max-width: 1280px!important;
    }

    .row {
      --bs-gutter-x: 12px;
    }
  }

  @include post.media-breakpoint-only(sm) {
    .container {
      // padding-inline: 16px;
      max-width: 1280px!important;
    }

    .row {
      --bs-gutter-x: 12px;
    }
  }
  @include post.media-breakpoint-only(rg) {
    .container {
      // padding-inline: 32px;
      max-width: 1280px!important;
    }

    .row {
      --bs-gutter-x: 12px;
    }
  }

  @include post.media-breakpoint-only(md) {
    .container {
      // padding-inline: 32px;
      max-width: 1280px!important;
    }

    .row {
      --bs-gutter-x: 16px;
    }
  }

  @include post.media-breakpoint-only(lg) {
    .container {
      // padding-inline: 40px;
      max-width: 1280px!important;
    }

    .row {
      --bs-gutter-x: 16px;
    }
  }

  @include post.media-breakpoint-only(xl) {
    .container {
      padding-inline: 40px;
      max-width: 1280px!important;
    }

    .row {
      --bs-gutter-x: 16px;
    }
  }

  @include post.media-breakpoint-only(xxl) {
    .container {
      padding-inline: 120px;
      max-width: 1440px!important;
    }

    .row {
      --bs-gutter-x: 16px;
    }
  }
}
</style>
