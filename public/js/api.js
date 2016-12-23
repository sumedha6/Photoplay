$('#btn').click(function () {
var file = document.getElementById('upload-input').files[0];
var apiUrl="https://api.projectoxford.ai/emotion/v1.0/recognize";
var apiKey="6e1e8ccb31204ae7a636b502b3c93511";
var result=$('#result');
var value=response.scores;

CallAPI(file, apiUrl, apiKey);
// Emotion(value);

});


    function CallAPI(file,apiUrl,apiKey) {


        $.ajax({
            url: apiUrl,
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/octet-stream");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key",apiKey);
            },
            type: "POST",
            // Request body
            processData:false,
            data: file,
            dataType:'json'

        })
        .done(function (response) {
          var max=  response[1].scores;
          $('#result2').text('Maxximum: '+max);

          $('#result').append('\n'+'Happiness: '+response[1].scores.happiness+'<br>'+' Anger: '+response[1].scores.anger+'<br>'+' Contempt: '+response[1].scores.contempt+'<br>'+' Fear: '+ response[1].scores.fear
    +'<br>'    +' Sadness: '+response[1].scores.sadness+'<br>'+' Surprise: '+response[1].scores.surprise);

     var array=[response[1].scores.happiness,response[1].scores.anger,response[1].scores.contempt,response[1].scores.fear,response[1].scores.sadness,response[1].scores.surprise];
     var max=  Math.max.apply(Math,array);
     $('#result2').text('Maxximum: '+max);

    if(max==response[1].scores.happiness){
       $('#emotion').text("I'm happy");
    }
    else if(max==response[1].scores.anger){
      $('#emotion').text("I'm angry");
    }
    else if(max==response[1].scores.contempt){
      $('#emotion').text("I'm contemplating");
    }
    else if(max==response[1].scores.sadness){
      $('#emotion').text("I'm sad");

    }
    else if(max==response[1].scores.surprise){
      $('#emotion').text("I'm surprised");
}
        })

        .fail(function (error) {
        $("#response").text(error.getAllResponseHeaders());
        });
        }


        function ProcessResult(response)
        {
        var data = JSON.stringify(response);
        $("#response").text(data);
        }
