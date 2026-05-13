const pool = require('../config/db');

// Получить все залы
const getAllHalls = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, number, rows, seats 
      FROM "Hall" 
      ORDER BY number
    `);
    
    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (err) {
    console.error('Ошибка getAllHalls:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Создать новый зал
const createHall = async (req, res) => {
  const { number, rows, seats } = req.body;

  if (!number) {
    return res.status(400).json({
      success: false,
      message: "Номер зала обязателен"
    });
  }

  try {
    // Проверка на уникальность номера зала
    const existing = await pool.query('SELECT id FROM "Hall" WHERE number = $1', [number]);
    
    if (existing.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Зал с номером ${number} уже существует!`
      });
    }

    const result = await pool.query(`
      INSERT INTO "Hall" (number, rows, seats)
      VALUES ($1, $2, $3)
      RETURNING *
    `, [number, rows || null, seats || null]);

    res.status(201).json({
      success: true,
      message: `Зал №${number} успешно создан`,
      data: result.rows[0]
    });
  } catch (err) {
    console.error('Ошибка createHall:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Удалить зал
const deleteHall = async (req, res) => {
  const { hallId } = req.params;

  try {
    const result = await pool.query('DELETE FROM "Hall" WHERE id = $1 RETURNING *', [hallId]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Зал не найден"
      });
    }

    res.json({
      success: true,
      message: `Зал №${result.rows[0].number} успешно удалён`
    });
  } catch (err) {
    console.error('Ошибка deleteHall:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getAllHalls,
  createHall,
  deleteHall
};