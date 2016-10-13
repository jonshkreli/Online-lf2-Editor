/**
 * Created by pa kod on 27-Sep-16.
 */
var fs = require('fs');
fs.readFile('readme.txt', function (err, data) {
    if (err) {
        return console.error(err);
    }
    console.log("Asynchronous read: " + data.toString());
});