// import type { ILangStr } from '@/domain/ILangStr';
import type { ICurrency } from '@/domain/ICurrency';
import { defineStore } from 'pinia'

export const useCurrenciesStore = defineStore({
  id: 'currencies',
  state: () => ({
    currencies: [
    ] as ICurrency[],
    currencyUnit: [] as ICurrency[]
  }),
  getters: {
    currenciesCount: (state) => state.currencies.length,
  },
  actions: {
    add(currency: ICurrency) {
      this.currencies.push(currency);
    }
  }
})
