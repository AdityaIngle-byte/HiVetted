import {images} from '../../assets/images';
import {actions} from '../actions/actionTypes';

let initialState = {
  profilePersonalInfo: null,
  profileSocialMedia: null,
  profileStory: '',
  profileSkills: null,
  profileEducation: [],
  profileCertificates: [],
  profileExperiences: [],
  profileLicenses: [],
  profileLanguages: [],
  profileCustomSections: [],
  profileAwardsAndHonorsList: [],
  preferences: null,
  profileImage: images.userImage,
  viewFlags: {
    hasPersonalInfo: true,
    hasStoryInfo: true,
    hasSocialMedia: true,
    hasSkillsData: true,
    hasEducation: true,
    hasWorkExperience: true,
    hasCertificates: true,
    hasAwardsAndHonors: true,
    hasLanguages: true,
    hasLicenses: true,
    hasCustomSections: true,
  },
};

export default profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.PROFILE_PERSONAL_INFO:
      return {
        ...state,
        profilePersonalInfo: action.profilePersonalInfo,
      };
    case actions.PROFILE_SOCIAL_MEDIA:
      return {
        ...state,
        profileSocialMedia: action.profileSocialMedia,
      };
    case actions.PROFILE_STORY:
      return {
        ...state,
        profileStory: action.profileStory,
      };
    case actions.PROFILE_SKILLS:
      return {
        ...state,
        profileSkills: action.profileSkills,
      };
    case actions.PROFILE_EDUCATION:
      return {
        ...state,
        profileEducation: action.profileEducation,
      };
    case actions.PROFILE_CERTIFICATES:
        return {
          ...state,
          profileCertificates: action.profileCertificates,
        };
    case actions.PROFILE_EXPERIENCES:
      return {
        ...state,
        profileExperiences: action.profileExperiences,
      };
    case actions.PROFILE_LICENSES:
      return {
        ...state,
        profileLicenses: action.profileLicenses,
      };
    case actions.PROFILE_LANGUAGES:
      return {
        ...state,
        profileLanguages: action.profileLanguages,
      };
    case actions.PROFILE_CUSTOM_SECTIONS:
      return {
        ...state,
        profileCustomSections: action.profileCustomSections,
      };
    case actions.PROFILE_AWARDS_AND_HONORS:
      return {
        ...state,
        profileAwardsAndHonorsList: action.profileAwardsAndHonorsList,
      };
    case actions.PROFILE_IMAGE:
      return {
        ...state,
        profileImage: action.profileImage,
      };
    case actions.RESUME_VIEW_FLAGS:
      return {
        ...state,
        viewFlags: action.viewFlags,
      };
    default:
        return state;
  }
  // return state;
};
