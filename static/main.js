$(function() {
    $("#file-picker").change(function() {

        var input = document.getElementById('file-picker');

        for (var i = 0; i < input.files.length; i++) {
            //koala.jpg, koala.JPG substring(index) lastIndexOf('a') koala.1.jpg
            var ext = input.files[i].name.substring(input.files[i].name.lastIndexOf('.') + 1).toLowerCase()

            if (ext == 'txt') {
                $("#msg").text("Files are supported")
            } else {
                $("#msg").text("Files are NOT supported")
                document.getElementById("file-picker").value = "";
            }

        }
    });

    $(".lines").change(function(){
        var cont = false;
        $.each($(".lines"), function(index, val) {
             if($(val).val()!=''){
                $(".lines").attr("required","required");
                cont = true;
             }
        });
        if(cont == false){
            $(".lines").removeAttr("required");
        }

    });

    $("#upload-form").submit(function(e) {
	
        var name, firstLine, lastLine;
        var file = $("#file-picker").prop('files')[0];
        var data_ = new FormData();
        data_.append('file', file);

        name = ($("#file-name").val() != '') ? $("#file-name").val() : '--';
        first_line = ($("#file-firstL").val() != '') ? $("#file-firstL").val() : -1;
        last_line = ($("#file-lastL").val() != '') ? $("#file-lastL").val() : -1;

        
        $.ajax({
                url: "http://localhost:4555/upload/" + name + "/" + first_line + "/" + last_line,
                type: 'POST',
                dataType: "html",
                data: data_,
                cache: false,
                contentType: false,
                processData: false
            })
            .done(function(response) {
                var jsonObj = JSON.parse(response);
                var jsonPretty = JSON.stringify(jsonObj, null, '\t');
                $("pre").text(jsonPretty);
                $("pre").parent().removeClass('d-none');
            })
            .fail(function(response) {
                console.log("error");
                console.log(response);
            })

        e.preventDefault();
    });
});