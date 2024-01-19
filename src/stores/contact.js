import { defineStore } from 'pinia'

export const useContactStore = defineStore('contact', {
  state: () => ({
    contacts: [
      {
        nom: 'Julie',
        numero : '001',
      },
      {
        nom: 'Pierre',
        numero : '000002',
      },
      {
        nom: 'Paul',
        numero : '000003',
      }
    ]
  }),
  actions: {
    addContact(contact) {
      this.contacts.push(contact);
    }
  }
})