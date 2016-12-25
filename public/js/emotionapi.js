 $('#btn').click(function() {
            var file = document.getElementById('upload-input').files[0];
            var apiUrl = "https://api.projectoxford.ai/emotion/v1.0/recognize";
            var apiKey = "6e1e8ccb31204ae7a636b502b3c93511";
            var result = $('#response');
            var value = response.faceRectangle;

            CallAPI(file, apiUrl, apiKey);
            // Emotion(value);
            ProcessResult(file);

        });


        function CallAPI(file, apiUrl, apiKey) {


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
                    for (var i = 0; i < response.length; i++) {
                        var data = JSON.stringify(response[i].scores);


                        $('#response').append(data);

                        console.log("MY ARRAY", data)
                        $.ajax({
                            url: '/upload',
                            type: 'POST',
                            data: data,
                            // processData: false,
                            contentType: 'application/json',
                            success: function(data) {
                                console.log('upload successful', data);
                            },

                        });

                    }




                })


            .fail(function(error) {
                $("#response").text(error.getAllResponseHeaders());
            });
        }


        function ProcessResult(response) {
            for (var i = 0; i < response.length; i++) {
                var data = JSON.stringify(response[i].scores);


                $('#response').append(data);

            }
            console.log(":data::", data);
            $.ajax({
                url: '/upload',
                type: 'POST',
                data: data,
                // processData: false,
                contentType: 'application/json',
                success: function(data) {
                    console.log('upload successful', data);
                },

            });
            console.log('data', data);

        }