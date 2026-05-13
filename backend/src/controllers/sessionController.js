const pool = require('../config/db');

// Получить все сеансы
const getAllSessions = async (req, res) => {
  const { date, filmId } = req.query;

  let query = `
    SELECT 
      s.id,
      s.date,
      s."timeStart",
      f.name as "filmName",
      h.number as "hallNumber",
      s."film_id" as "filmId",
      s."hall_id" as "hallId"
    FROM "Showing" s
    JOIN "Film" f ON s."film_id" = f.id
    JOIN "Hall" h ON s."hall_id" = h.id
  `;

  const params = [];
  let whereAdded = false;

  if (date) {
    query += whereAdded ? " AND" : " WHERE";
    query += ` s.date = $${params.length + 1}`;
    params.push(date);
    whereAdded = true;
  }

  if (filmId) {
    query += whereAdded ? " AND" : " WHERE";
    query += ` s."film_id" = $${params.length + 1}`;
    params.push(filmId);
  }

  query += ` ORDER BY s.date, s."timeStart"`;

  try {
    const result = await pool.query(query, params);
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

const getSessionSeats = async (req, res) => {
  const { sessionId } = req.params;

  try {
    // 1. Информация о сеансе
    const sessionResult = await pool.query(`
      SELECT 
        s.id,
        s.date,
        s."timeStart",
        f.name as "filmName",
        h.id as "hallId",
        h.number as "hallNumber",
        h.rows,
        h.seats as "seatsPerRow"
      FROM "Showing" s
      JOIN "Film" f ON s."film_id" = f.id
      JOIN "Hall" h ON s."hall_id" = h.id
      WHERE s.id = $1
    `, [sessionId]);

    if (sessionResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Сеанс не найден" });
    }

    const session = sessionResult.rows[0];

    // 2. Получаем все занятые места для этого сеанса
    const reservedResult = await pool.query(`
      SELECT seat_id 
      FROM "Reservation" 
      WHERE "showing_id" = $1
    `, [sessionId]);

    const reservedSeats = new Set(reservedResult.rows.map(r => r.seat_id));

    // 3. Генерируем все места зала
    const seats = [];
    for (let row = 1; row <= session.rows; row++) {
      for (let num = 1; num <= session.seatsPerRow; num++) {
        const seatId = `${row}-${num}`;
        seats.push({
          id: seatId,
          row: row,
          number: num,
          status: reservedSeats.has(seatId) ? 'taken' : 'available'
        });
      }
    }

    res.json({
      success: true,
      session: session,
      seats: seats
    });
  } catch (err) {
    console.error('Ошибка getSessionSeats:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getAllSessions,
  createSession,
  deleteSession,
  getSessionSeats
};