<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{ 'Menu_Bill' | localize }}</router-link>
        <a @click.prevent class="breadcrumb">
          {{ breadcrumbs }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="{
                'red': record.type === 'outcome',
                'green': record.type === 'income',
              }">
            <div class="card-content white-text">
              <p>{{ 'Description' | localize }}: {{ record.description }}</p>
              <p>{{ 'Amount' | localize }}: {{ record.amount | currency('RUB') }}</p>
              <p>{{ 'Category' | localize }}: {{ record.categoryName }}</p>

              <small>{{ record.date | date('datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>{{ 'Not found' | localize }} id=<strong>{{ $route.params.id }}</strong></p>
  </div>
</template>

<script>
import localizeFilter from '@/filters/localize.filter';

export default {
  metaInfo() {
    return {
      title: this.$title('Menu_Bill'),
    };
  },
  name: 'detail',
  data: () => ({
    record: null,
    loading: true,
  }),
  async mounted() {
    const { id } = this.$route.params;
    const record = await this.$store.dispatch('fetchRecordById', id);
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId);

    this.record = {
      ...record,
      categoryName: category.title,
    };

    this.loading = false;
  },
  computed: {
    breadcrumbs() {
      return this.record.type === 'income' ? localizeFilter('Income') : localizeFilter('Outcome');
    },
  },
};
</script>
