<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <loader v-if="loading" />

      <div class="row" v-else>

        <category-create @created="addCategory"/>

        <category-edit :categories="categories"
                       :key="categories.length + updateCount"
                       @updated="updateCategories"/>
      </div>
    </section>
  </div>
</template>

<script>
    import CategoryCreate from "../components/CategoryCreate";
    import CategoryEdit from "../components/CategoryEdit";
    import Loader from "../components/app/Loader";

    export default {
        name: "Categories",
        data() {
          return {
              categories: [],
              loading: true,
              updateCount: null,
          }
        },
        components: {
            CategoryEdit,
            CategoryCreate,
            Loader,
        },
        methods: {
            addCategory(category) {
                this.categories.push(category);
            },
            updateCategories(category) {
                const idx = this.categories.findIndex(c => c.id === category.id);
                this.categories[idx].title = category.title;
                this.categories[idx].limit = category.limit;
                this.updateCount++;
            }
        },
        async mounted() {
            this.categories = await this.$store.dispatch('fetchCategories') || [];
            this.loading = false;
        }
    }
</script>

<style scoped>

</style>