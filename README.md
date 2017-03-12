# react-native-demo
A simple app to display json data from RESTful API.
Currently only available in IOS.

## Prerequisite
For detail please refer to react-native website [here](https://facebook.github.io/react-native/docs/getting-started.html)
* node & npm  
installation: [click here](https://docs.npmjs.com/getting-started/installing-node) or `brew install node`
* react-native  
installation:  
 * `brew install watchman`  
 * `npm install -g react-native-cli`  
* xcode8  


## Compile
1. `npm install`  
Install npm packages for project.  
2. `react-native run-ios`  
App will start in IOS emulator.
3. If you want to run on real device. Open Xcode with `ios/MotherApp.xcodeproj/project.pbxproj` and build in Xcode.

## Logic
When fetching API, the user will be separate into two groups.  

Normal: user which is not late more than 2 times in the same calendar month.  
Late: user which has 3 or more late record in the same calendar month.

This can be changed in the `filterUsers()` in `app/components/List/index.js`.
