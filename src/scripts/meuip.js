function meuIp(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", 'http://meuip.com/api/meuip.php');
    xmlhttp.send();
    return xmlhttp.response
}



