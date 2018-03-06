echo "usage deploy.cmd <resource_group> <storage_account_name> <location> <function_app_name> <azure_git_username> <api_key>"

call az group create --name %1 --location %3
call az storage account create --name %2 --location %3 --resource-group %1 --sku Standard_LRS
call az functionapp create --deployment-local-git --resource-group %1 --consumption-plan-location %3 --name %4 --storage-account %2 
call az functionapp config appsettings set --resource-group ocr-azure-function-demo --name ocr-azure-function-demo --settings apiKey=%6 endpoint=%3.api.cognitive.microsoft.com
call git remote add azure https://%5@%4.scm.azurewebsites.net:443/%4.git
call git push azure