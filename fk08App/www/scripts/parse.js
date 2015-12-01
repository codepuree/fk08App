/*
 * This file handles the parsing of intern and extern data.
 */

/* =============================== Functions ================================ */
function ajax(obj) {
    var hr = new XMLHttpRequest();

    if (typeof (obj.type) == "undefined") {
        obj.type = "POST";
    }

    hr.open(obj.type, obj.url, true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    if (obj.referer) {
        hr.setRequestHeader("X-Alt-Referer", obj.referer);
    }

    if (obj.dataType == "xml") {
        hr.responseType = "document";
    }
    hr.onreadystatechange = function () {
        if (hr.readyState == 4 && hr.status == 200) {
            var res;
            if (obj.dataType && obj.dataType.toUpperCase() == "XML") {
                res = hr.responseXML;
                console.log("RES: " + res);
            } else if (obj.dataType && obj.dataType.toUpperCase() == "JSON") {
                res = JSON.parse(hr.responseText);
            } else if (obj.dataType && obj.dataType.toUpperCase() == "CSV") {
                res = csvToTable(hr.responseText);
            } else {
                res = hr.responseText;
            }

            obj.callback(res);
        }
    };

    // Send to server
    var vars = "";
    if (typeof (obj.vars) != "undefined" && obj.vars.length > 0) {
        for (var i in obj.vars) {
            vars += i + "=" + obj.vars[i] + "&";
        }
        vars = vars.substring(0, vars.length - 1);
        console.log("VARS: " + vars);
    }
    hr.send(vars);
}

/* ########################################################################## */

function parseRSSFeed(url, toGet, callback) {
    ajax({
        url: url,
        type: "GET",
        dataType: "xml",
        callback: function (feed) {
            console.log(feed);
            var items = feed.getElementsByTagName("item"),
                data = [];

            console.log(items);

            for (var iItem in items) {
                var item = items[iItem],
                    dataObj = {};

                for (var iToGet in toGet) {
                    if (item && item.getElementsByTagName && item.getElementsByTagName(toGet[iToGet])[0]) {
                        dataObj[iToGet] = item.getElementsByTagName(toGet[iToGet])[0].childNodes[0].nodeValue.trim();
                    }
                }

                //if (!isEmpty(dataObj)) {
                    data.push(dataObj);
                //}
            }

            for (var iData in data) {
                console.log(data[iData]);
            }

            callback(data);
        }
    });
}

/* ########################################################################## */

parseRSSFeed(
    "http://fachschaft08.de/index.php/feed/",
    {
        "title": "title",
        "link": "link",
        "description": "description",
        "pubDate": "pubDate",
        "creator": "creator"
    },
    function (data) {
        if (typeof (window.localStorage.fs08) == "undefined" || !window.localStorage.fs08.startsEndsWith("{", "}")) {
            window.localStorage.fs08 = "{\"data\": {}, \"lastUpdate\": \"00.00.00\"}";
        }

        window.localStorage.fs08 = JSON.stringify({
            data: data,
            lastUpdate: new Date()
        });
    }
);

/* ========================================================================== */