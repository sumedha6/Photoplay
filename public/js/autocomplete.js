$( function() {
    var availableTags = [
      "happy",
      "sad",
      "surprised",
      "contemplating",
      "angry",
      "disgust",
      "fear",
      "neutral"
          ];
    $( "#tags" ).autocomplete({
      source: availableTags
    });
  } );