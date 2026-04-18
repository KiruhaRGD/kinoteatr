const pool = require('../config/db');

// Получить все залы
const getAllHalls = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, number 
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
  const { number } = req.body;

  if (!number) {
    return res.status(400).json({
      success: false,
      message: "Номер зала обязателен"
    });
  }

  try {
    const result = await pool.query(`
      INSERT INTO "Hall" (number)
      VALUES ($1)
      RETURNING *
    `, [number]);

    res.status(201).json({
      success: true,
      message: `Зал №${number} успешно создан`,
      data: result.rows[0]
    });
  } catch (err) {
    console.error('Ошибка createHall:', err.message);
    res.status(500).json({ 
      success: false, 
      message: err.message 
    });
  }
};

module.exports = {
  getAllHalls,
  createHall
};