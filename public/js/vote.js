function upvoteQuestion (questionId, userId, index) {
  $.ajax({
    type: 'PUT',
    url: `http://localhost:3000/api/questions/${questionId}/upvote`,
    dataType: 'json',
    data: {
      id: userId
    },
    success: function (data) {
      $('#question_upvote').html(data.upvote.length)
      $('#total_vote_' + index).html(data.upvote.length + data.downvote.length)
    }
  })
}

function downvoteQuestion (questionId, userId, index) {
  $.ajax({
    type: 'PUT',
    url: `http://localhost:3000/api/questions/${questionId}/downvote`,
    dataType: 'json',
    data: {
      id: userId
    },
    success: function (data) {
      $('#question_downvote').html(data.downvote.length)
      $('#total_vote_' + index).html(data.upvote.length + data.downvote.length)
    }
  })
}

function upvoteAnswer (questionId, answerId, userId, index, subIndex) {
  $.ajax({
    type: 'PUT',
    url: `http://localhost:3000/api/questions/${questionId}/answers/${answerId}/upvote`,
    dataType: 'json',
    data: {
      id: userId
    },
    success: function (data) {
      $(`#answer_upvote_${index}_${subIndex}`).html(data.answers[subIndex].upvote.length)
    }
  })
}

function downvoteAnswer (questionId, answerId, userId, index, subIndex) {
  $.ajax({
    type: 'PUT',
    url: `http://localhost:3000/api/questions/${questionId}/answers/${answerId}/downvote`,
    dataType: 'json',
    data: {
      id: userId
    },
    success: function (data) {
      $(`#answer_downvote_${index}_${subIndex}`).html(data.answers[subIndex].downvote.length)
    }
  })
}
