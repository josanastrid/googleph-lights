// Settings to show the logs in the UI
var debug = false;

// Constants
var ACCESS_TOKEN = "1cbecd9ffc3dce4352254089a1ca360f8bf99012"
var DEVICE_ID = "190029001247353236343033"

$(document).ready(function(){

  // Show the spinner
  $(".spinner").fadeIn();

  // Hide the rgbValues from the UI if you're not debugging
  if(!debug){
    $('.debug').hide()
  }

})

// Get and listen to state changes from Firebase Database to sync with the UI's background
firebase.database().ref().child("devices").child(DEVICE_ID).on('value', function syncBackground(snap){

    // Current state of the device
    var command = snap.val();

    // Get the color of the command button
    if(command !== 'play'){
      var color = $('.' + command).css('background-color')
      $('body').css('background-color', color)
    }

    // Hide the spinner
    $(".spinner").hide();

})

// Change the color upon click
$('.color').click(function(){

  // Show the spinner
  $('.spinner').fadeIn();

  /*
  * Gets the command from the clicked button
  * Command values could be red, green, blue, yellow, and off
  */
  var command = this.attributes['data-command'].value;

  // Build the URL with the DEVICE_ID and the ACCESS_TOKEN
  var url = "https://api.particle.io/v1/devices/"
        + DEVICE_ID + "/strip?access_token=" + ACCESS_TOKEN;

  // Change the background color of the body
  var button = $(this)

  // Send an AJAX POST request to particle
  $.ajax({
    url: url,
    data: {
      args: command
    },
    method: 'POST',
    timeout: 10000,
    error: function(response){
      alert("Sorry, we lost connection with the device.")
    }
  })

  // After the AJAX request
  .done(function(response){
    // Check if the device is connected
    if(response.connected == true){

      if(command !== 'play'){
        var color = button.css('background-color')
        $('body').css('background-color', color)
      }

      // Save device's current state to Firebase
      firebase.database().ref("devices/"+DEVICE_ID).set(command).then(function(){
        console.log('State saved to database')
      })

    } else {
      alert("Sorry, we lost connection with the device.")
    }

    // Hide the spinner
    $('.spinner').hide();

  })

})
