const cognitiveServices = require('cognitive-services');
const config = require('./config.js');
module.exports = function (context, ocrInputBlob) {
    context.log("JavaScript blob trigger function processed blob \n Name:", context.bindingData.name, "\n Blob Size:", ocrInputBlob.length, "Bytes");
    const client = new cognitiveServices.computerVision({
        apiKey: config.apiKey,
        endpoint: config.endpoint
    });
    const parameters = {
        "language": "unk",
        "detectOrientation": "true"
    };
    const headers = {
        'Content-type': 'application/json'
    };
    const body = {
        "url": context.bindingData.uri
    };

    client.ocr({
        parameters,
        headers,
        body
    }).then((response) => {
        var text = "";
        response.regions.forEach( region => {
            region.lines.forEach( line => {
                line.words.forEach ( word => {
                    text += " " + word.text;
                });
            });
        });
        context.log(text);
        context.bindings.recognizedText = { 
            "uri" : context.bindingData.uri,
            "text" : text
        };
        context.done();
    }).catch((err) => {
        context.log("bad");
        context.done();
    });
};