
let API_URL = "http://localhost:3001/send"


function Send(event){
    event.preventDefault();
    console.log("send")

    $.ajax({
        url: API_URL,
        type: 'GET',
        data: {},
        crossDomain:true,
        dataType: 'json',
        success : function(data) {              
            alert('Data: '+data);
        },
        error : function(request,error)
        {
            alert("Request: "+JSON.stringify(request));
        }
    });

}