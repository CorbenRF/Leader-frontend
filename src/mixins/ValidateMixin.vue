<script>
import { required, email } from '@vuelidate/validators';

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      name: { required },
      email: { required, email },
    };
  },
};
</script>
