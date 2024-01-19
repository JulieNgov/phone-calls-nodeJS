<script>
import CarteContact from '@/components/CarteContact.vue'
import {useContactStore} from '../stores/contact.js'
import {useRecentCallsStore} from '../stores/recentCalls.js'
export default {
    name: 'ContactView',
    setup() {
        const contactStore = useContactStore()
        const recentCallsStore = useRecentCallsStore()
        const contacts = contactStore.contacts
        const call = (contact) => {
            recentCallsStore.addRecentCall(contact)
        }
        const deleteContact = (contact) => {
            const index = contactStore.contacts.findIndex(c => c.nom === contact.nom);
            if (index !== -1) {
                contactStore.contacts.splice(index, 1);
            }
        }
        return {
            contacts,
            call,
            deleteContact
        }
    },
    components: {
        CarteContact
    },
}
</script>

<template>
    <section class="contact-container">
        <h1>Contacts</h1>
        <div class="contact" v-for="contact in contacts" :key="contact.nom">
            <CarteContact :contact="contact" />
            <div>
                <button @click="call(contact)">Call</button>
                <button @click="deleteContact(contact)">Delete</button>
            </div>
        </div>
    </section>
</template>

<style>
.contact-container {
  width: 700px;
  padding-inline: 100px;
}

.contact {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 5px;
  border-bottom: 1px solid #ccc;
  margin: 15px 0;
}

.contact-container h1 {
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: 1.5rem;
}

.contact-container button {
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  text-decoration: none;
  color: #000;
  margin-inline: 5px;
  padding: 3px 10px;
}

.contact-container button:hover {
  background-color: #ccc;
}

.contact-container button:active {
  background-color: #aaa;
}
</style>
