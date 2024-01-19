import { defineStore } from 'pinia'

export const useRecentCallsStore = defineStore('recentCalls', {
  state: () => ({
    recentCalls: []
  }),
  actions: {
    addRecentCall(contact) {
      const now = new Date();
      contact.time = now.toLocaleString(); // add a time property
      this.recentCalls.push(contact);
    }
  }
})