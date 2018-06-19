//Dropdown buttonin koodi
//function myFunction2() {
//    document.getElementById("myDropdown2").classList.toggle("show");
//}
//function myFunction() {
//    document.getElementById("myDropdown").classList.toggle("show");
//}

//// Close the dropdown if the user clicks outside of it
//window.onclick = function (event) {
//    if (!event.target.matches('.dropbtn')) {

//        var dropdowns = document.getElementsByClassName("dropdown-content");
//        var i;
//        for (i = 0; i < dropdowns.length; i++) {
//            var openDropdown = dropdowns[i];
//            if (openDropdown.classList.contains('show')) {
//                openDropdown.classList.remove('show');
//            }
//        }
//    }
//}

var baseurl = "https://rata.digitraffic.fi/api/v1/live-trains/station";
var lPaikka;
var sPaikka;
var pvm;
//var klo;
var optiot = { hour: '2-digit', minute: '2-digit', hour12: false };
//  /live-trains/station/<departure_station_code>/<arrival_station_code>?departure_date=<departure_date>&from=<from>&to=<to>&limit=<limit>



var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            // Tehdään jotakin, pyyntö on valmis
            var tulos = JSON.parse(xhr.responseText);
            console.dir(tulos);
            for (var i = 0; i < tulos.length; ++i) {
                var elem = document.createElement("li");
                var juna = tulos[i];
               
                var lahtoaika = new Date(juna.timeTableRows[0].scheduledTime).toLocaleTimeString("fi", { hour: '2-digit', minute: '2-digit', hour12: false });
                //var saapumisaika = new Date(juna.timeTableRows[juna.timeTableRows.length-1].scheduledTime).toLocaleTimeString("fi", {hour: '2-digit', minute:'2-digit', hour12: false});
                var saapumisaika = new Date(getSaapumisaika(juna.timeTableRows, $("#kaupunkivalikko2").val())).toLocaleTimeString("fi", optiot);
                elem.appendChild(document.createTextNode(juna.trainCategory + ": " + juna.trainType + juna.trainNumber + ", lähtee: " + lahtoaika + " saapuu: " + saapumisaika));
                lista.appendChild(elem);
            }
            //document.getElementById("hae").innerText = "Hae data uudestaan painamalla nappulaa:";
            document.getElementById("haku");
        } else {
            alert("Pyyntö epäonnistui");
            //document.getElementById("hae").innerText = "Hae data uudestaan painamalla nappulaa:";
            document.getElementById("haku");
        }
    }

};
var lista = document.getElementById("tulostus");
function haedata() {
    
    lPaikka = $("#kaupunkivalikko1").val();
    lPaikka = "/" + lPaikka;
    sPaikka = $("#kaupunkivalikko2").val();
    sPaikka = "/" + sPaikka;
    pvm = $("#lAika").val();
    pvm = "?departure_date=" + pvm;
    //klo = $("#time1").val();
    //klo = "T" + klo + ":00.000Z";
    console.log(lPaikka);
    console.log(baseurl + lPaikka + sPaikka + pvm);
    xhr.open('get', baseurl + lPaikka + sPaikka + pvm);
    xhr.send();
}
haedata();
function getSaapumisaika(timetablerows, asema) {
    //var sr=timetablerows.find(function (tr) {
    //    return tr.stationShortCode == asema;
    //});
    //console.dir(sr);
    var sr = timetablerows.find(tr => tr.stationShortCode == asema);
    return sr.scheduledTime;
}
