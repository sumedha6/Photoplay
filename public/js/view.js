//<![CDATA[

var src;
var filename;
var srcc;


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
  var search= document.getElementById('search').value

  console.log("Searching...",search);



$.ajax({
  url:'/search',
  type:'POST',
  data:search,
  cache:false,
  dataType:'text',

  success:function (data){
    console.log("Posted",data);
    console.log(data);
    displayImage();


  }
});
console.log("Searching...22");
console.log("search",search);

function displayImage(){
  console.log("hwoooo");
  $.ajax({
    url:'/image',
    method:'GET',
    dataType:'json',
    contentType:"image/jpg",

    success:function(data){
      console.log("Getting the image");
      var stack=data;
      console.log("my files", stack)

      for (var i = 0; i < array.length; i++) {
          var element = array[i];
          var $div = $("#img2");
           src = "images/" + array[i];
           filename=array[i];
           srcc="quotes/"+array[i];
          console.log('my files',filename)
          $("<img />").attr("src", src).appendTo($div);
    }
  }
});


}
});
