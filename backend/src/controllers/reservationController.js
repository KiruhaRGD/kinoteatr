const pool = require('../config/db');

// Создать бронь (одно или несколько мест)
const createReservation = async (req, res) => {
  const { sessionId, seats, cashierId = 1 } = req.body;

  if (!sessionId || !seats || seats.length === 0) {
    return res.status(400).json({
      success: false,
      message: "sessionId и seats обязательны"
    });
  }

  try {
    const reservations = [];

    for (const seat of seats) {
      // Пытаемся найти seat_id
      const seatResult = await pool.query(`
        SELECT id FROM "Seat" 
        WHERE row_id = $1 AND number = $2
      `, [seat.row, seat.number]);

      if (seatResult.rows.length === 0) {
        return res.status(400).json({
          success: false,
          message: `Место Ряд ${seat.row}, Место ${seat.number} не найдено в базе`
        });
      }

      const seatId = seatResult.rows[0].id;

      // Проверка занятости
      const check = await pool.query(`
        SELECT id FROM "Reservation" 
        WHERE seat_id = $1 AND showing_id = $2
      `, [seatId, sessionId]);

      if (check.rows.length > 0) {
        return res.status(400).json({
          success: false,
          message: `Место Ряд ${seat.row}, Место ${seat.number} уже занято`
        });
      }

      // Создаём бронь
      const result = await pool.query(`
        INSERT INTO "Reservation" 
          (seat_id, cashier_id, showing_id, status_id, price, "timeCreate")
        VALUES ($1, $2, $3, 1, 500, NOW())
        RETURNING *
      `, [seatId, cashierId, sessionId]);

      reservations.push(result.rows[0]);
    }

    res.status(201).json({
      success: true,
      message: `Успешно забронировано ${seats.length} мест`,
      data: reservations
    });
  } catch (err) {
    console.error('Ошибка бронирования:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createReservation
};