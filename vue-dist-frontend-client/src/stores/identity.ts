import type { IJWTResponse } from '@/domain/IJWTResponse';
// import type { IPerson } from '@/domain/IPerson'
import { defineStore } from 'pinia'
// import PersonService from '@/services/PersonService';

export const useIdentityStore = defineStore({
  id: 'identity',
  state: () => ({
    jwt: null as IJWTResponse | null
  }),
  getters: {
  },
  actions: {
  }
})
