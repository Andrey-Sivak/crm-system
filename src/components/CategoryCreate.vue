<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
                  id="name"
                  type="text"
                  v-model="title"
                  :class="{invalid: $v.title.$dirty && !$v.title.required}"
          >
          <label for="name">Название</label>
          <span class="helper-text invalid"
                v-if="$v.title.$dirty && !$v.title.required">Введите название категории</span>
        </div>

        <div class="input-field">
          <input
                  id="limit"
                  type="number"
                  v-model.number="minVal"
                  :class="{invalid: $v.minVal.$dirty && !$v.minVal.minValue}"
          >
          <label for="limit">Лимит</label>
          <span class="helper-text invalid"
                v-if="$v.minVal.$dirty && !$v.minVal.minValue">Минимальное значение {{ $v.minVal.$params.minValue.min }}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
    import {required, minValue} from 'vuelidate/lib/validators';

    export default {
        name: "CategoryCreate",
        data() {
            return {
                title: '',
                minVal: 100
            }
        },
        validations: {
            title: {
                required,
            },
            minVal: {
                minValue: minValue(100),
            }
        },
        methods: {
            async submitHandler() {
                if ( this.$v.$invalid ) {
                    this.$v.$touch();
                    return false;
                }

                try {
                    const category = await this.$store.dispatch('createCategory', {
                        title: this.title,
                        limit: this.minVal,
                    });

                    this.title = '';
                    this.minVal = 100;
                    this.$v.$reset();

                    this.$message('Category successfully created');
                    this.$emit('created', category);
                } catch (e) {
                    console.log(e);
                    throw e;
                }
            }
        },
        mounted() {
            window.M.updateTextFields();
        }
    }
</script>

<style scoped>

</style>