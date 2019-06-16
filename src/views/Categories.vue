<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Categories' | localize }}</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div class="row" v-else>
        <category-create
                @created="addNewCategory"
        />
        <category-update
                v-if="categories.length"
                @updated="updateCategories"
                :key="categories.length + updateCount"
                :categories="categories"
        />
        <p v-else class="center">{{ 'Not found categories' | localize }}</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate';
import CategoryUpdate from '@/components/CategoryUpdate';

export default {
  name: 'categories',
  metaInfo() {
    return {
      title: this.$title('Categories'),
    };
  },
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0,
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;
  },
  components: {
    CategoryCreate, CategoryUpdate,
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },
    updateCategories(category) {
      const idx = this.categories.findIndex(c => c.id === category.id);
      this.categories[idx].title = category.title;
      this.categories[idx].limit = category.limit;
      this.updateCount++;
    },
  },
};
</script>
