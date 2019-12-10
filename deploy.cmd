@echo off
IF "%DEPLOYMENT_PROJECT%" == "ui" (
    deploy.ui.cmd
) ELSE (
    IF "%DEPLOYMENT_PROJECT%" == "api" (
    deploy.api.cmd
    ) ELSE (
    echo You have to set the DEPLOYMENT_PROJECT setting to either "ui" or "api"
    exit /b 1
    )
)