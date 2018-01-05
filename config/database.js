const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const user = process.env.USERNAME;
const mongopw = process.env.PASSWORD;
const host = process.env.HOST;
const port = process.env.DB_PORT;


const uri = `mongodb://${user}:${mongopw}@${host}:${port}/book-trading-club`;
mongoose.connect(uri, {
	useMongoClient: true
});

const Schema = mongoose.Schema;
// create book schema
const BooksSchema = new Schema({
	_id: String,
	title: String,
	authors: String,
	img: String,
	bookOwner: String,
	bookGivenAwayBy: String,
	tradeRequestedBy: String,
	bookPutUpForTradeBy: String
}, {
	collection: 'books'
});

// export Books
const Books = mongoose.model('Books', BooksSchema);

// create user schema
const UserSchema = new Schema({
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
	name: String,
	location: {
		city: String,
		state: String
	}
}, {
	collection: 'users'
});

// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// export Users
const User = mongoose.model('Users', UserSchema);

// export
module.exports = {
	Books,
	User
};