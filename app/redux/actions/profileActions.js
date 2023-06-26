// import {getCandidateId, getUserPref} from '../../utils/UserPrefs';
// import AxiosBase from '../networkRequests/AxiosBase';
// import {errorHandler} from '../networkRequests/ErrorHandler';
// import {domain} from '../networkRequests/NetworkConstants';
import {actions} from './actionTypes';

export const setProfileImage = image => {
  return async dispatch => {
    dispatch({
      type: actions.PROFILE_IMAGE,
      profileImage: image,
    });
  };
};

// export const setPreferences = data => {
//   return async dispatch => {
//     dispatch({
//       type: actions.PREFERENCES,
//       preferences: data,
//     });
//   };
// };

export const setProfilePersonalInfo = data => {
  return async dispatch => {
    dispatch({
      type: actions.PROFILE_PERSONAL_INFO,
      profilePersonalInfo: data,
    });
  };
};

export const setProfileSocialMedia = data => {
  return async dispatch => {
    dispatch({
      type: actions.PROFILE_SOCIAL_MEDIA,
      profileSocialMedia: data,
    });
  };
};

export const setProfileStory = data => {
  return async dispatch => {
    dispatch({
      type: actions.PROFILE_STORY,
      profileStory: data,
    });
  };
};

export const setProfileSkills = data => {
  return async dispatch => {
    dispatch({
      type: actions.PROFILE_SKILLS,
      profileSkills: data,
    });
  };
};

export const setProfileEducation = list => {
  return async dispatch => {
    dispatch({
      type: actions.PROFILE_EDUCATION,
      profileEducation: list,
    });
  };
};

export const setProfileCertificates = list => {
  return async dispatch => {
    dispatch({
      type: actions.PROFILE_CERTIFICATES,
      profileCertificates: list,
    });
  };
};

export const setProfileExperiences = list => {
  return async dispatch => {
    dispatch({
      type: actions.PROFILE_EXPERIENCES,
      profileExperiences: list,
    });
  };
};

export const setProfileLanguages = list => {
  return async dispatch => {
    dispatch({
      type: actions.PROFILE_LANGUAGES,
      profileLanguages: list,
    });
  };
};

export const setProfileAwardsAndHonors = list => {
  return async dispatch => {
    dispatch({
      type: actions.PROFILE_AWARDS_AND_HONORS,
      profileAwardsAndHonorsList: list,
    });
  };
};

export const setProfileLicenses = list => {
  return async dispatch => {
    dispatch({
      type: actions.PROFILE_LICENSES,
      profileLicenses: list,
    });
  };
};

export const setProfileCustomSections = list => {
  return async dispatch => {
    dispatch({
      type: actions.PROFILE_CUSTOM_SECTIONS,
      profileCustomSections: list,
    });
  };
};

export const setResumeViewFlags = data => {
  return async dispatch => {
    dispatch({
      type: actions.RESUME_VIEW_FLAGS,
      viewFlags: data,
    });
  };
};

// export const getProfileDetail = () => new Promise((resolve, reject) => {

//     AxiosBase.get('fetchCandidateData')
//         .then(response => {
//             const res = response.data;
//             console.log('[ProfileActions.js] Get Profile Detail: ',res);
//             resolve(res)
//         })
//         .catch(error => {
//             console.log(error)
//             reject(error)
//             errorHandler(error)

//         })
// })

// export const updateContactInfo = (data) => new Promise(async(resolve, reject) => {

//     const userDetail = JSON.parse(await getUserPref());
//     const requestData =  {
//         "candidateID": userDetail.candidateId,
//         "firstName" :data.firstName,
//         "middleName" :"",
//         "lastName": data.lastName,
//         "address": data.address.addressLine1,
//         "addressCity": data.address.city,
//         "addressState": data.address.state,
//         "stateName": data.address.state,
//         "country": data.address.state,
//         "zipCode": data.address.postalCode,
//         "workPhoneCode": data.alternateCountryCode.dial_code,
//         "workPhone": data.alternatePhone,
//         "homePhone": "",
//         "mobilePhoneCode": data.primaryCountryCode.dial_code,
//         "mobilePhone": data.primaryPhone,
//         "updatedby": userDetail.userId.toString(),
//     }

//     console.log('[ProfileActions.js] Update Profile : ',requestData)

//     AxiosBase.post('candidateProfile/postProfile',requestData)
//         .then(response => {
//             const res = response.data;
//             console.log('[ProfileActions.js] Update Profile Detail: ',res);
//             resolve(res)
//         })
//         .catch(error => {
//             console.log(error)
//             reject(error)
//             errorHandler(error)

//         })
// })

// export const updateSocialMedia = (linkedIn,website) => new Promise(async(resolve, reject) => {

//     const userDetail = JSON.parse(await getUserPref());
//     const data = {
//         "createdby": userDetail.userId.toString(),
//         "candidateID": userDetail.candidateId,
//         "clickName" :"socialmedia",
//         "userDetailslist": {
//            "linkedIn": linkedIn,
//            "website": website,
//        }
//     }

