import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = firebase.auth();
// firestore : 추가 | 삭제 | 수정 관련 작업을 수행할 수 있다.
export const dbService = firebase.firestore();
/* 
  Storage는 기본 앱 또는 지정된 앱에 대한 서비스를 가져온다. 
  기본 앱의 서비스에 액세스하거나 특정 앱과 연결된 서비스에 액세스하기 위해 호출할 수 있다.
*/
export const storageService = firebase.storage();