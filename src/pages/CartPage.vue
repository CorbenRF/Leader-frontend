<template>
  <!-- eslint-disable -->
  <div class="cart"  v-if="this.isPageLoaded">
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
        <input  class="form__input text"
         v-imask="mask" @accept="onAccept" @complete="onComplete"
         :class="{ invalid: v$.tel.$error}" @input="(e) => {v$.tel.$touch()}"
        @focus.once="this.mask.lazy=false"
         type="text" name="tel" id="tel" placeholder="Телефон">
        <div v-if="v$.tel.$error" class="input__error">Поле заполнено неверно</div>
      </div>

      <div class="input__wrapper">
        <input v-model.number="email" class="form__input text" :class="{ invalid: v$.email.$error}" @input="(e) => v$.email.$touch()"
        type="text" name="email" id="email" placeholder="Email">
        <div v-if="v$.email.$error" class="input__error">Поле заполнено неверно</div>
      </div>

      <button type="submit" :disabled="isValidForm" class="btn form__btn" >ОФОРМИТЬ ЗАКАЗ</button>
    </form>
    </div>
    <ModalPopup v-if="modalVisible" @close="closeModal" :data="this.modalData" />
  </div>
  <div class="loader" v-else>
    <h2 class="h2">Загрузка</h2>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import {
  required, email, numeric, helpers, minLength, maxLength,
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
      telMaskedToSend: '',
      email: '',
      mask: {
        mask: '+{7}(000)-000-00-00',
        lazy: true,
        placeholderChar: '_',
      },
      modalVisible: false,
      modalData: '',
    };
  },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    const alpha = helpers.regex(/^[ЁёА-я]*$/);
    return {
      name: { required, alpha },
      tel: {
        required, numeric, minLength: minLength(11), maxLength: maxLength(11),
      },
      email: { required, email },
    };
  },
  computed: {
    isPageLoaded() {
      return !this.$store.getters.getProductsLoading;
    },
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
    getMailServerResponse() {
      return this.$store.getters.getmailServerResponse;
    },
  },
  methods: {
    showModal() {
      this.modalVisible = true;
      this.modalData = {
        name: this.name,
        tel: this.telMaskedToSend,
        orderId: '1234567',
      };
    },
    closeModal() {
      this.modalVisible = false;
      this.$router.push('/');
    },
    onAccept(e) {
      const maskRef = e.detail;
      console.log('event imask input: ', e);
      this.tel = maskRef.unmaskedValue;
      this.telMaskedToSend = maskRef.value;
      // console.log('accept', maskRef.value);
    },
    // onComplete(e) {
    //   const maskRef = e.detail;
    //   console.log('complete', maskRef.unmaskedValue);
    // },
    backOutFromCart() {
      if (this.isCartEmpty) {
        this.$router.push('/');
      }
    },
    async submitForm() {
      this.$store.dispatch('sendMail', {
        name: this.name,
        tel: this.telMaskedToSend,
        orderId: '1234567',
        email: this.email,
      })
        .then((response) => {
          console.log('mail server response is: ', response);
          if (this.getMailServerResponse) {
            if (this.getMailServerResponse.accepted.length > 0) {
              this.showModal();
              this.$store.dispatch('cleanCart');
            } else {
              alert(`${this.getMailServerResponse.rejected}`);
            }
          }
        });
    },
  },
  mounted() {
    if (this.isCartEmpty) {
      this.$router.push('/');
    }
  },
};
</script>

<style lang="scss">
  .cart {
    &__wrapper h1 {
      margin-top: 60px;
      margin-bottom: 0;
    }
    &__total {
      margin-left: auto;
      margin-bottom: 0!important;
      width: max-content;
      padding: 30px 47px 60px 0;
    }
    &__form {
      padding-top: 70px;
      padding-bottom: 46px;
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
