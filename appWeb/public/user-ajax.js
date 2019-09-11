$(document).ready(function(){
    $("form#registerUser").on('submit', function(e){
        e.preventDefault();
        var name = $('input[name=name]').val();
        var email = $('input[name=email]').val();
        var password = $('input[name=password]').val();
        var body = { "name": name, "email": email, "password":password}
        $.ajax({
            type: 'post',
            url: 'http://localhost:3000/api/signup',
            data: body,
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded'
        })
        .done(function(data){
            $('h1').html(data.quote);
        });
    });
});

