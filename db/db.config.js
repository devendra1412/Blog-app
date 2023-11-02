const AWS = require("aws-sdk")

AWS.config.update({
    region: "ap-sount-1",
    endpoint: "http://localhost:8000",
    accessKeyId: "DUMMYIDEXAMPLE",
    secretAccessKey: "DUMMYEXAMPLEKEY",
  });

const db = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" })

const Table = 'POSTS'

module.exports = {
    db,
    Table
}
