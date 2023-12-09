<script>
export default {
  methods: {
    formatPriceRu(arg) {
      let formattedNum = '';
      if (arg < 10000) {
        formattedNum = `${arg} ₽`;
      } else {
        formattedNum = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 }).format(arg);
      }

      return formattedNum;
    },
  },
};
</script>
