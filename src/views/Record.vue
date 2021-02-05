<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <loader v-if="loading"/>

    <p v-else-if="!categories.length">Категорий пока нет
      <router-link to="/categories">Создать категорию</router-link>
    </p>

    <form class="form"
          v-else
          @submit.prevent="submitHandler">
      <div class="input-field" >
        <select ref="select" v-model="category">
          <option v-for="category in categories"
                  :key="category.id"
                  :value="category.id">{{category.title}}</option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input
                  class="with-gap"
                  name="type"
                  type="radio"
                  value="income"
                  v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
                  class="with-gap"
                  name="type"
                  type="radio"
                  value="outcome"
                  v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
                id="amount"
                type="number"
                v-model.number="amount"
                :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
        >
        <label for="amount">Сумма</label>
        <span class="helper-text invalid"
              v-if="$v.amount.$dirty && !$v.amount.minValue">Минимальное значение {{ $v.amount.$params.minValue.min }}</span>
      </div>

      <div class="input-field">
        <input
                id="description"
                type="text"
                v-model="description"
                :class="{invalid: $v.description.$dirty && !$v.description.required}"
        >
        <label for="description">Описание</label>
        <span class="helper-text invalid"
              v-if="$v.description.$dirty && !$v.description.required">Это обязательное поле</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
    import {required, minValue} from 'vuelidate/lib/validators';
    import {mapGetters} from 'vuex';

    export default {
        name: "Record",
        data() {
            return {
                select: null,
                loading: true,
                categories: [],
                category: null,
                type: 'outcome',
                amount: 1,
                description: '',
            }
        },
        computed: {
            ...mapGetters(['info']),
            canCreateRecord() {
                if (this.type === 'income') {
                    return true;
                }

                return this.info.bill >= this.amount;
            }
        },
        methods: {
            async submitHandler() {
                if ( this.$v.$invalid ) {
                    this.$v.$touch();
                    return false;
                }

                if (this.canCreateRecord) {
                    try {
                        await this.$store.dispatch('creatRecord', {
                            categoryId: this.category,
                            amount: this.amount,
                            date: new Date().toJSON(),
                            description: this.description,
                            type: this.type
                        });

                        const bill = this.type === 'income'
                            ? this.info.bill + this.amount
                            : this.info.bill - this.amount;

                        await this.$store.dispatch('updateInfo', {bill});
                        this.$message('Запись успешно создана');
                        this.$v.$reset();
                        this.amount = 1;
                        this.description = '';
                    } catch (e) {
                        console.log(e);
                        throw e;
                    }
                } else {
                    this.$message(`Недостаточно средств на счете (${this.amount - this.info.bill})`);
                }
            }
        },
        validations: {
            amount: {
                minValue: minValue(1),
            },
            description: {
                required,
            },
        },
        async mounted() {
            this.categories = await this.$store.dispatch('fetchCategories');
            this.loading = false;

            if (this.categories.length) {
                this.category = this.categories[0].id;
            }

            setTimeout( () => {
                this.select = window.M.FormSelect.init(this.$refs.select);
                window.M.updateTextFields();
            }, 0);
            
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