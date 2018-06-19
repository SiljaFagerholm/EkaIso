$.getJSON("https://rata.digitraffic.fi/api/v1/metadata/stations", function (data) {
    
    for (var i = 0; i < data.length; i++) {

        if (data[i].passengerTraffic === true) {
        
        $('<option value="' + data[i].stationShortCode + '">' + data[i].stationName + '</option>').appendTo("#kaupunkivalikko1");
        $('<option value="' + data[i].stationShortCode + '">' + data[i].stationName + '</option>').appendTo("#kaupunkivalikko2");
        }
    }
           
});

