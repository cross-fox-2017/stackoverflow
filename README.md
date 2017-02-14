# stackoverflow

## Mini stackoverflow using mongoDb


```
Release 1:
  - Model for Question and Answer,
  - each have title and content
  - list of Questions Page
  - Detailed list of Question
  - list of Question as Homepage
```
#### Models
1. Users -->  Username, Password
2. Question --> title, content, userid, Answerid, Vote
*-- Answer --> title, content, userid, Vote
--*

#### Routes
| Routes              | HTTP   | Description          |
|---------------------|--------|----------------------|
| /api/users          | GET    | GET All Users        |
| /api/users/register | POST   | Create new User      |
| /api/users/         | POST   | Login Users          |
| /api/question/      | GET    | GET list of Question |
| /api/question/      | POST   | Create new Question  |
| /api/question/:id   | DELETE | DELETE Question      |
| /api/question/:id   | PUT    | Edit Question        |
| /api/question/:id   | POST   | Create new Answer    |

```
Release 2:
  - form for new Question
  - form for new Answer for Question
  - delete Question
  - edit Question
  - upvote Question
  - downvote Question
  - total Vote for Question
  - upvote for Answer
  - downvote for Answer
  - total Vote for Answer

```
```
Release 3:
  - every crud process async
  - upvote - downvote for Answer Question async
  - use ui framework to beautify
```
