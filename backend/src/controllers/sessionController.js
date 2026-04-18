const pool = require('../config/db');

// Получить все сеансы
const getAllSessions = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        s.id,
        s.date,
        s.time,
        s."film_id" as "filmId",
        s."hall_id" as "hallId",
        f.name as "filmName",
        h.name as "hallName"
      FROM "Showing" s
      JOIN "Film" f ON s."film_id" = f.id
      JOIN "Hall" h ON s."hall_id" = h.id
      ORDER BY s.date, s.time
    `);

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (err) {
    console.error('Ошибка getAllSessions:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Создать новый сеанс
const createSession = async (req, res) => {
  const { filmId, hallId, date, time } = req.body;

  if (!filmId || !hallId || !date || !time) {
    return res.status(400).json({
      success: false,
      message: "Все поля обязательны: filmId, hallId, date, time"
    });
  }

  try {
    const result = await pool.query(`
      INSERT INTO "Showing" ("film_id", "hall_id", date, time)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [filmId, hallId, date, time]);

    res.status(201).json({
      success: true,
      message: "Сеанс успешно создан",
      data: result.rows[0]
    });
  } catch (err) {
    console.error('Ошибка createSession:', err);
    res.status(500).json({ 
      success: false, 
      message: err.message 
    });
  }
};

module.exports = {
  getAllSessions,
  createSession
};