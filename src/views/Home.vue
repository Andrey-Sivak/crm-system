<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading"/>

    <div v-else class="row">

      <home-bill
        :rates="currency.rates"
      />

      <home-currency
        :rates="currency.rates"
        :date="currency.date"
      />

    </div>
  </div>
</template>

<script>
import HomeBill from "../components/HomeBill";
import HomeCurrency from "../components/HomeCurrency";
import messages from "@/utils/messages";

export default {
  name: 'Home',
  metaInfo() {
      return {
          title: this.$title('Menu_Bill'),
      }
  },
  data() {
      return {
          loading: true,
          currency: null,
      }
  },
  components: {
      HomeBill,
      HomeCurrency,
  },
  async mounted() {
      if (messages[this.$route.query.message]) {
          this.$message( messages[this.$route.query.message] );
      }

      this.currency = await this.$store.dispatch('fetchCurrency');
      this.loading = false;
  },
  methods: {
      async refresh() {
          this.loading = true;
          this.currency = await this.$store.dispatch('fetchCurrency');
          this.loading = false;
      }
  }
}
</script>
