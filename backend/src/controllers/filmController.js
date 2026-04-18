const pool = require('../config/db');

// Получить все фильмы
const getAllFilms = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, name, duration, "ageRestriction", description, poster 
      FROM "Film" 
      ORDER BY name
    `);
    
    console.log(`✅ Загружено фильмов: ${result.rows.length}`);

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (err) {
    console.error('❌ Ошибка getAllFilms:', err.message);
    res.status(500).json({ 
      success: false, 
      message: err.message 
    });
  }
};

// Создать фильм
const createFilm = async (req, res) => {
  const { name, duration, ageRestriction, description, poster } = req.body;

  try {
    const result = await pool.query(`
      INSERT INTO "Film" (name, duration, "ageRestriction", description, poster)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [name, duration, ageRestriction, description, poster]);

    res.status(201).json({
      success: true,
      message: "Фильм успешно создан",
      data: result.rows[0]
    });
  } catch (err) {
    console.error('❌ Ошибка createFilm:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getAllFilms,
  createFilm
};