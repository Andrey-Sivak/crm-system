<template>
  <form class="card auth-card"
        @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
                id="email"
                type="text"
                class="validate"
                v-model.trim="email"
                :class="{invalid: ($v.email.$dirty && !$v.email.required) ||
                                  ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">Email</label>
        <small v-if="$v.email.$dirty && !$v.email.required" class="helper-text invalid">This filed is required</small>
        <small v-else-if="$v.email.$dirty && !$v.email.email" class="helper-text invalid">Enter correct email</small>
      </div>
      <div class="input-field">
        <input
                id="password"
                type="password"
                :class="{invalid: ($v.password.$dirty && !$v.password.required) ||
                                  ($v.password.$dirty && !$v.password.minLength)}"
                v-model="password"
        >
        <label for="password">Пароль</label>
        <small class="helper-text invalid" v-if="$v.password.$dirty && !$v.password.required">Enter password</small>
        <small class="helper-text invalid" v-else-if="$v.password.$dirty && !$v.password.minLength">Password must contain more then {{ $v.password.$params.minLength.min }} symbols. Now it has {{ password.length }} symbols</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
                class="btn waves-effect waves-light auth-submit"
                type="submit"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
    import { email, required, minLength } from 'vuelidate/lib/validators';
    import messages from "@/utils/messages";

    export default {
        name: "Login",
        metaInfo() {
            return {
                title: this.$title('Login'),
            }
        },
        data() {
            return {
                email: '',
                password: '',
            }
        },
        validations: {
            email: {
                email,
                required,
            },
            password: {
                required,
                minLength: minLength(10),
            },
        },
        methods: {
            async submitHandler() {
                if ( this.$v.$invalid ) {
                    this.$v.$touch();
                    return false;
                }

                const formData = {
                    email: this.email,
                    password: this.password,
                };
                
                try {
                    await this.$store.dispatch('login', formData);
                    await this.$router.push('/?message=login');
                } catch (e) {
                    console.log(e);
                    throw e;
                }
            },
        },
        mounted() {
            if (messages[this.$route.query.message]) {
                this.$message( messages[this.$route.query.message] );
            }
        }
    }
</script>

<style scoped>

</style>