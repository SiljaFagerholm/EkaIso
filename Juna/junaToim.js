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
//var klo;
var optiot = { hour: '2-digit', minute: '2-digit', hour12: false, };
//  /live-trains/station/<departure_station_code>/<arrival_station_code>?departure_date=<departure_date>&from=<from>&to=<to>&limit=<limit>
$(document).ready(function () {
    var kohta = new Date();
    var nyt = new Date();
    kohta.addHours(24);
    nyt.addHours(3);
    $("#lAika").val(nyt.toISOString().slice(0, -8));
    $("#sAika").val(kohta.toISOString().slice(0, -8));
    //$("#btn2").click(function () {
    //    var tulos2 = JSON.parse(xhr.responseText);
        //ei ehdi tekemään
    //        haedata();
       

    //    }
    //});
}); 
Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;    
}

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            // Tehdään jotakin, pyyntö on valmis
            var tulos = JSON.parse(xhr.responseText);
            console.dir(tulos);
            for (var i = 0; i < 10; ++i) {
                //var elem = document.createElement("li");
                var juna = tulos[i];
                var katek = juna.trainCategory;
                var jnro = juna.trainNumber;
                
                var tyyppi = juna.trainType;

                if (katek === "Long-distance") {
                    katek = "Kaukojuna"+ " " + tyyppi + " " + jnro;
                }
                
                else {
                    katek = "Lähijuna";
                }

                var lahtoaika = new Date(juna.timeTableRows[0].scheduledTime).toLocaleTimeString("fi", optiot);
                var laht = lahtoaika.bold();
                //var saapumisaika = new Date(juna.timeTableRows[juna.timeTableRows.length-1].scheduledTime).toLocaleTimeString("fi", {hour: '2-digit', minute:'2-digit', hour12: false});
                var saapumisaika = new Date(getSaapumisaika(juna.timeTableRows, $("#kv2").val())).toLocaleTimeString("fi", optiot);
                var saap = saapumisaika.bold();
                // elem.appendChild(document.createTextNode("lähtee: " + lahtoaika + " saapuu: " + saapumisaika + " "+ katek + " " + juna.commuterLineID));
                $('<li>'+"lähtee: " + laht + " saapuu: " + saap + " " + katek + " " + juna.commuterLineID + '<li/>').appendTo("#tulostus");
                //lista.appendChild(elem);
               
                
                
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
    document.getElementById("tulostus").innerHTML = " ";
    // lPaikka = $("#kaupunkivalikko1").val();
    lPaikka = $("#kv1").val();
    lPaikka = "/" + lPaikka;
    // sPaikka = $("#kaupunkivalikko2").val();
    sPaikka = $("#kv2").val();
    sPaikka = "/" + sPaikka;

    //pvm = $("#lAika").val();
    //pvm = "?departure_date=" + pvm;
    var alHaku = new Date($("#lAika").val());
    alHaku = "startDate=" + alHaku.toISOString();
    console.log(alHaku);
    var loHaku = new Date($("#sAika").val());
    loHaku = "endDate=" + loHaku.toISOString();
    //klo = $("#time1").val();
    //klo = "T" + klo + ":00.000Z";
    console.log(lPaikka);
    console.log(baseurl + lPaikka + sPaikka + "?" + alHaku + "&" + loHaku);
    xhr.open('get', baseurl + lPaikka + sPaikka + "?" + alHaku + "&" + loHaku);
    xhr.send();
    
}

function getSaapumisaika(timetablerows, asema) {
    //var sr=timetablerows.find(function (tr) {
    //    return tr.stationShortCode == asema;
    //});
    //console.dir(sr);
    var sr = timetablerows.find(tr => tr.stationShortCode == asema);
    return sr.scheduledTime;
}

