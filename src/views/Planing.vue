<template>

  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ this.info.bill | currency }}</h4>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!categories.length">Нет категорий</p>

    <section v-else>
      <div v-for="category in categories" :key="category.id">
        <p>
          <strong>{{category.title}}</strong>
          {{category.spend | currency }} из {{category.limit | currency }}
        </p>
        <div class="progress" v-tooltip="category.tooltip">
          <div
              class="determinate"
              :class="[category.progressColor]"
              :style="{width: `${category.progressPercent}%`}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import currencyFilter from "@/filters/currency.filter";
    export default {
        name: "Planing",
        metaInfo() {
            return {
                title: this.$title('Menu_Planning'),
            }
        },
        data() {
            return {
                loading: true,
                categories: [],
            }
        },
        computed: {
          ...mapGetters(['info']),
        },
        async mounted() {
            const records = await this.$store.dispatch('fetchRecords');
            const categories = await this.$store.dispatch('fetchCategories');

            this.categories = categories.map(cat => {
                const spend = records
                    .filter(r => r.categoryId === cat.id)
                    .filter(r => r.type === 'outcome')
                    .reduce((total, record) => {
                        return total += +record.amount;
                    }, 0);

                const percent = spend * 100 / cat.limit;
                const progressPercent = percent > 100 ? 100 : percent;

                const progressColor = percent < 60
                    ? 'green'
                    : percent < 100
                        ? 'yellow'
                        : 'red';

                const tooltipValue = cat.limit - spend;
                const tooltip = `${tooltipValue < 0 ? 'Превышение лимита на' : 'Осталось'} ${currencyFilter( Math.abs(tooltipValue) )}`;

                return {
                    ...cat,
                    progressPercent,
                    progressColor,
                    spend,
                    tooltip,
                }
            });

            this.loading = false;
        }
    }
</script>

<style scoped>

</style>