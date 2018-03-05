# ocr-azure-function-demo
This is a simple Azure Functions demo that uses blob triggers to run ocr on top of an uploaded image. The recognized text will be written into a message queue.

## run the demo locally
install the node packages: 

 ```npm install```

 install the function runtime (run the command in an elevated shell):

 ```npm install -g azure-functions-core-tools```

add a `local.settings.json` file containing the following values:

```js
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "YOUR STORAGE KEY"
  }
}
```

 add a `config.js` to the OCRFunc folder containing teh following values (you get your apiKey [here](https://azure.microsoft.com/en-us/try/cognitive-services/?api=computer-vision):

 ```js
 module.exports = {
    endpoint: "northeurope.api.cognitive.microsoft.com",
    apiKey: "YOUR_KEY"
}
```

create a blob container named `inputimages` (e.g. using [azure storage explorer](https://azure.microsoft.com/en-us/features/storage-explorer/))

run the local function host (you can remove `--debug vscode` if you don't want to debug the function)

```func host start --debug vscode```

upload a image containing text into the `inputimages` blob container (e.g. using [azure storage explorer](https://azure.microsoft.com/en-us/features/storage-explorer/))

Check the result in the `textinput` (e.g. using [azure storage explorer](https://azure.microsoft.com/en-us/features/storage-explorer/))


