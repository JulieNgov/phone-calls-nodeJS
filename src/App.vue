<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <section class="container">
    <nav>
        <RouterLink to="/contact">Contacts</RouterLink>
        <RouterLink to="/clavier">Keypad</RouterLink>
        <RouterLink to="/recent">Recents</RouterLink>
      </nav>

    <RouterView />
  </section>
</template>

<style>
body {
  padding-top: 50px;
}

.container {
  display: flex;
  flex-direction: column;
  margin:40px;
  align-items: center;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  padding-block: 30px;
}

nav {
  position: fixed;
  width: 100%;
  top: 20px;
  text-align: center;
}

nav a {
  margin: 0 1rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  text-decoration: none;
  color: #000;
}

nav a:hover {
  background-color: #efecec;
}
</style>
