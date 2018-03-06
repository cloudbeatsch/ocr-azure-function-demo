# ocr-azure-function-demo
This is a simple Azure Functions demo that uses blob triggers to run ocr on top of an uploaded image. The recognized text will be written into a message queue.

## run the demo locally
install the node packages: 

 ```npm install```

install the function runtime (run the command in an elevated shell):

 ```npm install -g azure-functions-core-tools```

add a `local.settings.json` file containing the following values (you get your apiKey [here](https://azure.microsoft.com/en-us/try/cognitive-services/?api=computer-vision)):

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "YOUR STORAGE KEY",
    "endpoint": "northeurope.api.cognitive.microsoft.com",
    "apiKey": "YOUR_KEY"
  }
}
```

create a blob container named `inputimages` (e.g. using [azure storage explorer](https://azure.microsoft.com/en-us/features/storage-explorer/))

run the local function host (you can remove `--debug vscode` if you don't want to debug the function)

```func host start --debug vscode```

upload a image containing text into the `inputimages` blob container (e.g. using [azure storage explorer](https://azure.microsoft.com/en-us/features/storage-explorer/)) - set the public access level to `Public read access for container and blobs`

Check the result in the `textinput` (e.g. using [azure storage explorer](https://azure.microsoft.com/en-us/features/storage-explorer/))

## Run the demo on Azure using deploy.cmd

to deploy the demo, you can simply run the following command (you get your apiKey [here](https://azure.microsoft.com/en-us/try/cognitive-services/?api=computer-vision)):

```deploy.cmd <resource_group> <storage_account_name> <location> <function_app_name> <azure_git_username> <api_key>```

## Run the demo on Azure by deploying it step-by-step

create the resource group:

```az group create --name <yourResourceGroup> --location northeurope```

create the storage account:

```az storage account create --name <storage_name> --location northeurope --resource-group <yourResourceGroup> --sku Standard_LRS```

create the function app:

```az functionapp create --deployment-local-git --resource-group <yourResourceGroup> --consumption-plan-location northeurope --name <app_name> --storage-account  <storage_name>```

configure the app settings (you get your apiKey [here](https://azure.microsoft.com/en-us/try/cognitive-services/?api=computer-vision)):
```az functionapp config appsettings set --resource-group <yourResourceGroup> --name <pp_name> --settings apiKey=<your_key> endpoint=northeurope.api.cognitive.microsoft.com```

create a git remote and push the repo to azure

```https://<your_azure_deployment_username>@<your-function-app-name>.scm.azurewebsites.net:443/<your-function-app-name>.git```

```git remote add azure```

```https://<YOUR-DEPLOYMENT-USER>@<YOUR-FUNCTIONAPP-NAME>.scm.azurewebsites.net:443/<YOUR-FUNCTIONAPP-NAME>.git```

```git push azure```

upload a image containing text into the `inputimages` blob container (e.g. using [azure storage explorer](https://azure.microsoft.com/en-us/features/storage-explorer/)) - set the public access level to `Public read access for container and blobs`

Check the result in the `textinput` (e.g. using [azure storage explorer](https://azure.microsoft.com/en-us/features/storage-explorer/))

delete the deployed resources:

```az group delete --name <yourResourceGroup>```
