const express = require("express");
const router = express.Router();

require('dotenv').config();
var ElasticEmail = require('@elasticemail/elasticemail-client');
const SERVER_PORT = process.env.PORT || 80;
const BOT_EMAIL = "professionaldummyo7@gmail.com"
const USER_EMAIL = "123003078@sastra.ac.in"

var defaultClient = ElasticEmail.ApiClient.instance;
var apikey = defaultClient.authentications['apikey'];
apikey.apiKey = process.env.API_KEY
var api = new ElasticEmail.EmailsApi()

function send_email(body, callback) {
	var message = "Mr/Ms " + body["Name"] + " would like to contact you about " + body["Subject"] + " and also wanted to say that " + body["Message"] + ". Contact " + body["Name"] + " at " + body["Email"]
	var subj = "KYC req from " + body["Name"]

	let email = ElasticEmail.EmailMessageData.constructFromObject({
		Recipients: [
			new ElasticEmail.EmailRecipient(USER_EMAIL)
		],
		Content: {
			Body: [{
				ContentType: 'HTML',
				Charset: 'utf-8',
				Content: message
			}],
			Subject: subj,
			From: BOT_EMAIL
		}
	});

	api.emailsPost(email, (error, data, response) => {
		if (error) callback("error")
		else callback("ok")
	});
}

router.post("/", async (req, res, next) => {
	let body = '';
	req.on('data', data => body += data)
	req.on('end', () => {
		res.writeHead(200, {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'POST, GET',
		});
		body = JSON.parse(body)
		console.log(body)

		send_email(body, (result) => {
			if (result == "error")
				res.end('{"res": "no"}')
			else
				res.end('{"res": "ok"}')
		})
	});
})

module.exports = router;