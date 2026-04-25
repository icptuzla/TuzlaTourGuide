# Android Play Store Deployment

## 1) Runtime and prerequisites

- Use WSL Node: `25.8.0`
- Use npm from that Node version
- Java JDK path on Windows:
  `C:\Program Files\Android\Android Studio\jbr`

## 2) Set Node in WSL

```bash
wsl bash -lc '. ~/.nvm/nvm.sh; nvm use v25.8.0'
```

## 3) Build and sync web assets

```bash
wsl bash -lc '. ~/.nvm/nvm.sh; nvm use v25.8.0 >/dev/null; cd /mnt/g/Tuzla; npm run sync:android'
```

## 4) Signing config

1. Copy `android/keystore.properties.example` to `android/keystore.properties`
2. Fill real values from your release keystore
3. Keep the `.jks` file in `android/app/` (or adjust `storeFile`)

## 5) Increase app version for each release

Edit `android/gradle.properties`:

- `APP_VERSION_CODE` (must increase every release)
- `APP_VERSION_NAME` (user-facing version string)

## 6) Build release APK + AAB

From PowerShell:

```powershell
$env:JAVA_HOME='C:\Program Files\Android\Android Studio\jbr'
$env:Path="$env:JAVA_HOME\bin;$env:Path"
cd android
.\gradlew.bat assembleRelease bundleRelease
```

## 7) Artifacts

- APK: `android/app/build/outputs/apk/release/app-release.apk`
- AAB: `android/app/build/outputs/bundle/release/app-release.aab`

## 8) Optional local cleanup

```bash
wsl bash -lc '. ~/.nvm/nvm.sh; nvm use v25.8.0 >/dev/null; cd /mnt/g/Tuzla; npm run clean'
```
