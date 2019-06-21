
let API_URL = "http://localhost:3001/send"
let button = document.getElementById('submit')


function Send(event) {
    event.preventDefault();

    button.disabled = true;

    console.log("send")

    




    setTimeout(function () {

        


        $.ajax({
            url: API_URL,
            type: 'GET',
            data: {},
            crossDomain: true,
            dataType: 'json',
            success: function (data) {
                alert('Data: ' + data);
            },
            error: function (request, error) {
                //alert("Request: " + JSON.stringify(request));
            }
        });
    },5000)



   
    

}