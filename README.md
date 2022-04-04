## API for creating, editing and deleting notes using express + lambda + dynamodb

### Instructions

0. Tune .env file if you want to change some configuration

1. If folder .dynamodb doesn't exist, from root folder run:\
 `serverless dynamodb install`

2. By default `"./s4s"` is the folder dynamodb store its data in offline mode.\
   You can change its value through `custom.dynamodb.start.dbPath` in serverless.yml file.\
   If folder doesn't exist, create it. E.g: `"mkdir s4s"`

3. You can launch the service in local or in aws:\
   If working in local modify config .env file => DB_DYNAMO_OFFLINE=true and run
    ``` 
      run "npm run sls:dev"
      run "npm run sls:offline"
      test "curl http://localhost:8080/notes"
   ```
   If working on aws modify config .env file => DB_DYNAMO_OFFLINE=false and run
   ```
      run "npm run sls:dev"
      run "npm run sls:deploy"
      test "curl http://aws_url_here/notes"
   ```

### Endpoints available (urls are for offline setup, if using aws then replace url accordingly)

GET http://localhost:8080/notes

POST http://localhost:8080/notes \
Example: body={ title: 'mytitle', content: 'mycontent' }

GET http://localhost:8080/notes/:id

PUT http://localhost:8080/notes/:id \
Example: body={ title: 'mytitle', content: 'mycontent' }

PATCH http://localhost:8080/notes/:id \
Example: body={ content: 'mycontent' }

DELETE http://localhost:8080/notes/:id

