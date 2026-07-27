<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const API_URL = 'http://localhost:3000/api/tareas'

const tareas = ref([])
const nuevoTitulo = ref('')
const cargando = ref(false)

// GET: trae todas las tareas desde el backend
async function cargarTareas() {
  cargando.value = true
  const res = await axios.get(API_URL)
  tareas.value = res.data
  cargando.value = false
}

// POST: crea una nueva tarea en el backend
async function crearTarea() {
  if (!nuevoTitulo.value.trim()) return
  await axios.post(API_URL, { titulo: nuevoTitulo.value })
  nuevoTitulo.value = ''
  await cargarTareas()
}

onMounted(cargarTareas)
</script>

<template>
  <main>
    <h1>Vue.js + Node/Express + Sequelize + SQLite</h1>
    <p class="subtitle">Demo: API REST funcional (GET / POST) con ORM</p>

    <form @submit.prevent="crearTarea" class="form">
      <input v-model="nuevoTitulo" placeholder="Nueva tarea..." />
      <button type="submit">Agregar</button>
    </form>

    <p v-if="cargando">Cargando...</p>

    <ul class="lista">
      <li v-for="t in tareas" :key="t.id">
        {{ t.titulo }}
      </li>
      <li v-if="tareas.length === 0 && !cargando" class="vacio">
        No hay tareas todavía. Agrega la primera arriba.
      </li>
    </ul>
  </main>
</template>

<style scoped>
main {
  max-width: 480px;
  margin: 3rem auto;
  font-family: system-ui, sans-serif;
  padding: 0 1rem;
}
h1 { font-size: 1.4rem; }
.subtitle { color: #666; margin-bottom: 1.5rem; }
.form { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; }
input { flex: 1; padding: 0.5rem; }
button { padding: 0.5rem 1rem; cursor: pointer; }
.lista { list-style: none; padding: 0; }
.lista li { padding: 0.6rem; border-bottom: 1px solid #eee; }
.vacio { color: #999; font-style: italic; }
</style>
