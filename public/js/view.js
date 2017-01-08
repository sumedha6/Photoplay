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
                filename = array[i];
                srcc = "quotes/" + array[i];
                console.log('my files', filename)
                $("<img />").attr("src", src).appendTo($div);
                Callfile();
            }

        },

        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log('error', errorThrown);
        }
    });

    function Callfile() {
        console.log("Printing")
        $.ajax({
            url: srcc,
            data: filename,
            type: 'POST',
            datatype: 'json',


            success: function(data) {
                console.log('Sent data', data);
            }

        })
    }
});

var myData;
var e;
$('#searchme').click(function() {
    var search = document.getElementById('search').value

    console.log("Searching...", search);



    $.ajax({
        url: '/search',
        type: 'POST',
        data: search,
        cache: false,
        dataType: 'text',

        success: function(data) {
            console.log("Posted", data);
            e = JSON.parse(data)
            for (i = 0; i < e.length; i++) {
                console.log(e[i]);

            }
            var file = [];

            file[0] = e[0];
            var j = 0;
            for (var i = 0; i < e.length; i++) {
                for (var k = 0; k <= j; k++) {
                    if (e[i] != file[j] && e[i] != null) {
                        j++;
                        file[j] = e[i];
                    }
                }
                //      j = 0;
            }
            console.log(":::file:::", file)
            for (var i = 0; i < file.length; i++) {
                var element = e[i];
                var $div = $("#img2");
                src = "images/" + file[i];
                filename = file[i];
                console.log('my files', filename)
                $("<img />").attr("src", src).appendTo($div);
            }

            // filename(e);
        }
    })
    console.log("Searching...22");
    console.log("search", search);
});




// function filename(e) {
//     $('#btn3').click(function() {
//         var file = [];

//         file[0] = e[0];
//         var j = 0;
//         for (var i = 0; i < e.length; i++) {
//             for (var k = 0; k <= j; k++) {
//                 if (e[i] != file[j]) {
//                     j++;
//                     file[j] = e[i];
//                 }
//             }
//         }


//         $.ajax({
//             url: '/image',
//             method: 'GET',
//             jsonp: 'json',

//             contentType: "image/jpg",
//             success: function(data) {

//                 console.log("Getting the image");
//                 var stack = data;
//                 console.log("my files", e)


//                 for (var i = 0; i < file.length; i++) {
//                     var element = e[i];
//                     var $div = $("#img2");
//                     src = "images/" + file[i];
//                     filename = file[i];
//                     console.log('my files', filename)
//                     $("<img />").attr("src", src).appendTo($div);
//                 }
//             }
//         });

//     })
// }