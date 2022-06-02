// import type { ILangStr } from '@/domain/ILangStr';
import type { ICategory } from '@/domain/ICategory';
import { defineStore } from 'pinia'

export const useCategoriesStore = defineStore({
  id: 'categories',
  state: () => ({
    categories: [
    ] as ICategory[],
    categoryUnit: [] as ICategory[]
  }),
  getters: {
    currenciesCount: (state) => state.categories.length,
  },
  actions: {
    add(category: ICategory) {
      this.categories.push(category);
    }
  }
})
