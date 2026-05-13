const pool = require('../config/db');

// Получить все сеансы
const getAllSessions = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        s.id,
        s."timeStart",
        s.date,
        f.name as "filmName",
        h.number as "hallNumber",
        s."film_id" as "filmId",
        s."hall_id" as "hallId"
      FROM "Showing" s
      JOIN "Film" f ON s."film_id" = f.id
      JOIN "Hall" h ON s."hall_id" = h.id
      ORDER BY s.date DESC, s."timeStart" DESC
    `);

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (err) {
    console.error('Ошибка getAllSessions:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Создать новый сеанс
const createSession = async (req, res) => {
  const { filmId, hallId, date, timeStart } = req.body;

  if (!filmId || !hallId || !date || !timeStart) {
    return res.status(400).json({
      success: false,
      message: "Все поля обязательны: filmId, hallId, date, timeStart"
    });
  }

  try {
    const result = await pool.query(`
      INSERT INTO "Showing" ("film_id", "hall_id", date, "timeStart")
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [filmId, hallId, date, timeStart]);

    res.status(201).json({
      success: true,
      message: "Сеанс успешно создан",
      data: result.rows[0]
    });
  } catch (err) {
    console.error('Ошибка createSession:', err.message);
    res.status(500).json({ 
      success: false, 
      message: err.message 
    });
  }
};

const deleteSession = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const result = await pool.query('DELETE FROM "Showing" WHERE id = $1 RETURNING *', [sessionId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Сеанс не найден" });
    }

    res.json({
      success: true,
      message: "Сеанс успешно удалён"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getAllSessions,
  createSession,
  deleteSession
};