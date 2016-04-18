'use strict';
var http = require('http');
var querystring = require('querystring');

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
        var data = querystring.stringify(hook.data);
        
        if (hook.data._to.split('@')[1] == 'galax.be') {
            connection.query("SELECT * FROM users WHERE nick = '" + hook.data._to.split('@')[0] + "'", function(err, rows, fields) {
                if (err) {
                    console.log(err);
                } else {
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
        } else {
            var req2 = http.request(options, function(res) {
                res.setEncoding('utf8');
                res.on('data', function(chunk) {
                    console.log("body: " + chunk);
                });
            });
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