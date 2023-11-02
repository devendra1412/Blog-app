// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
const crypto = require('crypto');
const { readAllPosts, deletePostById } = require("./User");
// Set the region
AWS.config.update({
  region: "ap-sount-1",
  endpoint: "http://localhost:8000",
  accessKeyId: "DUMMYIDEXAMPLE",
  secretAccessKey: "DUMMYEXAMPLEKEY",
});

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

var params = {
  AttributeDefinitions: [
    {
      AttributeName: "POST_ID",
      AttributeType: "S",
    },
  ],
  KeySchema: [
    {
      AttributeName: "POST_ID",
      KeyType: "HASH",
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
  TableName: "POSTS",
  StreamSpecification: {
    StreamEnabled: false,
  },
};

// Call DynamoDB to create the table
// ddb.createTable(params, function (err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Table Created", data);
//   }
// });

const postitem2 = {
  POST_ID : {S:crypto.randomUUID()},
  POST_TITLE : {S:"Deva"},
  POST_CONTENT: {S:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit asperiores laborum, tenetur in qui molestiae earum"}
}

const para = {
  TableName:"POSTS",
  Item: postitem2
}
ddb.putItem(para, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Table Created", data);
  }
});

// readAllPosts().then(res => console.log(res)).catch(err => console.log(err))

// deletePostById('151259a5-bb84-49c2-bf84-54efd44f7a71','POST_ID').then(res => console.log(res)).catch(err => console.log(err))