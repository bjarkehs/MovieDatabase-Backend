#!/usr/bin/env node

const express = require("express");
const serveIndex = require("serve-index");
const path = require("path");
var fs = require("fs");

const app = express();

const PORT = 3001;

let movies = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "movies.json"), "utf8")
);
movies.forEach(movie => {
  movie.imageUrl = `/images/${movie.imageUrl}`;
});

let actors = [];
let actorId = 1;
movies.forEach(movie => {
  movie.stars.forEach(star => {
    let actor;
    let actorIndex = actors.map(a => a.name).indexOf(star);
    if (actorIndex !== -1) {
      actor = actors[actorIndex];
      actor.movies.push(movie.id);
    } else {
      actor = { id: actorId, name: star, movies: [movie.id] };
      actors.push(actor);
      actorId++;
    }
  });
});
actors.sort((a, b) => a.name.localeCompare(b.name));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  "/images",
  express.static(path.resolve(__dirname, "public/images")),
  serveIndex(path.resolve(__dirname, "public/images"), { icons: true })
);

app.get("/movies", (req, res) => {
  // const fullUrl = `${req.protocol}://${req.get("host")}/-${req.url}/+${
  //   req.baseUrl
  // }/=${req.originalUrl}`;
  // const tweakedMovies = movies.map(movie =>
  //   Object.assign({}, movie, {
  //     absoluteImageUrl: `${fullUrl}${movie.imageUrl}`
  //   })
  // );
  res.json(movies);
});

app.get("/actors", (req, res) => {
  res.json(actors);
});

app.listen(PORT, () => console.log(`Serving movies on port ${PORT}!`));
