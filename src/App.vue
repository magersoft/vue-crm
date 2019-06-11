<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import EmptyLayout from './layouts/EmptyLayout';
// eslint-disable-next-line import/extensions
import MainLayout from './layouts/MainLayout';

export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || 'empty') + '-layout';
    },
  },
  components: {
    EmptyLayout, MainLayout,
  },
};
</script>

<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css';
@import 'assets/index.css';
</style>
