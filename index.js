var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var restify = require('express-restify-mongoose')
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

mongoose.connect('mongodb://localhost/morganizer');

var Account = new Schema({
	name: { type: String, required: true },
});
var AccountModel = mongoose.model('Account', Account);

var Category = new Schema({
	name: { type: String, required: true },
});
var CategoryModel = mongoose.model('Category', Category);

var Transaction = new Schema({
	account: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
	description: { type: String, required: true },
	category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
	amount: { type: Schema.Types.Currency, required: true }
});
var TransactionModel = mongoose.model('Transaction', Transaction);

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

var router = express.Router();
restify.serve(router, AccountModel);
restify.serve(router, CategoryModel);
restify.serve(router, TransactionModel);
app.use(router);

app.listen(3000, function() {
	console.log("Express server listening on port 3000");
});
