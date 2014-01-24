$(document).ready(function(){
    $( "#chat-container" ).draggable();

    $("#send-button").click(function(){
        sendMessage();
    });

    $("#chat-input").keypress(function(e){
        if (e.keyCode==13){
            sendMessage();
        }
    });

    function sendMessage(){
        var $text = $("#chat-input").val();
        var $user = $("#chat-user").val();
        if ($text && $user) {
            $.ajax("/chat/handle/?Text="+$text+"&User="+$user)
            $("#chat-input").val("");
        }
        else {
            $("#chat-main").append("<p>Please enter user and message</p>");
        }
    };

    setInterval(function(){
        $.ajax("/chat/handle/?id="+String(getLastID()))
            .done(function(result){
                    /*Ответ не пустой, Если в ответе содержится параграф*/
                    if(result.indexOf("</p>") != -1 ){
                        var $chatMain = $("#chat-main");
                        $chatMain.append(result);
                        /* $chatMain[0].scrollHeight из jqobject взять обычный обьект js и получить высоту chatmain
                        *  chatMain.scrollTop присвоить ее текущей позиции scroll*/
                        $chatMain.scrollTop($chatMain[0].scrollHeight);

                    }
            });
    },1500);

    function getLastID(){
        /*
        Возвращает последнее значение ID в чате
         */
        var strLastElement = $(".message-id").last().text();
        var lastID = strLastElement.substring(1);
        return lastID
    }
});
