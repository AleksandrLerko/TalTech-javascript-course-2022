<template>
  <!-- <span v-for="item of currenciesStore.currencies">{{ item.currencyName }}</span> -->
  <span>{{currency}}</span>
</template>

<script lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { IdentityService } from '@/services/IdentityService';
import { useCurrenciesStore } from '@/stores/currencies';
import { Options, Vue } from "vue-class-component";
import { CurrencyService } from '@/services/CurrencyService';

@Options({
  components: {

  },
  props: {},
  emits: {}
})
export default class CurrencyView extends Vue {
  identityStore = new IdentityService();
  currencyService = new CurrencyService();
  currenciesStore = useCurrenciesStore();
  currency: string = "";

  async mounted(): Promise<void> {
    this.currenciesStore.$state.currencies =
      await this.currencyService.getAll();
    this.currency = this.currenciesStore.currencies[1].currencyName;
    // this.currenciesStore.convertToLangMany;
  }
}
</script>

<style>
/* .scrollMenu {
    background-color: rgb(144, 168, 179);
    overflow-x: scroll;
    white-space: nowrap;
    border-radius: 10px;
} */

.scrollMenu {
  background: #86a3bb;
  overflow: auto;
  position: sticky;
  top: 0;
  left: 0;
  padding: 15px 0;
  white-space: nowrap;
  border-radius: 20px;
}

.scrollItem {
  padding: 10px 30px;
  border-radius: 50px;
  box-shadow: 0 0 20px -10px rgba(0, 0, 0, 0.5);
  background: #FFC107;
  margin: 0 15px;
  display: inline-block;
  font-size: 1.1rem;
  cursor: pointer;
  text-align: center;
}

/* overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap; */
</style>