/* eslint-disable react-native/no-inline-styles */
import {
  AppState,
  FlatList,
  Image,
  ImageBackground,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import BaseView from '../../hoc/BaseView';
import { images } from '../../../assets/images';
import { colors } from '../../../values/colors';
import CodeInput from '../../../utils/CodeInput';
import { fonts } from '../../../values/fonts';
import ButtonView from '../../components/ButtonView';
import { IS_TABLET, SCREEN_WIDTH } from '../../../values/dimens';
import { showAlert } from '../../../utils/Message';
import { useDispatch } from 'react-redux';
// import {setInterviewType, uploadVimeoVideo} from '../../../redux/actions/homeActions';
// import {INTERVIEWER, MCQ, ONE_WAY, TWO_WAY} from '../../../values/strings';
import { loginUser, setUserPrefs } from '../../../redux/actions/loginActions';
import { loginInstructions } from '../../../json/instructions';
import Icon from 'react-native-vector-icons/Feather';
// import DocumentPicker, {types} from 'react-native-document-picker';
// import { oneWayJson } from '../../../json/OneWayJson';

// const oneWay = 'wertyu';
// const twoWay = 'asdfgh';
// const mcq = 'zxcvbn';
// const interviewer = 'aaasss'; //  FM6Y0N  NPPR7F UZHRHY

const LoginWithCode = props => {

  const baseViewRef = useRef(null);

  const dispatch = useDispatch();

  const [code, setCode] = useState(''); //NPPR7F BXBNCC ZRZ9RU UZHRHY

  // console.log('[LoginWithCode.js] init : ',IS_TABLET)

  // useEffect(() => {
  //   const subscriber = AppState.addEventListener('focus', state => {
  //     // if(state === 'active'){
  //     // }
  //     console.log('[first]')
  //   });
  // }, []);

  const _onSetCode = value => setCode(value);

  const _onConfirm = async () => {
    if (code.length < 6) {
      showAlert('error', 'Please enter a code.');
    } else {
      if (baseViewRef !== null) {
        baseViewRef.current.showLoader();
        loginUser(code)
          .then(response => {
            baseViewRef.current.hideLoader();
            console.log('[LoginWithCode.js] Response => ', response);
            dispatch(setUserPrefs(response.candidateRes));
            props.navigation.replace('Instructions');
          })
          .catch(error => {
            baseViewRef.current.hideLoader();
            console.log('[LoginWithCode.js] Error => ', error);
          });


        // response={
        //   "companyInfo": {
        //       "companyName": "LISA",
        //       "companyLogo": "https://high5vetiingdevstorage.blob.core.windows.net/vettingcontainer//Image/a841c6929f0aa/vincent-van-zalinge-vUNQaTtZeOo-unsplash.jpg.jpg?st=2022-10-12T16%3A42%3A42Z&se=2022-10-20T08%3A02%3A42Z&sp=r&sv=2018-03-28&sr=b&sig=HJq1cY3wT8LijINkproZ3tKU0qFZ7ga0%2FKUbpUhnpTM%3D",
        //       "companyId": ""
        //   },
        //   "reviewer": {
        //       "firstName": "Lisa",
        //       "lastName": "Brown",
        //       "reviewerEmail": "lisa@yopmail.com",
        //       "instructions": "" 
        //   },
        //   "createdBy": {
        //       "id": "6343f79468fddc5b46c249b1",
        //       "firstName": "Lisa",
        //       "lastName": "Brown",
        //       "role": "user",
        //       "companyId": "GKFZS4ED2L",
        //       "projectId": ""
        //   },
        //   "modifiedBy": {
        //       "id": "6343f79468fddc5b46c249b1",
        //       "firstName": "Lisa",
        //       "lastName": "Brown",
        //       "role": "user",
        //       "companyId": "GKFZS4ED2L",
        //       "projectId": ""
        //   },
        //   "startTest": {
        //       "takes": 0
        //   },
        //   "_id": "635fc72d8d8077a398630f43",
        //   "jobId": "",
        //   "jobTitle": "React",
        //   "tags": [
        //       "React"
        //   ],
        //   "skills": [],
        //   "clientName": "",
        //   "firstName": "Ankit",
        //   "lastName": "Pareek",
        //   "email": "akpareek4@gmail.com",
        //   "recruiterEmail": "",
        //   "high5hireCandidateId": "",
        //   "externalIdentifier": "",
        //   "testAssign": {
        //       "project": {
        //           "projectId": "",
        //           "projectName": ""
        //       },
        //       "details": {
        //           "duration": "5",
        //           "passScore": "45",
        //           "qRandom": true,
        //           "oRandom": true,
        //           "numberOfQtoAppear": 2
        //       },
        //       "createdBy": {
        //           "id": "6343f79468fddc5b46c249b1",
        //           "firstName": "Lisa",
        //           "lastName": "Brown",
        //           "role": "user",
        //           "companyId": "GKFZS4ED2L"
        //       },
        //       "modifiedBy": {
        //           "id": "6343f79468fddc5b46c249b1",
        //           "firstName": "Lisa",
        //           "lastName": "Brown",
        //           "role": "user",
        //           "companyId": "GKFZS4ED2L"
        //       },
        //       "email": "",
        //       "_id": "635fc24f8d8077a398630f33",
        //       "testName": "Reeeee",
        //       "difficulty": "Simple",
        //       "skills": [
        //           "ReactJS",
        //           "HTML",
        //           "HTML DOM",
        //           "HTML/CSS",
        //           "HTML5"
        //       ],
        //       "testCategory": "General",
        //       "questions": [
        //         {
        //           "question": "What is document object model?",
        //           "options": [],
        //           "answer": [
        //               ""
        //           ],
        //           "tag": [],
        //           "remark": "",
        //           "type": "Multiline",
        //           "skill": "HTML DOM",
        //           "difficulty": "Simple",
        //           "takes": "1",
        //           "duration": "10",
        //           "marks": null,
        //           "createdBy": {
        //               "id": "6343f79468fddc5b46c249b1",
        //               "firstName": "Lisa",
        //               "lastName": "Brown",
        //               "role": "user",
        //               "companyId": "GKFZS4ED2L",
        //               "projectId": ""
        //           },
        //           "modifiedBy": {
        //               "id": "6343f79468fddc5b46c249b1",
        //               "firstName": "Lisa",
        //               "lastName": "Brown",
        //               "role": "user",
        //               "companyId": "GKFZS4ED2L",
        //               "projectId": ""
        //           },
        //           "imageUrl": "",
        //           "deleted": false,
        //           "_id": "63492496294ee95528fe2a02",
        //           "createdAt": "2022-10-14T08:57:58.992Z",
        //           "updatedAt": "2022-10-14T08:57:58.992Z",
        //           "__v": 0
        //       },
        //       {
        //         "question": "What is Parsing ?",
        //         "options": [],
        //         "answer": [
        //             ""
        //         ],
        //         "tag": [],
        //         "remark": "",
        //         "type": "Multiline",
        //         "skill": "HTML DOM",
        //         "difficulty": "Simple",
        //         "takes": "1",
        //         "duration": "10",
        //         "marks": null,
        //         "createdBy": {
        //             "id": "6343f79468fddc5b46c249b1",
        //             "firstName": "Lisa",
        //             "lastName": "Brown",
        //             "role": "user",
        //             "companyId": "GKFZS4ED2L",
        //             "projectId": ""
        //         },
        //         "modifiedBy": {
        //             "id": "6343f79468fddc5b46c249b1",
        //             "firstName": "Lisa",
        //             "lastName": "Brown",
        //             "role": "user",
        //             "companyId": "GKFZS4ED2L",
        //             "projectId": ""
        //         },
        //         "imageUrl": "",
        //         "deleted": false,
        //         "_id": "63492496294ee95528fe2a02",
        //         "createdAt": "2022-10-14T08:57:58.992Z",
        //         "updatedAt": "2022-10-14T08:57:58.992Z",
        //         "__v": 0
        //     },
        //           {
        //               "createdBy": {
        //                   "id": "6305fd4e3cdfe1421c1c76e1",
        //                   "firstName": "Super",
        //                   "lastName": "Admin",
        //                   "role": "admin",
        //                   "companyId": "",
        //                   "projectId": ""
        //               },
        //               "modifiedBy": {
        //                   "id": "6305fd4e3cdfe1421c1c76e0",
        //                   "firstName": "Super",
        //                   "lastName": "Admin",
        //                   "role": "admin",
        //                   "companyId": "",
        //                   "projectId": ""
        //               },
        //               "_id": "6343f8ff68fddc5b46c249f9",
        //               "question": "Which command is used to render?",
        //               "options": [],
        //               "answer": [
        //                   ""
        //               ],
        //               "tag": [],
        //               "remark": "",
        //               "type": "OneWay",
        //               "skill": "ReactJS",
        //               "difficulty": "Simple",
        //               "takes": "1",
        //               "duration": "10",
        //               "marks": null,
        //               "imageUrl": "",
        //               "deleted": false,
        //               "createdAt": "2022-10-10T10:50:39.343Z",
        //               "updatedAt": "2022-10-10T10:50:39.343Z",
        //               "__v": 0
        //           },
        //           {
        //             "createdBy": {
        //                 "id": "6305fd4e3cdfe1421c1c76e0",
        //                 "firstName": "Super",
        //                 "lastName": "Admin",
        //                 "role": "admin",
        //                 "companyId": "",
        //                 "projectId": ""
        //             },
        //             "modifiedBy": {
        //                 "id": "6305fd4e3cdfe1421c1c76e0",
        //                 "firstName": "Super",
        //                 "lastName": "Admin",
        //                 "role": "admin",
        //                 "companyId": "",
        //                 "projectId": ""
        //             },
        //             "_id": "6343f8ff68fddc5b46c249f9",
        //             "question": "Which command is used Install create-react-app?",
        //             "options": [],
        //             "answer": [
        //                 ""
        //             ],
        //             "tag": [],
        //             "remark": "",
        //             "type": "OneWay",
        //             "skill": "ReactJS",
        //             "difficulty": "Simple",
        //             "takes": "1",
        //             "duration": "10",
        //             "marks": null,
        //             "imageUrl": "",
        //             "deleted": false,
        //             "createdAt": "2022-10-10T10:50:39.343Z",
        //             "updatedAt": "2022-10-10T10:50:39.343Z",
        //             "__v": 0
        //         },
        //           {
        //               "createdBy": {
        //                   "id": "6305fd4e3cdfe1421c1c76e0",
        //                   "firstName": "Super",
        //                   "lastName": "Admin",
        //                   "role": "admin",
        //                   "companyId": "",
        //                   "projectId": ""
        //               },
        //               "modifiedBy": {
        //                   "id": "6305fd4e3cdfe1421c1c76e0",
        //                   "firstName": "Super",
        //                   "lastName": "Admin",
        //                   "role": "admin",
        //                   "companyId": "",
        //                   "projectId": ""
        //               },
        //               "_id": "6343f8ff68fddc5b46c249db",
        //               "question": "What is React?",
        //               "options": [
        //                   "Library",
        //                   "Framework",
        //                   "Language",
        //                   "none of the above"
        //               ],
        //               "answer": [
        //                   "Library"
        //               ],
        //               "tag": [],
        //               "remark": "",
        //               "type": "MCQ",
        //               "skill": "ReactJS",
        //               "difficulty": "Simple",
        //               "takes": "1",
        //               "duration": "10",
        //               "marks": null,
        //               "imageUrl": "",
        //               "deleted": false,
        //               "createdAt": "2022-10-10T10:50:39.343Z",
        //               "updatedAt": "2022-10-10T10:50:39.343Z",
        //               "__v": 0
        //           },
        //           {
        //               "createdBy": {
        //                   "id": "6305fd4e3cdfe1421c1c76e0",
        //                   "firstName": "Super",
        //                   "lastName": "Admin",
        //                   "role": "admin",
        //                   "companyId": "",
        //                   "projectId": ""
        //               },
        //               "modifiedBy": {
        //                   "id": "6305fd4e3cdfe1421c1c76e0",
        //                   "firstName": "Super",
        //                   "lastName": "Admin",
        //                   "role": "admin",
        //                   "companyId": "",
        //                   "projectId": ""
        //               },
        //               "_id": "6343f8ff68fddc5b46c249dc",
        //               "question": "React used for..",
        //               "options": [
        //                   "Web Software",
        //                   "Software",
        //                   "both"
        //               ],
        //               "answer": [
        //                   "both"
        //               ],
        //               "tag": [],
        //               "remark": "",
        //               "type": "MCQ",
        //               "skill": "ReactJS",
        //               "difficulty": "Simple",
        //               "takes": "1",
        //               "duration": "10",
        //               "marks": null,
        //               "imageUrl": "",
        //               "deleted": false,
        //               "createdAt": "2022-10-10T10:50:39.343Z",
        //               "updatedAt": "2022-10-10T10:50:39.343Z",
        //               "__v": 0
        //           },
        //           {
        //               "createdBy": {
        //                   "id": "6305fd4e3cdfe1421c1c76e0",
        //                   "firstName": "Super",
        //                   "lastName": "Admin",
        //                   "role": "admin",
        //                   "companyId": "",
        //                   "projectId": ""
        //               },
        //               "modifiedBy": {
        //                   "id": "6305fd4e3cdfe1421c1c76e0",
        //                   "firstName": "Super",
        //                   "lastName": "Admin",
        //                   "role": "admin",
        //                   "companyId": "",
        //                   "projectId": ""
        //               },
        //               "_id": "6343f8ff68fddc5b46c249eb",
        //               "question": "What is react node?",
        //               "options": [
        //                   "Library",
        //                   "Framework",
        //                   "both"
        //               ],
        //               "answer": [
        //                   "Library"
        //               ],
        //               "tag": [],
        //               "remark": "",
        //               "type": "MCQ",
        //               "skill": "ReactJS",
        //               "difficulty": "Simple",
        //               "takes": "1",
        //               "duration": "10",
        //               "marks": null,
        //               "imageUrl": "",
        //               "deleted": false,
        //               "createdAt": "2022-10-10T10:50:39.343Z",
        //               "updatedAt": "2022-10-10T10:50:39.343Z",
        //               "__v": 0
        //           }
        //       ],
        //       "invited": false,
        //       "expired": "7",
        //       "deleted": false,
        //       "createdAt": "2022-10-31T12:40:47.243Z",
        //       "updatedAt": "2022-10-31T12:40:47.243Z",
        //       "__v": 0,
        //       "candidateCount": {
        //           "all": 0,
        //           "completed": 0
        //       }
        //   },
        //   "uniqueCode": "JDHDQ4",
        //   "testCompleted": true,
        //   "testInvited": true,
        //   "expiryDays": 7,
        //   "takesForTest": 2,
        //   "deleted": false,
        //   "createdAt": "2022-10-31T13:01:33.577Z",
        //   "updatedAt": "2022-10-31T13:09:23.329Z",
        //   "__v": 0
        // }

        // response={
        //   "companyInfo": {
        //       "companyName": "",
        //       "companyLogo": "",
        //       "companyId": ""
        //   },
        //   "reviewer": {
        //       "reviewerEmail": "oliverD@yopmail.com",
        //       "instructions": "",
        //       "firstName": "",
        //       "lastName": ""
        //   },
        //   "createdBy": {
        //       "id": "1278043051",
        //       "firstName": "Oliver",
        //       "lastName": "Davis",
        //       "role": "user",
        //       "companyId": "",
        //       "projectId": ""
        //   },
        //   "modifiedBy": {
        //       "id": "",
        //       "firstName": "",
        //       "lastName": "",
        //       "role": "",
        //       "companyId": "",
        //       "projectId": ""
        //   },
        //   "startTest": {
        //       "takes": 0
        //   },
        //   "_id": "635bd55d8fc824e4140090b4",
        //   "jobId": null,
        //   "jobTitle": "",
        //   "tags": [
        //       ""
        //   ],
        //   "skills": [
        //       ""
        //   ],
        //   "clientName": "",
        //   "firstName": "Aanchal",
        //   "lastName": "Bhat",
        //   "email": "aanchalbhat1996@gmail.com",
        //   "recruiterEmail": "oliverD@yopmail.com",
        //   "high5hireCandidateId": "770502551",
        //   "externalIdentifier": "p95gbkcs0",
        //   "testAssign": {
        //       "project": {
        //           "projectId": "",
        //           "projectName": ""
        //       },
        //       "details": {
        //           "numberOfQtoAppear": 999999999999,
        //           "duration": "15",
        //           "passScore": "45",
        //           "qRandom": false,
        //           "oRandom": false
        //       },
        //       "createdBy": {
        //           "id": "6305fd4e3cdfe1421c1c76e0",
        //           "firstName": "Super",
        //           "lastName": "Admin",
        //           "role": "admin",
        //           "companyId": ""
        //       },
        //       "modifiedBy": {
        //           "id": "6305fd4e3cdfe1421c1c76e0",
        //           "firstName": "Super",
        //           "lastName": "Admin",
        //           "role": "admin",
        //           "companyId": ""
        //       },
        //       "email": "",
        //       "_id": "6344034d2323d528538af91c",
        //       "testName": "Reactjs",
        //       "difficulty": "Simple",
        //       "skills": [
        //           "ReactJS",
        //           "HTML",
        //           "HTML/CSS",
        //           "HTML5",
        //           "CSS"
        //       ],
        //       "testCategory": "MCQ",
        //       "questions": [
        //           {
        //               "createdBy": {
        //                   "id": "6305fd4e3cdfe1421c1c76e0",
        //                   "firstName": "Super",
        //                   "lastName": "Admin",
        //                   "role": "admin",
        //                   "companyId": "",
        //                   "projectId": ""
        //               },
        //               "modifiedBy": {
        //                   "id": "6305fd4e3cdfe1421c1c76e0",
        //                   "firstName": "Super",
        //                   "lastName": "Admin",
        //                   "role": "admin",
        //                   "companyId": "",
        //                   "projectId": ""
        //               },
        //               "_id": "6343f8ff68fddc5b46c249db",
        //               "question": "What is React?",
        //               "options": [
        //                   "Library",
        //                   "Framework",
        //                   "Language",
        //                   "none of the above"
        //               ],
        //               "answer": [
        //                   "Library"
        //               ],
        //               "tag": [],
        //               "remark": "",
        //               "type": "MCQ",
        //               "skill": "ReactJS",
        //               "difficulty": "Simple",
        //               "takes": "1",
        //               "duration": "10",
        //               "marks": null,
        //               "imageUrl": "",
        //               "deleted": false,
        //               "createdAt": "2022-10-10T10:50:39.343Z",
        //               "updatedAt": "2022-10-10T10:50:39.343Z",
        //               "__v": 0
        //           },
        //           {
        //               "createdBy": {
        //                   "id": "6305fd4e3cdfe1421c1c76e0",
        //                   "firstName": "Super",
        //                   "lastName": "Admin",
        //                   "role": "admin",
        //                   "companyId": "",
        //                   "projectId": ""
        //               },
        //               "modifiedBy": {
        //                   "id": "6305fd4e3cdfe1421c1c76e0",
        //                   "firstName": "Super",
        //                   "lastName": "Admin",
        //                   "role": "admin",
        //                   "companyId": "",
        //                   "projectId": ""
        //               },
        //               "_id": "6343f8ff68fddc5b46c249dc",
        //               "question": "React used for..",
        //               "options": [
        //                   "Web Software",
        //                   "Software",
        //                   "both"
        //               ],
        //               "answer": [
        //                   "both"
        //               ],
        //               "tag": [],
        //               "remark": "",
        //               "type": "MCQ",
        //               "skill": "ReactJS",
        //               "difficulty": "Simple",
        //               "takes": "1",
        //               "duration": "10",
        //               "marks": null,
        //               "imageUrl": "",
        //               "deleted": false,
        //               "createdAt": "2022-10-10T10:50:39.343Z",
        //               "updatedAt": "2022-10-10T10:50:39.343Z",
        //               "__v": 0
        //           },
        //           {
        //               "createdBy": {
        //                   "id": "6305fd4e3cdfe1421c1c76e0",
        //                   "firstName": "Super",
        //                   "lastName": "Admin",
        //                   "role": "admin",
        //                   "companyId": "",
        //                   "projectId": ""
        //               },
        //               "modifiedBy": {
        //                   "id": "6305fd4e3cdfe1421c1c76e0",
        //                   "firstName": "Super",
        //                   "lastName": "Admin",
        //                   "role": "admin",
        //                   "companyId": "",
        //                   "projectId": ""
        //               },
        //               "_id": "6343f8ff68fddc5b46c249eb",
        //               "question": "What is react?",
        //               "options": [
        //                   "Library",
        //                   "Framework",
        //                   "both"
        //               ],
        //               "answer": [
        //                   "Library"
        //               ],
        //               "tag": [],
        //               "remark": "",
        //               "type": "MCQ",
        //               "skill": "ReactJS",
        //               "difficulty": "Simple",
        //               "takes": "1",
        //               "duration": "10",
        //               "marks": null,
        //               "imageUrl": "",
        //               "deleted": false,
        //               "createdAt": "2022-10-10T10:50:39.343Z",
        //               "updatedAt": "2022-10-10T10:50:39.343Z",
        //               "__v": 0
        //           },
        //           {
        //               "createdBy": {
        //                   "id": "6305fd4e3cdfe1421c1c76e0",
        //                   "firstName": "Super",
        //                   "lastName": "Admin",
        //                   "role": "admin",
        //                   "companyId": "",
        //                   "projectId": ""
        //               },
        //               "modifiedBy": {
        //                   "id": "6305fd4e3cdfe1421c1c76e0",
        //                   "firstName": "Super",
        //                   "lastName": "Admin",
        //                   "role": "admin",
        //                   "companyId": "",
        //                   "projectId": ""
        //               },
        //               "_id": "6343f8ff68fddc5b46c249f7",
        //               "question": "How many standard color names does HTML supports?",
        //               "options": [
        //                   "120",
        //                   "130",
        //                   "140",
        //                   " 90"
        //               ],
        //               "answer": [
        //                   "140"
        //               ],
        //               "tag": [],
        //               "remark": "",
        //               "type": "MCQ",
        //               "skill": "HTML",
        //               "difficulty": "Simple",
        //               "takes": "1",
        //               "duration": "10",
        //               "marks": null,
        //               "imageUrl": "",
        //               "deleted": false,
        //               "createdAt": "2022-10-10T10:50:39.343Z",
        //               "updatedAt": "2022-10-10T10:50:39.343Z",
        //               "__v": 0
        //           },
        //           {
        //               "createdBy": {
        //                   "id": "6305fd4e3cdfe1421c1c76e0",
        //                   "firstName": "Super",
        //                   "lastName": "Admin",
        //                   "role": "admin",
        //                   "companyId": "",
        //                   "projectId": ""
        //               },
        //               "modifiedBy": {
        //                   "id": "6305fd4e3cdfe1421c1c76e0",
        //                   "firstName": "Super",
        //                   "lastName": "Admin",
        //                   "role": "admin",
        //                   "companyId": "",
        //                   "projectId": ""
        //               },
        //               "_id": "6343f8ff68fddc5b46c249ff",
        //               "question": "How many standard color names does HTML supports?",
        //               "options": [
        //                   "120",
        //                   "130",
        //                   "140",
        //                   " 90"
        //               ],
        //               "answer": [
        //                   "140"
        //               ],
        //               "tag": [],
        //               "remark": "",
        //               "type": "MCQ",
        //               "skill": "HTML",
        //               "difficulty": "Simple",
        //               "takes": "1",
        //               "duration": "10",
        //               "marks": null,
        //               "imageUrl": "",
        //               "deleted": false,
        //               "createdAt": "2022-10-10T10:50:39.343Z",
        //               "updatedAt": "2022-10-10T10:50:39.343Z",
        //               "__v": 0
        //           },
        //           {
        //               "createdBy": {
        //                   "id": "6305fd4e3cdfe1421c1c76e0",
        //                   "firstName": "Super",
        //                   "lastName": "Admin",
        //                   "role": "admin",
        //                   "companyId": "",
        //                   "projectId": ""
        //               },
        //               "modifiedBy": {
        //                   "id": "6305fd4e3cdfe1421c1c76e0",
        //                   "firstName": "Super",
        //                   "lastName": "Admin",
        //                   "role": "admin",
        //                   "companyId": "",
        //                   "projectId": ""
        //               },
        //               "_id": "6343f8ff68fddc5b46c24a6f",
        //               "question": "Which directive binds application data to the HTML view?",
        //               "options": [
        //                   "ng-app  ",
        //                   "ng-model  ",
        //                   " ng-bind",
        //                   "ng-init"
        //               ],
        //               "answer": [
        //                   " ng-bind"
        //               ],
        //               "tag": [],
        //               "remark": "",
        //               "type": "MCQ",
        //               "skill": "HTML",
        //               "difficulty": "Simple",
        //               "takes": "1",
        //               "duration": "10",
        //               "marks": null,
        //               "imageUrl": "",
        //               "deleted": false,
        //               "createdAt": "2022-10-10T10:50:39.344Z",
        //               "updatedAt": "2022-10-10T10:50:39.344Z",
        //               "__v": 0
        //           },
        //           {
        //               "createdBy": {
        //                   "id": "6305fd4e3cdfe1421c1c76e0",
        //                   "firstName": "Super",
        //                   "lastName": "Admin",
        //                   "role": "admin",
        //                   "companyId": "",
        //                   "projectId": ""
        //               },
        //               "modifiedBy": {
        //                   "id": "6305fd4e3cdfe1421c1c76e0",
        //                   "firstName": "Super",
        //                   "lastName": "Admin",
        //                   "role": "admin",
        //                   "companyId": "",
        //                   "projectId": ""
        //               },
        //               "_id": "6343f8ff68fddc5b46c24a89",
        //               "question": "Which command is used Install create-react-app?",
        //               "options": [
        //                   "npm install -g create-react-app ",
        //                   "npm install create-react-app",
        //                   "npm install -f create-react-app",
        //                   "install -g create-react-app"
        //               ],
        //               "answer": [
        //                   "npm install -g create-react-app "
        //               ],
        //               "tag": [],
        //               "remark": "",
        //               "type": "MCQ",
        //               "skill": "ReactJS",
        //               "difficulty": "Simple",
        //               "takes": "1",
        //               "duration": "10",
        //               "marks": null,
        //               "imageUrl": "",
        //               "deleted": false,
        //               "createdAt": "2022-10-10T10:50:39.344Z",
        //               "updatedAt": "2022-10-10T10:50:39.344Z",
        //               "__v": 0
        //           },
        //           {
        //               "createdBy": {
        //                   "id": "6305fd4e3cdfe1421c1c76e0",
        //                   "firstName": "Super",
        //                   "lastName": "Admin",
        //                   "role": "admin",
        //                   "companyId": "",
        //                   "projectId": ""
        //               },
        //               "modifiedBy": {
        //                   "id": "6305fd4e3cdfe1421c1c76e0",
        //                   "firstName": "Super",
        //                   "lastName": "Admin",
        //                   "role": "admin",
        //                   "companyId": "",
        //                   "projectId": ""
        //               },
        //               "_id": "6343f8ff68fddc5b46c24a71",
        //               "question": "AngularJS expressions bind AngularJS data to HTML the same way as the _________ directive.",
        //               "options": [
        //                   " ng-app ",
        //                   "ng-model",
        //                   "ng-bind ",
        //                   " ng-init"
        //               ],
        //               "answer": [
        //                   "ng-bind "
        //               ],
        //               "tag": [],
        //               "remark": "",
        //               "type": "MCQ",
        //               "skill": "HTML",
        //               "difficulty": "Simple",
        //               "takes": "1",
        //               "duration": "10",
        //               "marks": null,
        //               "imageUrl": "",
        //               "deleted": false,
        //               "createdAt": "2022-10-10T10:50:39.344Z",
        //               "updatedAt": "2022-10-10T10:50:39.344Z",
        //               "__v": 0
        //           },
        //           {
        //               "createdBy": {
        //                   "id": "6305fd4e3cdfe1421c1c76e0",
        //                   "firstName": "Super",
        //                   "lastName": "Admin",
        //                   "role": "admin",
        //                   "companyId": "",
        //                   "projectId": ""
        //               },
        //               "modifiedBy": {
        //                   "id": "6305fd4e3cdfe1421c1c76e0",
        //                   "firstName": "Super",
        //                   "lastName": "Admin",
        //                   "role": "admin",
        //                   "companyId": "",
        //                   "projectId": ""
        //               },
        //               "_id": "6343f8ff68fddc5b46c24a92",
        //               "question": "React renders HTML to the web page by using a function called?",
        //               "options": [
        //                   "ReactDOM.render()",
        //                   "render()",
        //                   "ReactDOM_render()",
        //                   "React.render()"
        //               ],
        //               "answer": [
        //                   "ReactDOM.render()"
        //               ],
        //               "tag": [],
        //               "remark": "",
        //               "type": "MCQ",
        //               "skill": "ReactJS",
        //               "difficulty": "Simple",
        //               "takes": "1",
        //               "duration": "10",
        //               "marks": null,
        //               "imageUrl": "",
        //               "deleted": false,
        //               "createdAt": "2022-10-10T10:50:39.344Z",
        //               "updatedAt": "2022-10-10T10:50:39.344Z",
        //               "__v": 0
        //           },
        //           {
        //               "createdBy": {
        //                   "id": "6305fd4e3cdfe1421c1c76e0",
        //                   "firstName": "Super",
        //                   "lastName": "Admin",
        //                   "role": "admin",
        //                   "companyId": "",
        //                   "projectId": ""
        //               },
        //               "modifiedBy": {
        //                   "id": "6305fd4e3cdfe1421c1c76e0",
        //                   "firstName": "Super",
        //                   "lastName": "Admin",
        //                   "role": "admin",
        //                   "companyId": "",
        //                   "projectId": ""
        //               },
        //               "_id": "6343f8ff68fddc5b46c24aab",
        //               "question": "Are HTML tags case sensitive?",
        //               "options": [
        //                   "True",
        //                   "False"
        //               ],
        //               "answer": [
        //                   "False"
        //               ],
        //               "tag": [],
        //               "remark": "",
        //               "type": "MCQ",
        //               "skill": "HTML5",
        //               "difficulty": "Simple",
        //               "takes": "1",
        //               "duration": "10",
        //               "marks": null,
        //               "imageUrl": "",
        //               "deleted": true,
        //               "createdAt": "2022-10-10T10:50:39.344Z",
        //               "updatedAt": "2022-10-10T10:50:39.344Z",
        //               "__v": 0
        //           }
        //       ],
        //       "completed": false,
        //       "invited": false,
        //       "expired": "7",
        //       "deleted": false,
        //       "createdAt": "2022-10-10T11:34:37.404Z",
        //       "updatedAt": "2022-10-10T11:34:37.404Z",
        //       "__v": 0
        //   },
        //   "uniqueCode": "5BID7H",
        //   "testCompleted": false,
        //   "testInvited": true,
        //   "expiryDays": 7,
        //   "takesForTest": 2,
        //   "deleted": false,
        //   "createdAt": "2022-10-28T13:13:01.891Z",
        //   "updatedAt": "2022-10-28T13:13:01.891Z",
        //   "__v": 0
        // }








        // response={
        //   "companyInfo": {
        //       "companyName": "LISA",
        //       "companyLogo": "https://high5vetiingdevstorage.blob.core.windows.net/vettingcontainer//Image/a841c6929f0aa/vincent-van-zalinge-vUNQaTtZeOo-unsplash.jpg.jpg?st=2022-10-12T16%3A42%3A42Z&se=2022-10-20T08%3A02%3A42Z&sp=r&sv=2018-03-28&sr=b&sig=HJq1cY3wT8LijINkproZ3tKU0qFZ7ga0%2FKUbpUhnpTM%3D",
        //       "companyId": ""
        //   },
        //   "reviewer": {
        //       "firstName": "Lisa",
        //       "lastName": "Brown",
        //       "reviewerEmail": "lisa@yopmail.com",
        //       "instructions": ""
        //   },
        //   "createdBy": {
        //       "id": "6343f79468fddc5b46c249b1",
        //       "firstName": "Lisa",
        //       "lastName": "Brown",
        //       "role": "user",
        //       "companyId": "GKFZS4ED2L",
        //       "projectId": ""
        //   },
        //   "modifiedBy": {
        //       "id": "6343f79468fddc5b46c249b1",
        //       "firstName": "Lisa",
        //       "lastName": "Brown",
        //       "role": "user",
        //       "companyId": "GKFZS4ED2L",
        //       "projectId": ""
        //   },
        //   "startTest": {
        //       "takes": 1
        //   },
        //   "_id": "635bd4b7d549fe72a81a7de2",
        //   "jobId": "",
        //   "jobTitle": "Dev",
        //   "tags": [
        //       "Dev"
        //   ],
        //   "skills": [],
        //   "clientName": "",
        //   "firstName": "Nicola",
        //   "lastName": "T",
        //   "email": "nicola@yopmail.com",
        //   "recruiterEmail": "",
        //   "high5hireCandidateId": "",
        //   "externalIdentifier": "",
        //   "testAssign": {
        //       "project": {
        //           "projectId": "",
        //           "projectName": ""
        //       },
        //       "details": {
        //           "numberOfQtoAppear": 999999999999,
        //           "duration": "15",
        //           "passScore": "45",
        //           "qRandom": false,
        //           "oRandom": false
        //       },
        //       "createdBy": {
        //           "id": "6305fd4e3cdfe1421c1c76e0",
        //           "firstName": "Super",
        //           "lastName": "Admin",
        //           "role": "admin",
        //           "companyId": ""
        //       },
        //       "modifiedBy": {
        //           "id": "6305fd4e3cdfe1421c1c76e0",
        //           "firstName": "Super",
        //           "lastName": "Admin",
        //           "role": "admin",
        //           "companyId": ""
        //       },
        //       "email": "",
        //       "_id": "63455738481c408063cf9e06",
        //       "testName": "Azure OneWay",
        //       "difficulty": "Simple",
        //       "skills": [
        //           "Azure"
        //       ],
        //       "testCategory": "OneWay",
        //       "questions": [
        //           {
        //               "createdBy": {
        //                   "id": "6305fd4e3cdfe1421c1c76e0",
        //                   "firstName": "Super",
        //                   "lastName": "Admin",
        //                   "role": "admin",
        //                   "companyId": "",
        //                   "projectId": ""
        //               },
        //               "modifiedBy": {
        //                   "id": "6305fd4e3cdfe1421c1c76e0",
        //                   "firstName": "Super",
        //                   "lastName": "Admin",
        //                   "role": "admin",
        //                   "companyId": "",
        //                   "projectId": ""
        //               },
        //               "_id": "6343f8ff68fddc5b46c249e8",
        //               "question": "What is scalability?",
        //               "options": [],
        //               "answer": [
        //                   ""
        //               ],
        //               "tag": [],
        //               "remark": "",
        //               "type": "OneWay",
        //               "skill": "Azure",
        //               "difficulty": "Simple",
        //               "takes": "1",
        //               "duration": "100",
        //               "marks": null,
        //               "imageUrl": "",
        //               "deleted": false,
        //               "createdAt": "2022-10-10T10:50:39.343Z",
        //               "updatedAt": "2022-10-10T10:50:39.343Z",
        //               "__v": 0
        //           },
        //           {
        //               "createdBy": {
        //                   "id": "6305fd4e3cdfe1421c1c76e0",
        //                   "firstName": "Super",
        //                   "lastName": "Admin",
        //                   "role": "admin",
        //                   "companyId": "",
        //                   "projectId": ""
        //               },
        //               "modifiedBy": {
        //                   "id": "6305fd4e3cdfe1421c1c76e0",
        //                   "firstName": "Super",
        //                   "lastName": "Admin",
        //                   "role": "admin",
        //                   "companyId": "",
        //                   "projectId": ""
        //               },
        //               "_id": "6343f8ff68fddc5b46c249e9",
        //               "question": "What is a network security group?",
        //               "options": [],
        //               "answer": [
        //                   ""
        //               ],
        //               "tag": [],
        //               "remark": "",
        //               "type": "OneWay",
        //               "skill": "Azure",
        //               "difficulty": "Simple",
        //               "takes": "1",
        //               "duration": "100",
        //               "marks": null,
        //               "imageUrl": "",
        //               "deleted": false,
        //               "createdAt": "2022-10-10T10:50:39.343Z",
        //               "updatedAt": "2022-10-10T10:50:39.343Z",
        //               "__v": 0
        //           }
        //       ],
        //       "invited": false,
        //       "expired": "7",
        //       "deleted": false,
        //       "createdAt": "2022-10-11T11:44:56.051Z",
        //       "updatedAt": "2022-10-11T11:44:56.051Z",
        //       "__v": 0,
        //       "candidateCount": {
        //           "all": 26,
        //           "completed": 11
        //       }
        //   },
        //   "uniqueCode": "R4S6W3",
        //   "testCompleted": true,
        //   "testInvited": false,
        //   "expiryDays": 7,
        //   "takesForTest": 2,
        //   "deleted": false,
        //   "createdAt": "2022-10-28T13:10:15.853Z",
        //   "updatedAt": "2022-10-28T13:17:31.427Z",
        //   "__v": 0
        // },
        // baseViewRef.current.hideLoader();
        // console.log('[LoginWithCode.js] Response => ', response);
        // dispatch(setUserPrefs(response));
        // props.navigation.replace('Instructions');
      }
    }
  };

  const _renderInstruction = ({ item, index }) => {
    return (
      <Text style={styles.itemView}>
        {index + 1}. {item}
      </Text>
    );
  };

  const _onReachUs = () => {

    // props.navigation.navigate('SubmitOneWay', {
    //   list: [],
    // });
    // props.navigation.navigate('TwoWay');
    props.navigation.navigate('ResumeHome');
    // props.navigation.navigate('PersonalInfo');
    // DocumentPicker.pick({
    //   type: [types.video],
    // })
    //   .then(response => {
    //     console.log('[LoginWithCode.js] : ', response);
    //     uploadVimeoVideo(response[0])
    //       .then(response => {})
    //       .catch(error => {});
    //   })
    //   .catch(error => {
    //     console.log('[LoginWithCode.js] : ', error);
    //   });
  };

  return (
    <BaseView ref={baseViewRef}>
      <View style={styles.parent}>
        {/* <Image
          source={images.high5Logo}
          style={styles.logo}
          resizeMode="contain"
        /> */}
        <View style={styles.subView}>
          <Text style={[styles.text]}>
            Please enter 6-digit assessment code that you have received on
            your registered email.
          </Text>
          <CodeInput
            // secureTextEntry
            // className={'border-b'}
            activeColor={'#fff'}
            inactiveColor={'#fff'}
            autoFocus={true}
            inputPosition="center"
            size={36}
            codeLength={6}
            onFulfill={isValid => { }}
            // containerStyle={{height: 36}}
            codeInputStyle={{
              borderWidth: 1,
              borderRadius: 8,
              height: IS_TABLET ? 72 : 36,
              width: IS_TABLET ? 80 : 40,
            }}
            onCodeChange={code => _onSetCode(code)}
          // keyboardType="number-pad"
          />

          <ButtonView
            title="Confirm"
            containerStyle={{
              marginTop: IS_TABLET ? 72 : 24,
              marginHorizontal: 0,
            }}
            buttonStyle={{
              backgroundColor: colors.accent,
              width: 144,
              marginHorizontal: 0,
            }}
            size="medium"
            onPress={() => _onConfirm()}
          />
          {/* <View style={[styles.row2,{marginTop:35}]}>
              <View style={styles.bar} />
              <Text style={styles.description2}>OR</Text>
              <View style={styles.bar} />
          </View> */}
          {/* <ButtonView
            title="Sign In ?"
            icon={
              <Icon name="log-in" size={18} color="#fff" style={{marginRight:10}} />
            }
            containerStyle={{
              marginTop: IS_TABLET ? 72 : 24,
              marginHorizontal: 0,
            }}
            buttonStyle={{
              borderColor:'#fff',
              backgroundColor: colors.primary,
              width: 144,
              marginHorizontal: 0,
            }}
            size="medium"
            onPress={() => props.navigation.replace('CustomerModule')}
          /> */}
          {/* <View style={styles.view}>
            <Text style={styles.instructions}>Instructions</Text>
            <FlatList
              data={loginInstructions}
              renderItem={_renderInstruction}
              showsVerticalScrollIndicator={false}
              // style={{flexWrap:'wrap'}}
              contentContainerStyle={{paddingBottom: 64}}
            />
          </View> */}

          <View style={styles.footer}>
            <View style={{ marginTop: 50 }}>
              <View style={[styles.row]}>
                <Text style={styles.powered}>Powered By </Text>
                <Image
                  source={images.high5Logo}
                  style={styles.bottomHigh5Logo}
                  resizeMode={'contain'}
                />
              </View>
            </View>
          </View>
        </View>
        {/* <TouchableOpacity onPress={() => _onReachUs()}>
          <Text style={styles.reachUsText}>Reach Us</Text>
          Solutions for every stage in your hiring process
        </TouchableOpacity> */}
        <ButtonView title={'Test Video'} onPress={() => _onReachUs()} />
      </View>
    </BaseView>
  );
};

export default LoginWithCode;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.primary,
    // paddingBottom: 16,
    paddingTop: 120,
    // justifyContent: 'center',
  },
  logo: {
    height: 144,
    width: '60%',
    marginLeft: 16,
    marginTop: 64,
  },
  subView: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    marginTop: 16,
  },
  text: {
    fontSize: IS_TABLET ? 20 : 12,
    color: '#fff',
    // marginTop:36,
    fontFamily: fonts.notoSans600,
    marginBottom: IS_TABLET ? 16 : 0,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  reachUsText: {
    fontSize: IS_TABLET ? 18 : 14,
    color: colors.accent,
    // marginTop:36,
    fontFamily: fonts.notoSans600,
    padding: 8,
  },
  view: {
    margin: 24,
    backgroundColor: '#88888833',
    // flexWrap:'wrap',
    // borderWidth:1,
    height: 240,
    padding: 8,
    borderRadius: 4,

    // marginTop: 16
  },
  instructions: {
    fontSize: IS_TABLET ? 18 : 14,
    color: colors.accent,
    // marginTop:36,
    fontFamily: fonts.notoSans600,
    textAlign: 'center',
    paddingBottom: 4,
  },
  itemView: {
    fontSize: IS_TABLET ? 18 : 12,
    color: '#fff',
    // marginTop:36,
    fontFamily: fonts.notoSans400_2,
    // textAlign: 'center',
    paddingTop: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    // padding:16,
    justifyContent: 'center',
    paddingBottom: 16,
  },
  powered: {
    fontSize: 12,
    fontFamily: fonts.notoSans600,
    color: '#888',
  },
  bottomHigh5Logo: {
    height: 24,
    width: 48,
    // tintColor: colors.accent,
    marginBottom: 10,
    marginLeft: 4
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    marginTop: 24,
  },
  bar: {
    width: '25%',
    height: 1,
    backgroundColor: '#fff',
  },
  description2: {
    fontSize: IS_TABLET ? 20 : 14,
    color: '#fff',
    fontFamily: fonts.notoSans700,
    paddingHorizontal: IS_TABLET ? 32 : 16,
    textAlign: 'center',
    // marginVertical: 16,
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end"
  },
});
