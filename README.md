# Stack Overflow

Stack Overflow is a question-answer site for developers. We can post a question related to programming, then other users can answer those questions accordingly. Registered users can also vote a question once.


# Database

## Users Schema

| Field      | DataType     | Description
|------------|--------------|------------
| `_id`      | `Object_ID`  | User ID (autoincrement plugin)
| `username` | `STRING`     | Username / Display name
| `password` | `STRING`     | User password
| `createdAt`| `DATE`       | Date time user created
| `updatedAt`| `DATE`       | Date time user updated

## Questions Schema

| Field      | DataType    | Description                              
| -----------|-------------|:-----------------------------------------
| `_id`      | `Object_ID` | Question ID (autoincrement plugin)                       
| `userId`   | `NUMBER`    | User ID who post the question    
| `title`    | `STRING`    | Title of the question                    
| `answer`   | `ARRAY`     | Array of object who post the answer (details below)
| `content`  | `STRING`    | The content of the question              
| `upvote`   | `ARRAY`     | User ID of who upvote the answer                    
| `downvote` | `ARRAY`     | User ID of who downvote the answer  
| `createdAt`| `DATE`      | Date time question created
| `updatedAt`| `DATE`      | Date time question updated

### Answers Schema (sub schema from questions)

| Field      | DataType    | Description                              
| -----------|-------------|:----------------------------------
| `_id`      | `Object_ID` | Answer ID (Object_ID)                       
| `userId`   | `NUMBER`    | User ID who post the answer    
| `content`  | `STRING`    | The content of the answer              
| `upvote`   | `ARRAY`     | User ID of who upvote the answer                    
| `downvote` | `ARRAY`     | User ID of who downvote the answer  
| `createdAt`| `DATE`      | Date time answer created
| `updatedAt`| `DATE`      | Date time answer updated

# Routes API

## Users

| API                 | METHOD  | Description                              
| --------------------|---------|:----------------------------------
| `/api/users/seed`   | `POST`  | Seed a user `key:'auth', value:'admin123'`                       
| `/api/users`        | `POST`  | Add a user  
| `/api/users`        | `GET`   | Get users list            
| `/api/users/:id`    | `DELETE`| Remove a user by `user ID`        
| `/api/users/signin` | `POST`  | Add an answer by `question ID`  

## Questions

| API                                             | METHOD  | Description                              
| ----------------------------------------------- |---------|:----------------------------------
| `/api/questions/seed`                           | `POST`  | Seed a question `key:'auth', value:'admin123'`                       
| `/api/questions`                                | `POST`  | Add a question   
| `/api/questions/:id`                            | `DELETE`| Delete a question by `question ID`             
| `/api/questions`                                | `GET`   | Get questions list         
| `/api/questions/:id/answers`                    | `POST`  | Add an answer by `question ID`  
| `/api/questions/:id/answers`                    | `PUT`   | Delete all answer by `question ID`
| `/api/questions/:id/answers/:answerId/remove`   | `PUT`   | Remove an answer by `question ID` and  `answer ID`
| `/api/questions/:id/answers/:answerId/upvote`   | `PUT`   | Upvote an answer by `question ID` then find `answer ID` and insert User ID who upvote
| `/api/questions/:id/answers/:answerId/downvote` | `PUT`   | Downvote an answer by `question ID` then find `answer ID` and insert User ID who downvote
| `/api/questions/:id/upvote`                     | `PUT`   | Upvote a question by `question ID` and insert User ID who downvote
| `/api/questions/:id/downvote`                   | `PUT`   | Downvote a question by `question ID` and insert User ID who downvote
