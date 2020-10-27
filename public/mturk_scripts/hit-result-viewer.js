var util = require('util');
var AWS = require('aws-sdk');
var fs = require('fs');


var endpoint = 'https://mturk-requester-sandbox.us-east-1.amazonaws.com';

var mturk = new AWS.MTurk({ endpoint: endpoint, region: 'us-east-1' });


mturk.listAssignmentsForHIT({HITId: 'Enter Hit Id'}, function(error, data){
    if (error) {
                console.log('from server' ,error.message);
            } else {
                console.log(data);
            }
});