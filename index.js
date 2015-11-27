'use strict';

var request = require('request');
var ProgressBar  = require('progress');
var Promise = require('bluebird'); 

/**
 * @param  {String}   url the url needs to get
 * @param  {Object}   opt option
 * @param  {Function} cb  callback
 * @return {Promiss || null}       [description]
 */
function porgressRequest(url,opts,cb) {
	if (typeof opts === 'function') {
		cb = opts;
		opts = {};
	}

	if (cb) {
		asCallback(url, opts, cb);
		return null;
	}

	try {
		return asPromise(url, opts);
	} catch (error) {

		return Promise.reject(error);
	}

}

function asCallback(url, opts, cb) {
	var chunks = [];
	var size = 0;
	var fileLength = 1;
	var bar ;

	request.get({
		url: url,
		strictSSL: false
	}).on("response", function(response) {

		fileLength = parseInt(response.headers['content-length']);
		bar = new ProgressBar('downloading [:bar] :percent :etas ', {
			total: fileLength
		});
		
	}).on("data", function(chunk) {

		chunks.push(chunk);
		size += chunk.length;
		bar.tick(chunk.length);
	}).on("end", function() {

		if (size !== fileLength) {
			return cb(new Error("download "+ url +" faild "));
		}

		var buff = Buffer.concat(chunks, size);
		var data = buff.toString();
		cb(null, data);
	}).on("error", cb);

}

function asPromise(url, opts) {
	return new Promise(function(resolve, reject) {
		asCallback(url, opts, function(e,r){
			if(e){
				return reject(e);
			}

			return resolve(r);
		});

	});

}



module.exports = porgressRequest;