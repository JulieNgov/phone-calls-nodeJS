<script>
import {useContactStore} from '../stores/contact.js'
import {useRecentCallsStore} from '../stores/recentCalls.js'

export default {
    name: 'ClavierView',
    data() {
        return {
            contact: {
                nom: '',
                numero: ''
            },
            errorMessage: ''
        };
    },
    methods: {
        addNumber(number) {
            this.contact.numero += number;
            this.errorMessage = '';
            this.validateInput();
        },
        validateInput() {
            this.contact.numero = this.contact.numero.replace(/\D/g, '');
            const contactStore = useContactStore();
            const contact = contactStore.contacts.find(c => c.numero === this.contact.numero);
            if (contact) {
                this.contact.nom = contact.nom;
            }
        },
        addContact(event) {
            event.preventDefault();
            if (!this.contact.numero) {
                this.errorMessage = 'Number is required';
                return;
            }
            const contactStore = useContactStore();
            const existingContact = contactStore.contacts.find(c => c.numero === this.contact.numero);
            if (!existingContact) {
                if (!this.contact.nom) {
                    this.contact.nom = 'unknown';
                }
                contactStore.contacts.push(this.contact);
                this.contact = { nom: '', numero: '' };
                this.errorMessage = '';
            } else {
                this.errorMessage = "Can't add existing number";
            }
        },
        call(event) {
            event.preventDefault();
            if (!this.contact.numero) {
                this.errorMessage = 'Number is required';
                return;
            }
            if (!this.contact.nom) {
                this.contact.nom = 'Unknown';
            }
            const recentCallsStore = useRecentCallsStore();
            recentCallsStore.addRecentCall(this.contact);
            this.contact = { nom: '', numero: '' };
        }
    }
}
</script>

<template>
    <section class="clavier-container">
        <h1>Keypad</h1>
        <p id="error" v-text="errorMessage"></p>
        <form @submit="addContact">
            <input type="text" v-model="contact.nom" name="nom" placeholder="Nom">
            <input type="text" v-model="contact.numero" @input="validateInput" name="numero" placeholder="Phone number">
            <div class="clavier-buttons">
                <button type="submit">Add number</button>
            </div>
        </form>
        <div class="keyboard-container">
            <div class="keyboard">
                <button v-for="n in 10" :key="n" @click="addNumber(n - 1)">{{ n - 1 }}</button>
                <button id="call" @click="call">Call</button>
            </div>
        </div>
    </section>
</template>

<style>

.clavier-container {
    width: 100%;
    padding-inline: 100px;
}

.clavier-container h1 {
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: 1.5rem;
  text-align: center;
}

.clavier-container form {
    display: flex;
    align-items: center;
    justify-content: center;
}

.clavier-container form input {
    margin: 0.5rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
}

.clavier-container form button {
    margin: 0.5rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
}

.keyboard-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.clavier-container .keyboard {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 10px;
    justify-items: center;
    align-items: center;
    margin-top: 2rem;
    width: 30%;
}

.clavier-container .keyboard button {
    width: 90%;
    border-radius: 0.5rem;
    font-size: 15px;
    border: 1px solid #ccc;
}

.clavier-container .keyboard button:hover {
    background-color: #ccc;
}

#call {
    grid-column: 3 / 4;
    grid-row: 4 / 5;
}

#error {
    color: red;
    padding-bottom: 10px;
    text-align: center;
}

</style>