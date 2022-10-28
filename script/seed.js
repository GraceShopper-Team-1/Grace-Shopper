"use strict";

const {
  db,
  models: { User, Product, Order },
} = require("../server/db");
const axios = require("axios");

const key = "AIzaSyBPi4jWcnylqFsNv_xcztwzeyXlel5uOsI";

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  const getAstro = axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=Astronomy&key=${key}`
  );
  const getNonFiction = axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=NonFiction&key=${key}`
  );
  const getFiction = axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=Fiction&key=${key}`
  );
  const getRomance = axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=Romance&key=${key}`
  );
  const getHorror = axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=Horror&key=${key}`
  );
  const getBio = axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=Biography&key=${key}`
  );

  const getNovels = axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=Novel&key=${key}`
  );

  await axios
    .all([
      getAstro,
      getBio,
      getFiction,
      getHorror,
      getNonFiction,
      getNovels,
      getRomance,
    ])
    .then(
      axios.spread(function (res1, res2, res3, res4, res5, res6, res7) {
        let books = [
          ...res1.data.items,
          ...res2.data.items,
          ...res3.data.items,
          ...res4.data.items,
          ...res5.data.items,
          ...res6.data.items,
          ...res7.data.items,
        ];

        books.map((book) => {
          Product.create({
            title: book.volumeInfo.title
              ? book.volumeInfo.title
              : "Mystery Book",
            author: book.volumeInfo.authors ? book.volumeInfo.authors[0] : null,
            genre: book.volumeInfo.categories
              ? book.volumeInfo.categories[0]
              : null,
            coverImageUrl: book.volumeInfo.imageLinks
              ? book.volumeInfo.imageLinks.thumbnail
              : "https://vip12.hachette.co.uk/wp-content/uploads/2018/07/missingbook.png",
            publishedDate: book.volumeInfo.publishedDate,
            description: book.volumeInfo.description,
            pages: book.volumeInfo.pageCount,
            isbn: book.volumeInfo.industryIdentifiers
              ? book.volumeInfo.industryIdentifiers[0].identifier
              : null,
            price: book.saleInfo.retailPrice
              ? book.saleInfo.retailPrice.amount
              : (Math.random() * 30).toFixed(2),
            language: book.volumeInfo.language,
          });
        });
      })
    );

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody", password: "123", isAdmin: true }),
    User.create({ username: "murphy", password: "123", isAdmin: false }),
  ]);

  // test order data
  const orders = await Promise.all([
    Order.create({ userId: 1, status: "unfulfilled" }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
    orders: {
      order1: orders[0],
    },
  };
}

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
