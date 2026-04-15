// Массив для хранения фильмов (пока без базы данных)
let films = [
  {
    id: 1,
    name: "Дюна: Часть вторая",
    duration: "166 мин",
    ageRestriction: "16+",
    poster: "https://via.placeholder.com/300x450?text=ДЮНА"
  }
];

// Получить все фильмы
const getAllFilms = (req, res) => {
  res.json({
    success: true,
    count: films.length,
    data: films
  });
};

// Создать новый фильм
const createFilm = (req, res) => {
  const { name, duration, ageRestriction, poster } = req.body;

  // Простая валидация
  if (!name || !duration) {
    return res.status(400).json({
      success: false,
      message: "Название и длительность фильма обязательны"
    });
  }

  const newFilm = {
    id: Date.now(),
    name,
    duration,
    ageRestriction: ageRestriction || "12+",
    poster: poster || `https://via.placeholder.com/300x450?text=${name.substring(0, 10)}`
  };

  films.push(newFilm);

  res.status(201).json({
    success: true,
    message: "Фильм успешно создан",
    data: newFilm
  });
};

module.exports = {
  getAllFilms,
  createFilm
};