//     AxiosBase.post('candidateProfile/postSocialMediaData',data)
//         .then(response => {
//             const res = response.data;
//             console.log('[ProfileActions.js] Get Profile Detail: ',res);
//             resolve(res)
//         })
//         .catch(error => {
//             console.log(error)
//             reject(error)
//             errorHandler(error)

//         })
// })

// export const updateStoryInfo = (info) => new Promise(async(resolve, reject) => {

//     const userDetail = JSON.parse(await getUserPref());

//     const data = {
//         "createdby": userDetail.userId.toString(),
//         "candidateID": userDetail.candidateId,
//         "clickName" :"storyinfos",
//         "userStoryInfo": {
//                 "storyInfo": info,
//                 "domainName" : domain
//             }
//     }

//     AxiosBase.post('candidateProfile/postStoryInfo',data)
//         .then(response => {
//             const res = response.data;
//             console.log('[ProfileActions.js] Story info update: ',res);
//             resolve(res)
//         })
//         .catch(error => {
//             console.log(error)
//             reject(error)
//             errorHandler(error)

//         })
// })

// export const updateSkills= (info) => new Promise(async(resolve, reject) => {

//     const userDetail = JSON.parse(await getUserPref());

//     const data = {
//         "createdby": userDetail.userId.toString(),
//         "candidateID": userDetail.candidateId,
//         "clickName" :"candidateSkills",
//         "userSkillInfo": {
//                 ...info,
//             }
//     }

//     console.log('[ProfileActions.js] postSkillData: ',data)

//     AxiosBase.post('candidateProfile/postSkillData',data)
//         .then(response => {
//             const res = response.data;
//             console.log('[ProfileActions.js] postSkillData update: ',res);
//             resolve(res)
//         })
//         .catch(error => {
//             console.log(error)
//             reject(error)
//             errorHandler(error)

//         })
// })

// export const updateEducation = (list) => new Promise(async(resolve, reject) => {

//     const userDetail = JSON.parse(await getUserPref());

//     const data = {
//         "createdby": userDetail.userId.toString(),
//         "candidateID": userDetail.candidateId,
//         "clickName" :"education",
//         "userEducationinfo": list
//     }

//     console.log('[ProfileActions.js] postEducationData: ',data)

//     AxiosBase.post('candidateProfile/postEducationData',data)
//         .then(response => {
//             const res = response.data;
//             console.log('[ProfileActions.js] postEducationData update: ',res);
//             resolve(res)
//         })
//         .catch(error => {
//             console.log(error)
//             reject(error)
//             errorHandler(error)

//         })
// })

// export const updateWorkExperience = (list) => new Promise(async(resolve, reject) => {

//     const userDetail = JSON.parse(await getUserPref());

//     const data = {
//         "createdby": userDetail.userId.toString(),
//         "candidateID": userDetail.candidateId,
//         "clickName" : "experience",
//         "userExperiencesInfo": list
//     }

//     console.log('[ProfileActions.js] postExperienceInfo: ',data)

//     AxiosBase.post('candidateProfile/postExperienceInfo',data)
//         .then(response => {
//             const res = response.data;
//             console.log('[ProfileActions.js] postExperienceInfo update: ',res);
//             resolve(res)
//         })
//         .catch(error => {
//             console.log(error)
//             reject(error)
//             errorHandler(error)

//         })
// })

// export const updateCertificates = (list) => new Promise(async(resolve, reject) => {

//     const userDetail = JSON.parse(await getUserPref());

//     const data = {
//         "createdby": userDetail.userId.toString(),
//         "candidateID": userDetail.candidateId,
//         "clickName" :"certificates",
//         "userCertificationInfo": list,
//     }

//     console.log('[ProfileActions.js] postCertification: ',data)

//     AxiosBase.post('candidateProfile/postCertification',data)
//         .then(response => {
//             const res = response.data;
//             console.log('[ProfileActions.js] postCertification update: ',res);
//             resolve(res)
//         })
//         .catch(error => {
//             console.log(error)
//             reject(error)
//             errorHandler(error)

//         })
// })

// export const updateAwardsAndHonors = (list) => new Promise(async(resolve, reject) => {

//     const userDetail = JSON.parse(await getUserPref());

//     const data = {
//         "createdby": userDetail.userId.toString(),
//         "candidateID": userDetail.candidateId,
//         "clickName" :"AwardsandHonors",
//         "userAwardsandHonorsInfo": list
//     }

//     console.log('[ProfileActions.js] postAwardHonorsData: ',data)

//     AxiosBase.post('candidateProfile/postAwardHonorsData',data)
//         .then(response => {
//             const res = response.data;
//             console.log('[ProfileActions.js] postAwardHonorsData update: ',res);
//             resolve(res)
//         })
//         .catch(error => {
//             console.log(error)
//             reject(error)
//             errorHandler(error)

