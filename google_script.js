function onOpen() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var menuEntries = [
        {name: "Download UHH dataset", functionName: "importUhhData"}
    ];
    ss.addMenu("SloMo", menuEntries);
    ss.removeMenu("SloMo 1");
}

var ss;

function importUhhData() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    var prodSheet = ss.getSheetByName("PROD");
    if (prodSheet == null)
        prodSheet = ss.insertSheet("PROD");
    else if (prodSheet.getLastRow() > 0)
        prodSheet.deleteRows(1, prodSheet.getLastRow())
    getJsonData("http://innertiming.slomo.uni-hamburg.de/xpresults", prodSheet);

    var labSheet = ss.getSheetByName("LAB");
    if (labSheet == null)
        labSheet = ss.insertSheet("LAB");
    else if (labSheet.getLastRow() > 0)
        labSheet.deleteRows(1, labSheet.getLastRow())
    getJsonData("http://innertiming.slomo.uni-hamburg.de/lab/xpresults", labSheet);

    var devSheet = ss.getSheetByName("DEV");
    if (devSheet == null)
        devSheet = ss.insertSheet("DEV");
    else if (devSheet.getLastRow() > 0)
        devSheet.deleteRows(1, devSheet.getLastRow())
    getJsonData("http://innertiming.slomo.uni-hamburg.de/dev/xpresults", devSheet);

}

function getJsonData(url, sheet) {
    var responseString = UrlFetchApp.fetch(url).getContentText();
    response = JSON.parse(responseString);

    var rows = [],
        data;

    rows.push(["tries",
        "no_of_entries",
        "bpm",
        "cv",
        "intervals",
        "date",
        "lat",
        "long",
        "accuracy",
        "userAgent",
        "date_of_birth",
        "gender",
        "heritage",
        "city_size",
        "q1",
        "q2",
        "q3",
        "q4",
        "q5",
        "q6",
        "q7"])

    for (i = 0; i < response.length; i++) {
        data = response[i];
        rows.push([data.tries,
            data.no_of_entries,
            data.bpm,
            data.cv,
            data.intervals,
            data.date,
            data.lat,
            data.long,
            data.accuracy,
            data.userAgent,
            data.date_of_birth,
            data.gender,
            data.heritage,
            data.city_size,
            data.q1,
            data.q2,
            data.q3,
            data.q4,
            data.q5,
            data.q6,
            data.q7]);
    }

    dataRange = sheet.getRange(1, 1, rows.length, 20);
    dataRange.setValues(rows);
}

function someFunction() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheets = ss.getSheets();
    var sheet = ss.getActiveSheet();

    var dataSet = [
        {"id": "xyz", "name": "xy"},
        {"id": "zyx", "name": "yx"}
    ];
    var rows = [],
        data;

    for (i = 0; i < dataSet.length; i++) {
        data = dataSet[i];
        rows.push([data.id, data.name]);
    }

    dataRange = sheet.getRange(1, 1, rows.length, 2);
    dataRange.setValues(rows);

}
