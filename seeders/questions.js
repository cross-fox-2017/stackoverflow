const data = [{
  userID: 1,
  title: 'Required field validation not hiding',
  answer: [{
    userID: 2,
    content: "Use required property of $error",
    vote: 13
  },{
    userID: 3,
    content: "address validation along with valid email address.",
    vote: 2
  }],
  content: "Problem is: When I start typing an email address and if it is invalid....I could still see required email",
  vote: 11
}]

// [{"userID":"2", "content":"Use required property of $error", "vote":"13"},{"userID":"3", "content":"address validation along with valid email address.", "vote":"2"}]

module.exports = data
