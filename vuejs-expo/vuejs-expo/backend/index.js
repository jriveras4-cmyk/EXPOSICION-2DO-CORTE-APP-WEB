const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(cors());
app.use(express.json());

// --- Configuración del ORM (Sequelize) y la conexión a la BD (SQLite) ---
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite',
  logging: false
});

// --- Modelo (mapea la tabla "Tareas") ---
const Tarea = sequelize.define('Tarea', {
  titulo: { type: DataTypes.STRING, allowNull: false },
  completada: { type: DataTypes.BOOLEAN, defaultValue: false }
});

// --- Endpoint GET: lista todas las tareas ---
app.get('/api/tareas', async (req, res) => {
  try {
    const tareas = await Tarea.findAll();
    res.json(tareas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Endpoint POST: crea una nueva tarea ---
app.post('/api/tareas', async (req, res) => {
  try {
    const nueva = await Tarea.create({ titulo: req.body.titulo });
    res.status(201).json(nueva);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`API corriendo en http://localhost:${PORT}`));
});
