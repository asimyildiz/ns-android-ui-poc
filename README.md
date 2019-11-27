# beIN TV UI
digiturk (beIN Media Group) POC for Android TV using nativescript and vue

## Project initial steps
- Project uses beINFW package which needs to be published to local npm registry (verdaccio)
- Project uses nativescript-image-colors plugin which needs to be published to local npm registry (verdaccio) which is updated to work with Nativescript v6 from my repository
```
npm config set registry http://localhost:4873
```
- Project is tested on an Android TV emulator

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
tns run anroid
```

## Use application
- Open Android TV emulator
- Click to open the application
- Press a movie on home screen to navigate a movie detail page (POC)
- Press Movies on home screen to fetch category tree and contents from service
- Press a movie content to navigate a movie detail page which uses nativescript-image-colors
```
