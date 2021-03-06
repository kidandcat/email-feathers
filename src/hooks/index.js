'use strict';
var http = require('http');
var querystring = require('querystring');
var connection = require('../libs/dbconnection');

// Add any common hooks you want to share across services in here.
// 
// Below is an example of how a hook is written and exported. Please
// see http://docs.feathersjs.com/hooks/readme.html for more details
// on hooks.

exports.sendMail = function(options) {
    var options = {
        host: '127.0.0.1',
        port: 8010,
        path: '/email/new',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    return function(hook) {
        console.log(hook.data._to.split('@')[1] == 'galax.be');
        if (hook.data._to.split('@')[1] == 'galax.be') {
            console.log('1');
            connection.query("SELECT * FROM users WHERE email = '" + hook.data._to + "'", function(err, rows, fields) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('rows, ' + hook.data._to);
                    console.log(rows[0]);
                    if (typeof rows[0] != 'undefined') {
                        connection.query("INSERT INTO emails (_from, _to, body, subject) VALUES ('" + hook.data._from + "', '" + hook.data._to + "', '" + encodeURIComponent(hook.data.body) + "', '" + hook.data.subject + "')", function(err, rows, fields) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log('NEW MESSAGE');
                            }
                        });
                    }
                }
            });
            console.log('a');
        } else {
            console.log('2');
            var req2 = http.request(options, function(res) {
                res.setEncoding('utf8');
                res.on('data', function(chunk) {
                    console.log("body: " + chunk);
                });
            });
            hook.data.from = hook.data._from;
            hook.data.to = hook.data._to;
            var data = querystring.stringify(hook.data);
            
            req2.write(data);
            req2.end();
        }
    };
};


exports.orderByDate = function(options) {
    return function(hook) {
        hook.params.query = {
            $sort: { date: -1 }
        }
    };
};


exports.log = function(options) {
    return function(hook) {
        console.log(hook);
    };
};