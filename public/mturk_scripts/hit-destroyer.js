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


var params = {
  HITId: '31J7RYECZKPRFR0RW84CN10PBCY1L4', /* required */
};


mturk.deleteHIT(params, (err, data) => {
  if (err) {
    console.warn("Error making the mTurk API call:", err);
  } else {
      console.warn("success response: ", data);
  }
 })