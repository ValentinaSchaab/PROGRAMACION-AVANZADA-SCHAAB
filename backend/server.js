import express from 'express';
import cors from 'cors';
import pg from 'pg';

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a PostgreSQL en Docker usando el servicio 'db'
const pool = new pg.Pool({
  host: process.env.DB_HOST || 'db',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'tasks_db',
});

// GET /tasks - Listar todas las tareas
app.get('/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id DESC');
    const tareasFormateadas = result.rows.map(row => ({
      id: row.id,
      proyecto: row.proyecto,
      tipoActividad: row.tipo_actividad,
      estado: row.estado,
      resumen: row.resumen,
      descripcion: row.descripcion,
      prioridad: row.prioridad,
      informador: row.informador,
      asignado: row.asignado,
      precondicion: row.precondicion,
      fechaCreacion: row.fecha_creacion ? row.fecha_creacion.toISOString().substring(0, 10) : '',
      fechaCierre: row.fecha_cierre ? row.fecha_cierre.toISOString().substring(0, 10) : '',
      sprint: row.sprint
    }));
    res.json(tareasFormateadas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /tasks - Crear nueva tarea
app.post('/tasks', async (req, res) => {
  const t = req.body;
  try {
    const query = `
      INSERT INTO tasks (proyecto, tipo_actividad, estado, resumen, descripcion, prioridad, informador, asignado, precondicion, fecha_creacion, fecha_cierre, sprint)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *;
    `;
    const values = [
      t.proyecto, t.tipoActividad || 'Task', t.estado || 'Pendiente', t.resumen,
      t.descripcion, t.prioridad || 'Media', t.informador, t.asignado,
      t.precondicion, t.fechaCreacion || new Date(), t.fechaCierre || null, t.sprint
    ];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /tasks/:id - Editar tarea existente
app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const t = req.body;
  try {
    const query = `
      UPDATE tasks SET 
        proyecto = $1, tipo_actividad = $2, estado = $3, resumen = $4, 
        descripcion = $5, prioridad = $6, informador = $7, asignado = $8, 
        precondicion = $9, fecha_creacion = $10, fecha_cierre = $11, sprint = $12
      WHERE id = $13 RETURNING *;
    `;
    const values = [
      t.proyecto, t.tipoActividad, t.estado, t.resumen,
      t.descripcion, t.prioridad, t.informador, t.asignado,
      t.precondicion, t.fechaCreacion, t.fechaCierre || null, t.sprint, id
    ];
    const result = await pool.query(query, values);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /tasks/:id - Eliminar tarea
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM tasks WHERE id = \$1 RETURNING *;', [id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend escuchando en puerto ${PORT}`));