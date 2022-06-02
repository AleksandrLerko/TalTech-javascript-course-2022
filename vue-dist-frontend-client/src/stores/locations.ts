// import type { ILangStr } from '@/domain/ILangStr';
import type { ILocation } from '@/domain/ILocation';
import { defineStore } from 'pinia'

export const useLocationsStore = defineStore({
  id: 'locations',
  state: () => ({
    locations: [
    ] as ILocation[],
    locationUnit: [] as ILocation[]
  }),
  getters: {
    locationCount: (state) => state.locations.length
  },
  actions: {
    add(location: ILocation) {
      this.locations.push(location);
    }
  }
})
