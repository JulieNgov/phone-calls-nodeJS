<script>
import { computed } from 'vue';
import {useRecentCallsStore} from '../stores/recentCalls.js'
import {useContactStore} from '../stores/contact.js'

export default {
  name: 'RecentView',
  setup() {
      const recentCallsStore = useRecentCallsStore()
      const contactStore = useContactStore()
      const recentCalls = computed(() => [...recentCallsStore.recentCalls].reverse())
      const contactExists = (call) => {
          return !!contactStore.contacts.find(contact => contact.numero === call.numero);
      }
      const addToContacts = (call) => {
          if (!contactExists(call)) {
              contactStore.contacts.push({ nom: call.nom, numero: call.numero });
          }
      }
      return {
          recentCalls,
          addToContacts,
          contactExists
      }
  },
}
</script>

<template>
    <section class="recent-container">
        <h1>Recent Calls</h1>
        <div class="call" v-for="call in recentCalls" :key="call.nom">
            <p>{{ call.nom }} - {{ call.numero }}</p>
            <p>{{ call.time }}</p>
            <button id="add-contact" v-if="!contactExists(call)" @click="addToContacts(call)">Add</button>
        </div>
        <p id="no-call" v-if="recentCalls.length === 0">No recent calls</p>
    </section>
</template>

<style>

.recent-container {
  width: 700px;
  padding-inline: 100px;
}

.recent-container h1 {
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: 1.5rem;
}

.recent-container .call {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 5px;
  border-bottom: 1px solid #ccc;
  margin: 15px 0;
}

.recent-container #no-call {
  text-align: center;
  margin-top: 20px;
}

#add-contact {
  position: absolute;
  left: -70px;
  padding: 2px 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
}

@media (max-width: 800px) {
  .recent-container {
    width: 100%;
    padding-inline: 20px;
  }

  .recent-container .call {
    flex-direction: column;
    align-items: flex-start;
  }

  .recent-container #add-contact {
    position: relative;
    left: 0;
    margin-top: 10px;
  }
}
</style>

