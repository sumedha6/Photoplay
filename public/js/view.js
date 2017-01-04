//<![CDATA[

var src;
var filename;
var srcc;
var search=document.getElementById("search")

$('#btn2').click(function() {
    console.log("hel");
    $.ajax({
        url: '/view-images',
        type: 'get',
        dataType: 'json',
        jsonp: 'json', // mongod is expecting the parameter name to be called "jsonp"
        contentType: "image/jpg",

        success: function(data) {
            console.log('success', data);
            console.log('SUMEDHA');
            var array = data;
            console.log("my array", array)

            for (var i = 0; i < array.length; i++) {
                var element = array[i];
                var $div = $("#img");
                 src = "images/" + array[i];
                 filename=array[i];
                 srcc="quotes/"+array[i];
                console.log('my files',filename)
                $("<img />").attr("src", src).appendTo($div);
                Callfile();
            }

        },

        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log('error', errorThrown);
        }
    });

  function Callfile(){
    console.log("Printing")
      $.ajax({
      url:srcc,
      data:filename,
      type:'POST',
      datatype:'json',


      success:function(data){
        console.log('Sent data',data);
      }

    })
 }
});


$('#searchme').click(function(){
  console.log("Searching...");

$.ajax({
  url:'/search',
  type:'POST',
  data:search,
  dataType:'text',

  success:function (data){
    console.log("Posted",search);
  }
})
console.log("Searching...");

})
