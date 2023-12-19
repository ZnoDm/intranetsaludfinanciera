// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appVersion: 'v726demo1',
  USERDATA_KEY: 'authf649fc9a5f55',
  isMockEnabled: true,

  apiUrl: 'http://localhost:3000/api',

  apiNewsUrl: 'https://newsapi.org/v2',
  apiNewsKey: 'e51fbc55994e45afbe1ccde7a5620c0e',
  apiNewsMediaUrl: 'http://api.mediastack.com/v1/news',
  apiNewsMediaKey: 'a7fecab9f72c75221ba500292392c6a1',



  firebaseConfig : {
    apiKey: "AIzaSyADmRuv4oe9klWtsE4TKPvJzA3fNTC1u5g",
    authDomain: "nelsontest-e2954.firebaseapp.com",
    projectId: "nelsontest-e2954",
    storageBucket: "nelsontest-e2954.appspot.com",
    messagingSenderId: "985550942616",
    appId: "1:985550942616:web:b8ed19adf028a93709fbed"
  }


};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
