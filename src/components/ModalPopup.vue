<template>
  <div class="backdrop-confirm" @click.self="$emit('close')" @keydown.esc="$emit('close')">
    <div class="modal-custom-confirm container-md">
    <div class="close-btn" @click="$emit('close')" @keyup.enter="$emit('close')" tabindex="0">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <!-- eslint-disable-next-line -->
      <path d="M16 1.61714L14.3829 0L8 6.38286L1.61714 0L0 1.61714L6.38286 8L0 14.3829L1.61714 16L8 9.61714L14.3829 16L16 14.3829L9.61714 8L16 1.61714Z" fill="black"/>
      </svg>
    </div>
      <slot class="modal-custom-confirm__message">
        <div class="dialogue__modal">
          <p class="dialogue__modal-msg text">
          Спасибо <span class="dialogue__modal-bold">{{ data.name }}</span>
          ваш заказ №<span class="dialogue__modal-bold">{{ data.orderId }}</span>
          оформлен.
          </p>

          <p class="dialogue__modal-msg text">
            В ближайшее время мы свяжемся с вами по телефону
            <span class="dialogue__modal-bold">{{ data.tel }}</span>
             для его подтверждения.
          </p>

        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
};
</script>
<style lang="scss">
.modal-custom-confirm {
  position: relative;
  max-width: 511px;
  padding: 44px 33px 41px 33px;
  height: max-content;
  z-index: 500;
  background: #ffffff;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.backdrop-confirm {
  z-index: 1000;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(40, 40, 40, 0.40);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialogue {
  &__modal {
    margin-bottom: 2rem;
    &-msg {
      font-size: 24px!important;
      font-weight: 500;
      &:not(:last-child) {
        margin-bottom: 20px;
      }
    }
    &-bold {
      font-size: 24px;
      font-weight: 700;
    }
  }
}
.close-btn {
  width: 16px;
  height: 16px;
  position: absolute;
  top: 17px;
  right: 17px;
  cursor: pointer;
}
</style>
