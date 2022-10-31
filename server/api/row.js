const router = require("express").Router();
const {
  models: { Product },
} = require("../db");


export default function getGenreForRows (genre) {
    router.get("/products", async (req, res, next) => {
        try {
          const booksByGenre = await Product.findAll({
            where: {
              genre: genre
            }
          });
          res.json(booksByGenre);
        } catch (err) {
          next(err);
        }
      });
}


module.exports = router