var util = require('util');
var AWS = require('aws-sdk');
var fs = require('fs');

var region = 'us-east-1';
var aws_access_key_id = '';
var aws_secret_access_key = '';

AWS.config = {
    "accessKeyId": aws_access_key_id,
    "secretAccessKey": aws_secret_access_key,
    "region": region,
    "sslEnabled": 'true'
};

var endpoint = 'https://mturk-requester-sandbox.us-east-1.amazonaws.com';

var mturk = new AWS.MTurk({ endpoint: endpoint, region: 'us-east-1' });
// mturk.getAccountBalance(function (err, data) {
//     if (err) {
//         console.log(err.message);
//     } else {
//         // Sandbox balance check will always return $10,000
//         console.log('I have ' + data.AvailableBalance + ' in my account.');
//     }
// });

var params = {
    AssignmentDurationInSeconds: 1000, /* required */
    Description: 'Persuasion - Tweets', /* required */
    Reward: '0.1', /* required in usd*/
    Title: 'Persuasion - Tweets', /* required */
    AutoApprovalDelayInSeconds: 20000,
    Keywords: 'Twitter, Tweets, Persuasion',
    LifetimeInSeconds: 3600000,
    MaxAssignments: 1,
    Question: `<?xml version="1.0" encoding="UTF-8"?>
    <ExternalQuestion xmlns="http://mechanicalturk.amazonaws.com/AWSMechanicalTurkDataSchemas/2006-07-14/ExternalQuestion.xsd">
      <ExternalURL>https://persuasion.azurewebsites.net</ExternalURL>
      <FrameHeight>0</FrameHeight>
    </ExternalQuestion>`
  };

mturk.createHIT(params, function(error, data) {
    if (error) {
        console.log('from server' ,error.message);
    } else {
        console.log(data);
    }
});
