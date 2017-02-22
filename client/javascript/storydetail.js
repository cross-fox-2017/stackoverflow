$('#storycontainer').ready(function () {
  let value = localStorage.getItem('story_id')
  $.ajax({
    url: `http://localhost:3000/stories/${value}`,
    type: 'GET',
    success: function (data) {
      console.log(data)
      let title = data.success.title_stories
      let author = data.success.user_id.name
      let upvote = data.success.votes.length
      let comment = data.success.story_detail
      let story = data.success.story

      $('#title').html(title)
      $('#author').html(author)
      $('#upvote').html(upvote)
      $('#comment').html(comment.length)
      $('#story').html(story)

      comment.forEach(function (item) {
        let commentby = item.comment_by
        let commentupvote = item.votes.length
        let comments = item.comment

        let html = `<div class="mainwrapper" class="container">
          <div class="row">
         <div id="storycomment" class="col s12">
           <h4 class="valign" id="commentby">${commentby}</h3>
           <p id="comments" class="flow-text">${comments}</p>
           <i class="material-icons" id="commentupvote">thumb_up</i><span>${commentupvote}</span>
         </div>
       </div>`
        $('#main').append(html)
      })
    },
    error: function (err) {
      console.log(err)
    }
  })
})

$('#saysomething').click(function (e) {
  e.preventDefault()
  swal({
    title: 'Say Something!',
    text: 'Write something interesting',
    type: 'input',
    showCancelButton: true,
    closeOnConfirm: true,
    animation: 'slide-from-top',
    inputPlaceholder: 'Write something'
  },
    function (inputValue) {
      if (inputValue === false) return false

      if (inputValue === '') {
        swal.showInputError('You need to write something!')
        return false
      }

      let storyid = localStorage.getItem('story_id')
      let token = localStorage.getItem('token')
      $.ajax({
        url: 'http://localhost:3000/details',
        type: 'POST',
        data: {
          token: token,
          story_id: storyid,
          comment: inputValue
        },
        dataType: 'json',
        success: function (data) {
          console.log(data.successdetail)
          let html = `<div class="mainwrapper" class="container">
            <div class="row">
           <div id="storycomment" class="col s12">
             <h4 class="valign" id="commentby">${data.successdetail.comment_by}</h3>
             <p id="comments" class="flow-text">${data.successdetail.comment}</p>
             <i class="material-icons" id="commentupvote">thumb_up</i><span>${data.successdetail.votes.length}</span>
           </div>
         </div>`
          $('#main').append(html)
        },
        error: function (err) {
          console.log(err)
        }
      })
    })
})