//         })
// })

// export const updateLanguages = (list) => new Promise(async(resolve, reject) => {

//     const userDetail = JSON.parse(await getUserPref());

//     const data = {
//         "createdby": userDetail.userId.toString(),
//         "candidateID": userDetail.candidateId,
//         "clickName" : "language",
//         "userlanguagelist": list
//     }

//     console.log('[ProfileActions.js] postLanguageData: ',data)

//     AxiosBase.post('candidateProfile/postLanguageData',data)
//         .then(response => {
//             const res = response.data;
//             console.log('[ProfileActions.js] postLanguageData update: ',res);
//             resolve(res)
//         })
//         .catch(error => {
//             console.log(error)
//             reject(error)
//             errorHandler(error)

//         })
// })

// export const updateLicenses = (list) => new Promise(async(resolve, reject) => {

//     const userDetail = JSON.parse(await getUserPref());

//     const data = {
//         "createdby": userDetail.userId.toString(),
//         "candidateID": userDetail.candidateId,
//         "clickName" :"licenses",
//         "userLicensesInfo": list
//     }

//     console.log('[ProfileActions.js] postLicenseData: ',data)

//     AxiosBase.post('candidateProfile/postLicenseData',data)
//         .then(response => {
//             const res = response.data;
//             console.log('[ProfileActions.js] postLicenseData update: ',res);
//             resolve(res)
//         })
//         .catch(error => {
//             console.log(error)
//             reject(error)
//             errorHandler(error)

//         })
// })

// export const updateCustomSections = (list) => new Promise(async(resolve, reject) => {

//     const userDetail = JSON.parse(await getUserPref());

//     const data = {
//         "createdby": userDetail.userId.toString(),
//         "candidateID": userDetail.candidateId,
//         "clickName" :"customsections",
//         "userCustomSectionInfo": list
//     }

//     console.log('[ProfileActions.js] postCustomSectionData: ',data)

//     AxiosBase.post('candidateProfile/postCustomSectionData',data)
//         .then(response => {
//             const res = response.data;
//             console.log('[ProfileActions.js] postCustomSectionData update: ',res);
//             resolve(res)
//         })
//         .catch(error => {
//             console.log(error)
//             reject(error)
//             errorHandler(error)

//         })
// })

// export const updatePrivacySettings = (data) => new Promise(async(resolve, reject) => {

//     console.log('[ProfileActions.js] updatePrivacySettings: ',data)

//     AxiosBase.post('candidateProfile/postPrivacy',data)
//         .then(response => {
//             const res = response.data;
//             console.log('[ProfileActions.js] updatePrivacySettings update: ',res);
//             resolve(res)
//         })
//         .catch(error => {
//             console.log(error)
//             reject(error)
//             errorHandler(error)

//         })
// })

// export const updatePreferencesSettings = (data) => new Promise(async(resolve, reject) => {

//     console.log('[ProfileActions.js] updatePreferencesSettings: ',data)

//     AxiosBase.post('candidateProfile/updatePreferences',data)
//         .then(response => {
//             const res = response.data;
//             console.log('[ProfileActions.js] updatePreferencesSettings update: ',res);
//             resolve(res)
//         })
//         .catch(error => {
//             console.log(error)
//             reject(error)
//             errorHandler(error)

//         })
// })

// export const updateProfileImage = (file) => new Promise(async(resolve, reject) => {

//     // console.log('[ProfileActions.js] updatePreferencesSettings: ',data)

//     const formData = new FormData();
//     formData.append('file',file)

//     AxiosBase.post('CandidateDashboard/profileImageUpload',formData)
//         .then(response => {
//             const res = response.data;
//             console.log('[ProfileActions.js] updateProfileImage update: ',res);
//             resolve(res)
//         })
//         .catch(error => {
//             console.log(error)
//             reject(error)
//             errorHandler(error)

//         })
// })

// export const getProfileImage = () => new Promise(async(resolve, reject) => {

//     const data = {
//         "domain": domain,
//         "candidateId": await getCandidateId()
//     }
//     console.log('[ProfileActions.js] GetProfileImage : ',data)
//     AxiosBase.post('CandidateDashboard/getProfileImage',data)
//         .then(response => {
//             const res = response.data;
//             console.log('[ProfileActions.js] getProfileImage update: ',res);
//             resolve(res)
//         })
//         .catch(error => {
//             console.log(error)
//             reject(error)
//             errorHandler(error)
//         })
// })

// export const updateCurrencyPreferences = (data) => new Promise(async(resolve, reject) => {

//     AxiosBase.post('candidateProfile/updatePreferences',data)
//         .then(response => {
//             const res = response.data;
//             console.log('[ProfileActions.js] updateCurrencyPreferences : ',res);
//             resolve(res)
//         })
//         .catch(error => {
//             console.log(error)
//             reject(error)
//             errorHandler(error)

//         })
// })
