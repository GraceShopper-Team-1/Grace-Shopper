"use strict";

const {
	db,
	models: { User, Book, Author },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
	await db.sync({ force: true }); // clears db and matches models to tables
	console.log("db synced!");

	// Creating Users
	const users = await Promise.all([
		User.create({ username: "cody", password: "cody123" }),
		User.create({ username: "murphy", password: "murphy123" }),
		User.create({ username: "carl", password: "carl123" }),
		User.create({ username: "stina", password: "stina123" }),
		User.create({ username: "maureen", password: "maureen123" }),
	]);

	const authors = await Promise.all([
		Author.create({
			firstName: "Antoine",
			lastName: "de Saint-Exupéry",
			bio: "Antoine de Saint-Exupéry was born in Lyons on June 29, 1900. He flew for the first time at the age of twelve, at the Ambérieu airfield, and it was then that he became determined to be a pilot. He kept that ambition even after moving to a school in Switzerland and while spending summer vacations at the family's château at Saint-Maurice-de-Rémens, in eastern France. (The house at Saint-Maurice appears again and again in Saint-Exupéry's writing.)",
			imageUrl: "https://images.gr-assets.com/authors/1330853515p5/1020792.jpg",
		}),
		Author.create({
			firstName: "Antoine",
			lastName: "de Saint-Exupéry",
			bio: "Antoine de Saint-Exupéry was born in Lyons on June 29, 1900. He flew for the first time at the age of twelve, at the Ambérieu airfield, and it was then that he became determined to be a pilot. He kept that ambition even after moving to a school in Switzerland and while spending summer vacations at the family's château at Saint-Maurice-de-Rémens, in eastern France. (The house at Saint-Maurice appears again and again in Saint-Exupéry's writing.)",
			imageUrl: "https://images.gr-assets.com/authors/1330853515p5/1020792.jpg",
		}),
	]);

	// title, authorId, genre, coverImageUrl, price, publishedDate, pages, description, language, isbn
	const books = await Promise.all([
		Book.create({
			title: "The Little Prince",
			authorId: 1,
			genre: "Classic",
			coverImageUrl:
				"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1367545443l/157993.jpg",
			price: 10.0,
			publishedDate: 1943,
			pages: 96,
			description:
				'A pilot stranded in the desert awakes one morning to see, standing before him, the most extraordinary little fellow. "Please," asks the stranger, "draw me a sheep." And the pilot realizes that when life\'s events are too difficult to understand, there is no choice but to succumb to their mysteries. He pulls out pencil and paper... And thus begins this wise and enchanting fable that, in teaching the secret of what is really important in life, has changed forever the world for its readers.\
Few stories are as widely read and as universally cherished by children and adults alike as The Little Prince, presented here in a stunning new translation with carefully restored artwork. The definitive edition of a worldwide classic, it will capture the hearts of readers of all ages.',
			language: "English",
		}),
		Book.create({
			title: "The Little Prince",
			authorId: 1,
			genre: "Classic",
			coverImageUrl:
				"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1367545443l/157993.jpg",
			price: 10.0,
			publishedDate: 1943,
			pages: 96,
			description:
				'A pilot stranded in the desert awakes one morning to see, standing before him, the most extraordinary little fellow. "Please," asks the stranger, "draw me a sheep." And the pilot realizes that when life\'s events are too difficult to understand, there is no choice but to succumb to their mysteries. He pulls out pencil and paper... And thus begins this wise and enchanting fable that, in teaching the secret of what is really important in life, has changed forever the world for its readers.\
Few stories are as widely read and as universally cherished by children and adults alike as The Little Prince, presented here in a stunning new translation with carefully restored artwork. The definitive edition of a worldwide classic, it will capture the hearts of readers of all ages.',
			language: "English",
		}),
		Book.create({
			title: "The Little Prince",
			authorId: 1,
			genre: "Classic",
			coverImageUrl:
				"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1367545443l/157993.jpg",
			price: 10.0,
			publishedDate: 1943,
			pages: 96,
			description:
				'A pilot stranded in the desert awakes one morning to see, standing before him, the most extraordinary little fellow. "Please," asks the stranger, "draw me a sheep." And the pilot realizes that when life\'s events are too difficult to understand, there is no choice but to succumb to their mysteries. He pulls out pencil and paper... And thus begins this wise and enchanting fable that, in teaching the secret of what is really important in life, has changed forever the world for its readers.\
Few stories are as widely read and as universally cherished by children and adults alike as The Little Prince, presented here in a stunning new translation with carefully restored artwork. The definitive edition of a worldwide classic, it will capture the hearts of readers of all ages.',
			language: "English",
		}),
	]);

	console.log(
		`seeded ${users.length} users, ${books.length} books, and ${authors.length} authors`
	);
	console.log(`seeded successfully`);

  // optional return
	return {
		users: {
			cody: users[0],
			murphy: users[1],
			carl: users[2],
			stina: users[3],
			maureen: users[4],
		},
	};
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
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

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
	runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
