$('#btn').click(function() {
    var file = document.getElementById('upload-input').files[0];
    var apiUrl = "https://api.projectoxford.ai/emotion/v1.0/recognize";
    var apiKey = "6e1e8ccb31204ae7a636b502b3c93511";
    var result = $('#response');
    var value = response.faceRectangle;
    console.log("filename:::::", file.name);


    CallAPI(file, apiUrl, apiKey);
    // Emotion(value);
    ProcessResult(file);

});


function CallAPI(file, apiUrl, apiKey) {

    var name = file.name;
    $.ajax({
            url: apiUrl,
            beforeSend: function(xhrObj) {
                // Request headers
                xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", apiKey);
            },
            type: "POST",
            processData: false,
            data: file,
            dataType: 'json'

        })
        .done(function(response) {
            console.log(".done", response)
            ProcessResult(response, name);
            //  for (var i = 0; i < response.length; i++) {
            //      var data = JSON.stringify(response[i].scores);


            //      $('#response').append(data);

            //      console.log("MY ARRAY", data)
            //      $.ajax({
            //          url: '/upload',
            //          type: 'POST',
            //          data: { emotion: data, name: name },
            //          // processData: false,
            //          contentType: 'application/json',
            //          success: function(data) {
            //              console.log('upload successful', data);
            //          },

            //      });

            //  }




        })


    .fail(function(error) {
        $("#response").text(error.getAllResponseHeaders());
    });
}


function ProcessResult(response, name) {
    for (var i = 0; i < response.length; i++) {

        var data=[response[i].scores.happiness,response[i].scores.anger,response[i].scores.contempt,response[i].scores.fear,response[i].scores.sadness,response[i].scores.surprise];
        var max=  Math.max.apply(Math,data);


        // $('#response').append(data);

        console.log("helllllllll",max);

        if (max == response[i].scores.happiness) {
            console.log("I'm happy");
            $('#response').append("I'm happy\n");
        } else if (max == response[i].scores.anger) {
            console.log("I'm angry");
            $('#response').append("I'm angry\n");
        } else if (max == response[i].scores.contempt) {
            console.log("I'm contemplating");
            $('#response').append("I'm contemplating\n");
        } else if (max == response[i].scores.sadness) {
            console.log("I'm sad");
            $('#response').append("I'm sad\n");

        } else if (max == response[i].scores.surprise) {
            console.log("I'm surprised");
            $('#response').append("I'm surprised\n");
        }

    console.log(":data::", data);
    $.ajax({
        url: '/upload',
        type: 'POST',
        data: JSON.stringify({
             emotion: data,
             name: name
         }),
        // processData: false,
        contentType: 'application/json',
        success: function(data) {
            console.log('upload successful', data);
        },

    });
  }
    console.log('data', data, name);

}
