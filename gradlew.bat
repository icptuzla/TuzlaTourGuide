@echo off
setlocal

REM Convenience wrapper: run the Android Gradle build from the project root.
cd /d "%~dp0android" || exit /b 1
call gradlew.bat %*

