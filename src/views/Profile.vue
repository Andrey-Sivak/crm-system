<template>
  <div>
    <div class="page-title">
      <h3>{{'ProfileTitle' | localize}}</h3>
    </div>

    <form class="form"
          @submit.prevent="submitHandler">
      <div class="input-field">
        <input
                id="description"
                type="text"
                v-model="name"
                :class="{invalid: ($v.name.$dirty && !$v.name.required) ||
                                  ($v.name.$dirty && !$v.name.minLength)}"
        >
        <label for="description">{{'Name' | localize}}</label>
        <small class="helper-text invalid" v-if="$v.name.$dirty && !$v.name.required">{{'Enter_name_message' | localize}}</small>
        <small class="helper-text invalid" v-else-if="$v.name.$dirty && !$v.name.minLength">{{'Name_must_contain' | localize}} {{ $v.name.$params.minLength.min }} {{'Symbols' | localize}}. {{'Now_it_has' | localize}} {{ name.length }} {{'Symbols' | localize}}</small>
      </div>


      <div class="switch">
        <label>
          English
          <input type="checkbox"
                 v-model="isRuLocale">
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light"
              type="submit">
        {{'Update' | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import { required, minLength } from 'vuelidate/lib/validators';

    export default {
        name: "Profile",
        metaInfo() {
            return {
                title: this.$title('ProfileTitle'),
            }
        },
        data() {
            return {
                name: '',
                isRuLocale: true,
            }
        },
        mounted() {
            this.name = this.info.name;
            this.isRuLocale = this.info.locale === 'ru-RU';
            setTimeout(() => {
                window.M.updateTextFields();
            });
        },
        validations: {
            name: {
                required,
                minLength: minLength(2),
            },
        },
        computed: {
            ...mapGetters(['info']),
        },
        methods: {
            ...mapActions(['updateInfo']),

            async submitHandler() {
                if ( this.$v.$invalid ) {
                    this.$v.$touch();
                    return false;
                }

                try {
                    await this.updateInfo({
                        name: this.name,
                        locale: this.isRuLocale ? 'ru-RU' : 'en-US',
                    })
                } catch (e) {
                    console.log(e);
                    throw e;
                }
            }
        }
    }
</script>

<style scoped>
  .switch {
    margin-bottom: 2rem;
  }
</style>