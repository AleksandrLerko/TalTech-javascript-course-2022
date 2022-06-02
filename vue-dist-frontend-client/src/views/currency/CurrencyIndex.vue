<template>


  <h1>Currencies</h1>

  <p>
    <template v-if="identityStore.identityStore.jwt">
      <div>User exists!</div>
    </template>
    <template v-else>
      <div>No user :(</div>
    </template>
    <RouterLink to="/currencies/create">Create new</RouterLink>
  </p>
  <table class="table">
    <thead>
      <tr>
        <th>
          Currency name
        </th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item of currenciesStore.currencies" :key="item.id">
        <td>
          {{ item.currencyName }}
        </td>
        <td>
          <RouterLink :to="{ name: 'currenciesedit', params: { id: item.id } }">Edit</RouterLink> |
          <RouterLink :to="{ name: 'currenciesdelete', params: { id: item.id } }">Delete</RouterLink>
        </td>
      </tr>
    </tbody>
  </table>
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
export default class CurrencyIndex extends Vue {
  identityStore = new IdentityService();
  currencyService = new CurrencyService();
  currenciesStore = useCurrenciesStore();

  async mounted(): Promise<void> {
    this.currenciesStore.$state.currencies =
      await this.currencyService.getAll();
    this.currenciesStore.convertToLangMany;
  }
}
</script>