$(document).ready(function(){
  $('.delete-article').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      // Submiting with DELETE request
      type: 'DELETE',
      url: '/articles/'+id,
      success: function(){
        alert('Deleting Article');
        // Redirect to home page
        window.location.href='/';
      },
      // If theres and error, then run...
      error: function(e){
        console.log(err);
      }
    });
  });
});
