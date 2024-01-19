<script>
import { useContactStore } from '../stores/contact.js';

export default {
    name: 'CarteContact',
    props: [
        'contact'
    ],
    data() {
        return {
            contacts: [],
        };
    },
} 
</script>

<template>
    <div class="contact-info">
        <h2>{{ contact.nom }}</h2>
        <p>- {{ contact.numero }}</p>
    </div>
</template>

<style>
    .contact-info {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .contact-info h2 {
        font-size: 20px;
    }
</style>