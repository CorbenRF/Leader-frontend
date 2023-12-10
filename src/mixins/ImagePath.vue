<script>
import { API_BASE_URL } from '@/config';

export default {
  computed: {
    picUrl() {
      return API_BASE_URL + this.product.url;
    },
  },
};
</script>
