<template>
  <div class="swisspost-grid" :class="{ 'is-future-implementation': future }">
    <div class="my-big bg-margin">
      <div class="container bg-padding" ref="container">
        <div class="bg-container">
          <div class="row mb-regular">
            <div v-for="col in colCount" :key="col" class="col" ref="col">
              <div class="grid-col">
                <div class="col-gutter gutter-start" :style="{ width: columnPadding }"></div>
                {{ col }}
                <div class="col-gutter gutter-end" :style="{ width: columnPadding }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-auto">
        <h3 class="h5">Container</h3>
        <pre>{{ container }}</pre>
      </div>
      <div class="col-auto">
        <h3 class="h6">Row</h3>
        <pre>{{ row }}</pre>
      </div>
      <div class="col-auto">
        <h3 class="h6">Column</h3>
        <pre>{{ column }}</pre>
      </div>
    </div>


    <hr/>
  </div>
</template>

<script>
export default {
  name: 'SwissPostGrid',
  props: {
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
        width: 0,
        maxWidth: 0,
      },
      row: {
        gap: 0,
      },
      column: {
        width: 0,
      },
      columnPadding: 0
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
      this.container.margin = containerStyles.getPropertyValue('margin-inline');
      this.container.padding = containerStyles.getPropertyValue('padding-inline');
      this.container.width = containerStyles.getPropertyValue('width');
      this.container.maxWidth = containerStyles.getPropertyValue('max-width');

      const columnStyles = this.getComputedStyleProp(this.$refs.col);
      this.row.gap = `${parseInt(columnStyles.getPropertyValue('padding-inline')) * 2}px`;
      this.column.width = columnStyles.getPropertyValue('width');
      this.columnPadding = columnStyles.getPropertyValue('padding-inline');
    }
  }
}
</script>

<style scoped lang="scss">
@use '~@swisspost/design-system-styles/core' as post;
@use '@swisspost/design-system-styles/components/grid';

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

// modify to show how future implementation would look like
.is-future-implementation {
  @include post.media-breakpoint-only(xs) {
    .container {
      // padding-inline: 12px;
    }

    .row {
      --bs-gutter-x: 12px;
    }
  }

  @include post.media-breakpoint-only(sm) {
    .container {
      // padding-inline: 16px;
    }

    .row {
      --bs-gutter-x: 12px;
    }
  }
  @include post.media-breakpoint-only(rg) {
    .container {
      // padding-inline: 32px;
    }

    .row {
      --bs-gutter-x: 12px;
    }
  }

  @include post.media-breakpoint-only(md) {
    .container {
      // padding-inline: 32px;
    }

    .row {
      --bs-gutter-x: 16px;
    }
  }

  @include post.media-breakpoint-only(lg) {
    .container {
      // padding-inline: 40px;
    }

    .row {
      --bs-gutter-x: 16px;
    }
  }

  @include post.media-breakpoint-only(xl) {
    .container {
      padding-inline: 40px;
    }

    .row {
      --bs-gutter-x: 16px;
    }
  }

  @include post.media-breakpoint-only(xxl) {
    .container {
      padding-inline: 30px;
    }

    .row {
      --bs-gutter-x: 16px;
    }
  }
}
</style>
