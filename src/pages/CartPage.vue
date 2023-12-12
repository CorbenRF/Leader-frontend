<template>
  <!-- eslint-disable -->
  <div class="cart" v-if="!this.$store.getProductsLoading">
  <div class="cart__wrapper content" >
    <h1 class="h1">Корзина</h1>
    <div class="cart__content">
      <CartItem v-for="(item, index) of CartData" :key="index" :product="item"
      @deleteItem="backOutFromCart" />
      <div class="cart__total h1">
        Сумма {{ this.totalPrice }}
      </div>
    </div>

  </div>
  <div class="cart__form">
    <form class="form__wrapper" @submit.prevent="submitForm()">
      <h2 class="h2 form__title">Пожалуйста, представьтесь</h2>
      <div class="input__wrapper">
        <input v-model.trim="name" class="form__input text" :class="{ invalid: v$.name.$error }" @input="(e) => v$.name.$touch()"
        type="text" name="name" id="name" placeholder="Ваше имя">
        <div v-if="v$.name.$error" class="input__error">Поле заполнено неверно</div>
      </div>

      <div class="input__wrapper">
        <input v-model="telMasked" maxlength="17" class="form__input text"
         v-imask="mask" @accept="onAccept" @complete="onComplete"
         :class="{ invalid: v$.tel.$error}" @input="(e) => {v$.tel.$touch()}"
        type="tel" name="tel" id="tel" placeholder="Телефон">
        <div v-if="v$.tel.$error" class="input__error">Поле заполнено неверно</div>
      </div>

      <div class="input__wrapper">
        <input v-model.trim="email" class="form__input text" :class="{ invalid: v$.email.$error}" @input="(e) => v$.email.$touch()"
        type="text" name="email" id="email" placeholder="Email">
        <div v-if="v$.email.$error" class="input__error">Поле заполнено неверно</div>
      </div>

      <button type="submit" :disabled="isValidForm" class="btn form__btn" >ОФОРМИТЬ ЗАКАЗ</button>
    </form>
    </div>
    <ModalPopup v-if="modalVisible" @close="closeModal" :data="this.modalData" />
  </div>
  <h4 class="h2 loading" v-else>Загрузка</h4>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import {
  required, email, minLength, maxLength, numeric, alpha,
} from '@vuelidate/validators';
import { IMaskDirective } from 'vue-imask';
import CartItem from '@/components/CartItem.vue';
import FormatMixin from '@/mixins/formatMixin.vue';
import ModalPopup from '@/components/ModalPopup.vue';

export default {
  components: { CartItem, ModalPopup },
  mixins: [FormatMixin],
  directives: {
    imask: IMaskDirective,
  },
  data() {
    return {
      name: '',
      tel: '',
      telMasked: '',
      email: '',
      mask: {
        mask: '+{7}(000)-000-00-00',
        // lazy: false,
        maxLength: 11,
      },
      modalVisible: false,
      modalData: '',
    };
  },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      name: { required, alpha },
      tel: {
        required, minLength: minLength(11), maxLength: maxLength(11), numeric,
      },
      email: { required, email },
    };
  },
  computed: {
    CartData() {
      return this.$store.getters.getCartData;
    },
    isCartEmpty() {
      return this.$store.getters.getCartData.length <= 0;
    },
    totalPrice() {
      return this.formatPriceRu(this.$store.getters.getCartTotal);
    },
    isValidForm() {
      return this.v$.$invalid;
    },
  },
  methods: {
    showModal() {
      this.modalVisible = true;
      this.modalData = {
        name: this.name,
        tel: this.telMasked,
        orderId: '1234567',
      };
    },
    closeModal() {
      this.modalVisible = false;
      this.$store.dispatch('cleanCart');
      this.$router.push('/');
    },
    onAccept(e) {
      const maskRef = e.detail;
      this.value = maskRef.value;
      this.tel = maskRef.unmaskedValue;
      console.log('accept', maskRef.value);
    },
    onComplete(e) {
      const maskRef = e.detail;
      console.log('complete', maskRef.unmaskedValue);
    },
    backOutFromCart() {
      if (this.isCartEmpty) {
        this.$router.push('/');
      }
    },
    submitForm() {
      this.showModal();
    },
  },
};
</script>

<style lang="scss">
  .cart {
    &__total {
      margin-left: auto;
      width: max-content;
      padding: 30px 47px 60px 0;
    }
    &__form {
      padding-top: 70px;
      padding-bottom: 76px;
      background-color: #F2F5F9;
    }
  }

  .form {
    &__title {
      text-align: center;
    }
    &__wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      & > *:not(:last-child) {
        // margin-bottom: 30px;
      }
    }
  }

  .input__error {
    margin: 0;
    margin-top: 5px;
    color: #E86880;
  }

  .invalid {
    border: 1px solid #E86880!important;
  }
</style>
