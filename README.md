# MongoDB Node.js CRUD Application
1. Insert Documents
POST /insert: Insert multiple documents into the collection.
Example request:

Endpoint: POST http://localhost:3000/insert
Body (JSON):
json
Copy code
[
  { "name": "John", "age": 30 },
  { "name": "Jane", "age": 25 }
]
2. Query Documents
GET /find: Query documents from the collection using query parameters.
Example request:

Endpoint: GET http://localhost:3000/find?name=John


3. Update Documents
PUT /update: Update documents based on filter criteria.
Example request:

Endpoint: PUT http://localhost:3000/update
Body (JSON):
json
Copy code
{
  "filter": { "name": "John" },
  "update": { "age": 35 }
}




4. Delete Documents
DELETE /delete: Delete documents from the collection based on filter criteria.
Example request:

Endpoint: DELETE http://localhost:3000/delete
Body (JSON):
json
Copy code
{ "name": "John" }




