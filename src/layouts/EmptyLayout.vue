<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>

    export default {
        name: "EmptyLayout",
        computed: {
            error() {
                return this.$store.getters.error
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