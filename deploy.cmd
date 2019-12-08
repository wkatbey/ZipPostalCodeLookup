 @echo off
    IF "%DEPLOYMENT_PROJECT%" == "ui" (
      deploy.ui.cmd
    ) ELSE (
      IF "%DEPLOYMENT_PROJECT%" == "api" (
        deploy.api.cmd
      ) ELSE (
        echo DEPLOYMENT_PROJECT must be set to either 'ui' or 'api'
        exit /b 1
      )
    )