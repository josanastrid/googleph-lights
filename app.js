var debug = true;

// Constants
var ACCESS_TOKEN = "1cbecd9ffc3dce4352254089a1ca360f8bf99012"
var DEVICE_ID = "190029001247353236343033"

$(document).ready(function(){

  // Hide the rgbValues from the UI if you're not debugging
  if(!debug){
    $('rgbvalues').hide()
  }

})

// Change the color upon click
$('.color').click(function(){

  var command = this.attributes['data-command'].value;

  /*

  blue
  red
  green
  yellow
  off

  */
  var url = "https://api.particle.io/v1/devices/"
        + DEVICE_ID + "/strip?access_token=" + ACCESS_TOKEN;

  $.ajax({
    url: url,
    data: {
      args: command
    },
    method: 'POST'
  })

  .done(function(response){
    console.log(response)
  })

  // Change the background color of the body
  var color = $(this).css('background-color')
  $('body').css('background-color', color)
  
  // local function to clean rgb values
  // function cleanRGB(color){
  //   color = color.replace(/rgb\(/g, '')
  //   color = color.replace(/rgba\(/g, '')
  //   color = color.replace(/\)/g, '')
  //   var rgbValues = color.split(',')
  //
  //   var rgb = {};
  //   rgb["R"] = rgbValues[0].trim()
  //   rgb["G"] = rgbValues[1].trim()
  //   rgb["B"] = rgbValues[2].trim()
  //
  //   return rgb
  // }

  // Get the RGB values in this format
  // todo: check with IOT format
  /*

    {
      R: 255,
      G: 255,
      B: 255
    }
  */
  // var rgbValues = cleanRGB(color)

  // Set the RGB values based on letter
  // todo: make /path or input for all the G-o-o-g-l-e letters
  // firebase.database().ref("LUZON").set(rgbValues)
  //   .then(function(){
  //     var r = rgbValues.R
  //     var g = rgbValues.G
  //     var b = rgbValues.B
  //     $('.rgbValues').html(r + ", " + g + ", " + b)
  //   })

})
