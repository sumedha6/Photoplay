$('#btn2').click(function() {

function handler() {
    var result;

    $.ajax({
        url: '/view',
           type: 'get',
           dataType: 'jsonp',
           jsonp: 'jsonp',
           success: function (data) {
               console.log('success', data);
           },
           error: function (XMLHttpRequest, textStatus, errorThrown) {
               console.log('error', errorThrown);
           }
       });

       return result;
   }
});
