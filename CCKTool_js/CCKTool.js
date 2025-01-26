$(document).ready(function() {

    const image_input = document.querySelector("#image-input");

    image_input.addEventListener("change", function() {
      const reader = new FileReader();
      document.querySelector("#imgblock").innerHTML = "<img id='display-image' src='"+URL.createObjectURL(this.files[0])+"'>";
      reader.addEventListener("load", () => {
        const uploaded_image = reader.result;
        document.querySelector("#display-image").onload = () => {
              URL.revokeObjectURL(document.querySelector("#display-image").src);  // no longer needed, free memory
        }
        document.querySelector("#display-image").src = URL.createObjectURL(this.files[0]); // set src to blob url
        var test = $("#display-image").duotone();
    
        $('#update').on('click', function(e) {
            duotonecolor();
        });
        
        $('.ccktool-platte').on('click', function(e) {
            var color = this.id;
            $("#start").val("#"+color);
            $("#end").val("#ffffff");
            duotonecolor();
        });
        
        function duotonecolor(){
            start = $("#start").val();
            end = $("#end").val();
            contract = $("#cckRange").val();
            gradient = start + ' ' + contract + '%, ' + end;
            $("#display-image").duotone('defaults', {
              gradientMap: gradient,
              hdpi:true
            }).duotone('process');
        }
        
      });
      reader.readAsDataURL(this.files[0]);
    });


    var slider = document.getElementById("cckRange");
    var output = document.getElementById("contract");
    output.innerHTML = slider.value;

    slider.oninput = function() {
      output.innerHTML = this.value;
      duotonecolor();
    }

});

