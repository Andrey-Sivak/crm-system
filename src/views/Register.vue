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
        <small class="helper-text invalid"
               v-if="$v.password.$dirty && !$v.password.required">Enter password</small>
        <small class="helper-text invalid"
               v-else-if="$v.password.$dirty && !$v.password.minLength">Password must contain more then {{ $v.password.$params.minLength.min }} symbols. Now it has {{ password.length }} symbols</small>
      </div>
      <div class="input-field">
        <input
                id="name"
                type="text"
                v-model="name"
                :class="{invalid: $v.name.$dirty && !$v.name.required}"
        >
        <label for="name">Имя</label>
        <small v-if="$v.name.$dirty && !$v.name.required"
               class="helper-text invalid">Enter your Name</small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
                class="btn waves-effect waves-light auth-submit"
                type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
    import { email, required, minLength } from 'vuelidate/lib/validators';

    export default {
        name: "Register",
        metaInfo() {
            return {
                title: this.$title('Register'),
            }
        },
        data() {
            return {
                name: '',
                password: '',
                email: '',
                agree: false,
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
            name: {
                required,
            },
            agree: {
                checked: v => v,
            }
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
                    name: this.name,
                };
                try {
                    await this.$store.dispatch('register', formData);
                    await this.$router.push('/');
                } catch (e) {
                    console.log(e);
                    throw e;
                }
            }
        }
    }
</script>

<style scoped>

</style>