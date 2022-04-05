## API for creating, editing and deleting notes using express + lambda + dynamodb

### Instructions

1. Clone and install dependencies\
   ``` 
      git clone https://github.com/hameos/notes_sls.git
      cd notes_sls
      npm i
   ```

2. From root folder run\
     `npm run dynamodb:install`

3. By default, defined in serverless.yaml file, `"./s4s"` is the folder dynamodb store its data in offline mode.\
   You can change its value through `custom.dynamodb.start.dbPath`.\
   If folder doesn't exist, create it.

4. You can launch the service in local or in aws:\
   If working in local modify config .env file => DB_DYNAMO_OFFLINE=true and run
    ``` 
      npm run sls:dev
      npm run sls:offline
   ```
   If working on aws modify config .env file => DB_DYNAMO_OFFLINE=false and run
   ```
      npm run sls:dev
      npm run sls:deploy
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

