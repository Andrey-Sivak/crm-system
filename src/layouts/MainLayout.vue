<template>
  <div>
    <loader v-if="loading" />

    <div class="app-main-layout" v-else>

      <Navbar @showHideNavbar="navbarIsOpen = !navbarIsOpen"/>

      <Sidebar v-model="navbarIsOpen" :key="locale"/>

      <main class="app-content" :class="{full: !navbarIsOpen}">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link
                class="btn-floating btn-large blue"
                to="./record"
                v-tooltip="'Создать новую запись'">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
    import Navbar from "@/components/app/Navbar";
    import Sidebar from "@/components/app/Sidebar";
    import Loader from "@/components/app/Loader";

    export default {
        name: "MainLayout",
        data() {
            return {
                navbarIsOpen: true,
                loading: true,
            }
        },
        components: {
            Navbar,
            Sidebar,
            Loader,
        },
        async mounted() {
            if ( !Object.keys( this.$store.getters.info ).length ) {
                await this.$store.dispatch('fetchInfo');
            }

            this.loading = false;
        },
        computed: {
            error() {
                return this.$store.getters.error
            },
            locale() {
                return this.$store.getters.info.locale
            }
        },
        watch: {
            error(fbError) {
                this.$error(fbError.message);
            }
        }
    }
</script>

<style scoped>

</style>