# Stack Overflow

Stack Overflow is a question-answer site for developers. We can post a question related to programming, then other users can answer those questions accordingly. Registered users can also vote a question once.

## Users Schema

| Field      | DataType     | Description
|------------|--------------|------------
| `_id`      | `Object_ID`  | Object ID User
| `username` | `STRING`     | Username / Display name
| `password` | `STRING`     | User password

## Questions Schema

| Field              | DataType      | Description                              |
| -------------      |---------------|:-----------------------------------------|
| `_id`                | `Object_ID`     | Object ID Question                       |
| `userID`             | `STRING`        | User ID to know who post the question    |
| `title`              | `STRING`        | Title of the question                    |
| `answer`             | `MIXED`         | Array of Object of who post the answer <br> the object contents are: <br>- ID of the answer<br>- ID of the user who post the ID<br>- Title of the answer<br>- Content of the answer<br>- Vote from the user up / down |
| `content`            | `STRING`        | The content of the question              |
| `vote`               | `STRING`        | Question vote up/down                    |
