// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");
// all your routes here

router.get("/create", (req, res, next) => {
  Celebrity.find()
    .then((allCelebrities) => {
      /* console.log(allNames) */
      res.render("movies/new-movie.hbs", {
        allCelebrities: allCelebrities,
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/create", (req, res, next) => {
  console.log(req.body);
  Movie.create({
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast,
  })
    .then(() => {
      console.log("Pelicula Creada");
      res.redirect("/movies");
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/", (req, res, next) => {
  Movie.find()
    .then((allMovies) => {
      console.log(allMovies);
      res.render("movies/movies.hbs", {
        allMovies,
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id", (req, res, next) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((movie) => {
      res.render("movies/movie-details", {
        movie: movie,
      });
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/:id/delete", (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/:id/edit", (req, res, next) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((movieDetails) => {
      console.log(movieDetails);
      res.render("movies/edit-movie.hbs", {
        movieDetails,
      });
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/:id/edit", (req, res, next) => {
  Movie.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast,
  }).then((movieDetails) => {
    console.log(movieDetails);
    res.redirect("/movies");
    res.render("movies/edit-movie.hbs", {
      movieDetails,
    });
  });
});

module.exports = router;
