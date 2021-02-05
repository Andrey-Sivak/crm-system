<template>
  <div class="col s12 m6">
    <div v-if="current">
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field" >
          <select ref="select"
                  v-model="current">
            <option v-for="category in categories"
                    :key="category.id"
                    :value="category.id">{{category.title}}</option>
          </select>
          <label>Выберите категорию</label>
        </div>

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
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
    <p class="center" v-else>Нет категорий для редактирования</p>
  </div>
</template>

<script>
    import {required, minValue} from 'vuelidate/lib/validators';

    export default {
        name: "CategoryEdit",
        props: {
          categories: {
              type: Array,
              required: true,
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
        data() {
            return {
                select: null,
                title: '',
                minVal: 100,
                current: null,
            }
        },
        methods: {
            async submitHandler() {
                if ( this.$v.$invalid ) {
                    this.$v.$touch();
                    return false;
                }

                try {
                    const categoryData = {
                        id: this.current,
                        title: this.title,
                        limit: this.minVal,
                    };

                    await this.$store.dispatch('updateCategory', categoryData);

                    this.$message('Category successfully updated');
                    this.$emit('updated', categoryData);
                } catch (e) {
                    console.log(e);
                    throw e;
                }
            }
        },
        watch: {
          current(catId) {
              const {title, limit} = this.categories.find(c => c.id === catId);
              this.title = title;
              this.minVal = limit;
          }
        },
        created() {
            if (this.categories[0]) {
                const {id, title, limit} = this.categories[0];
                this.current = id;
                this.title = title;
                this.minVal = limit;
            }
        },
        mounted() {
            this.select = window.M.FormSelect.init(this.$refs.select);
            window.M.updateTextFields();
        },
        destroyed() {
            if (this.select && this.select.destroy) {
                this.select.destroy;
            }
        }
    }
</script>

<style scoped>

</style>