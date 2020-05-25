$(function(){
  function builderHTML(message){
   if ( message.image) {
     var html = 
     `<div class="main__chat__box">
     <div class="main__chat__box__user">
         <div class="main__chat__box__user__name">
           ${message.user_name}
         </div>
         <div class="main__chat__box__user__time">
          ${message.created_at}
         </div>
      </div>
       <div class="main__chat__box__post">
         <div class="main__chat__box__post__content">
           ${message.content}
         </div>
         <img class="main__chat__box__post__image" src=${message.image}>
         </div>
       </div>
   </div>`
    return html;
   } else {
     var html = 
      `<div class="main__chat__box">
        <div class="main__chat__box__user">
            <div class="main__chat__box__user__name">
              ${message.user_name}
            </div>
            <div class="main__chat__box__user__time">
             ${message.created_at}
            </div>
         </div>
          <div class="main__chat__box__post">
            <div class="main__chat__box__post__content">
              ${message.content}
            </div>
          </div>
      </div>`
      return html;
   };
  }
  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false, 
      contentType: false
    })
    .done(function(data){
      var html = builderHTML(data);
      $('.main__chat').append(html);
      $('.main__chat').animate({ scrollTop: $('.main__chat')[0].scrollHeight});
      $('.input-box__text').val('');
      $('form')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.input-box__text').val('');
      $('form')[0].reset();
      $('.submit-btn').prop('disabled', false);
  });
  })
});