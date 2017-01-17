var debug = true;

$(document).ready(function(){

  if(!debug){
    $('rgbvalues').hide()
  }

})


// Change the color upon click
$('.color').click(function(){

  // In rgb(255,255,255) format
  var color = $(this).css('background-color')

  // Change the background color of the body
  $('body').css('background-color', color)

  // local function to clean rgb values
  function cleanRGB(color){
    color = color.replace(/rgb\(/g, '')
    color = color.replace(/\)/g, '')
    var rgbValues = color.split(',')

    var rgb = {};
    rgb["R"] = rgbValues[0].trim()
    rgb["G"] = rgbValues[1].trim()
    rgb["B"] = rgbValues[2].trim()

    return rgb
  }

  // Get the RGB values in this format
  // todo: check with IOT format
  /*

    {
      R: 255,
      G: 255,
      B: 255
    }
  */
  var rgbValues = cleanRGB(color)

  // Set the RGB values based on letter
  // todo: make /path or input for all the G-o-o-g-l-e letters
  firebase.database().ref("LUZON").set(rgbValues)
    .then(function(){
      var r = rgbValues.R
      var g = rgbValues.G
      var b = rgbValues.B
      $('.rgbValues').html(r + ", " + g + ", " + b)
    })

})
