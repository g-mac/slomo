function onOpen() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var menuEntries = [
        {name: "Download MLAB dataset", functionName: "importMLabData"}
    ];
    ss.addMenu("SloMo", menuEntries);
    ss.removeMenu("SloMo 1");
}

function importMLabData() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    // var sheet = ss.getActiveSheet();

    var prodSheet = ss.getSheetByName("PROD");
    if(prodSheet==null)
        prodSheet = ss.insertSheet("PROD");
    getJsonData("https://api.mlab.com/api/1/databases/slomo_mlab_db/collections/xpresults?apiKey=JGRi1YtRl0XpJqfrkULg_zrmLoJceS_m",prodSheet);

    var labSheet = ss.getSheetByName("LAB");
    if(labSheet==null)
        labSheet = ss.insertSheet("LAB");
    getJsonData("https://api.mlab.com/api/1/databases/slomo_mlab_db_lab/collections/xpresults?apiKey=JGRi1YtRl0XpJqfrkULg_zrmLoJceS_m",labSheet);

    var devSheet = ss.getSheetByName("DEV");
    if(devSheet==null)
        devSheet = ss.insertSheet("DEV");
    getJsonData("https://api.mlab.com/api/1/databases/slomo_mlab_db_dev/collections/xpresults?apiKey=JGRi1YtRl0XpJqfrkULg_zrmLoJceS_m",devSheet);

}

function getJsonData(url, sheet){
    var responseString = UrlFetchApp.fetch(url).getContentText();
    response = JSON.parse(responseString);

    var rows = [],
        data;

    rows.push(["tries",
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
    sheet.getRa
    dataRange.setValues(rows);
}

function someFunction() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheets = ss.getSheets();
    var sheet = ss.getActiveSheet();

    var dataSet = [
        {"id":"xyz","name":"xy"},
        {"id":"zyx","name":"yx"}
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
