import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Fragment, useRef, useState} from 'react';
import BaseView from '../../../../hoc/BaseView';
import {MenuItem} from '../items/MenuItem';
import {Icon} from 'react-native-elements';
import {colors} from '../../../../../values/colors';
import {fonts} from '../../../../../values/fonts';
import ProfileTitleView from '../items/ProfileTitleView';
import {useDispatch, useSelector} from 'react-redux';
import {showAlert} from '../../../../../utils/Message';
import ProfileItemView from './items/ProfileItemView';
import ProfileDetailView, {renderItemView} from './ProfileDetailView';
import {setResumeViewFlags} from '../../../../../redux/actions/profileActions';
import ButtonView from '../../../../components/ButtonView';
import AddResumeName from '../../../../modals/AddResumeName';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {downloadFile} from '../../../../../utils/Share';

const High5Resume = props => {
  const baseViewRef = useRef(null);
  const addResumeRef = useRef(null);

  const dispatch = useDispatch();

  const profilePersonalInfo = useSelector(
    state => state.profile.profilePersonalInfo,
  );
  const profileSocialMedia = useSelector(
    state => state.profile.profileSocialMedia,
  );
  const profileStory = useSelector(state => state.profile.profileStory);
  const profileSkills = useSelector(state => state.profile.profileSkills);
  const profileEducation = useSelector(state => state.profile.profileEducation);
  const profileExperiences = useSelector(
    state => state.profile.profileExperiences,
  );
  const profileCertificates = useSelector(
    state => state.profile.profileCertificates,
  );
  const profileAwardsAndHonorsList = useSelector(
    state => state.profile.profileAwardsAndHonorsList,
  );
  const profileLanguages = useSelector(state => state.profile.profileLanguages);
  const profileLicenses = useSelector(state => state.profile.profileLicenses);
  const profileCustomSections = useSelector(
    state => state.profile.profileCustomSections,
  );

  const [selectedResumeTemplate, setSelectedResumeTemplate] = useState(null);
  const [hasPersonalInfo, setHasPersonalInfo] = useState(false);
  const [hasSocialMedia, setHasSocialMedia] = useState(false);
  const [hasStoryInfo, setHasStoryInfo] = useState(false);
  const [hasSkillsData, setHasSkillsData] = useState(false);
  const [hasEducation, setHasEducation] = useState(false);
  const [hasWorkExperience, setHasWorkExperience] = useState(false);
  const [hasCertificates, setHasCertificates] = useState(false);
  const [hasAwardsAndHonors, setHasAwardsAndHonors] = useState(false);
  const [hasLanguages, setHasLanguages] = useState(false);
  const [hasLicenses, setHasLicenses] = useState(false);
  const [hasCustomSections, setHasCustomSections] = useState(false);

  const _onBack = () => props.navigation.goBack();

  const _onAddResumeTemplate = () => {
    if (hasPersonalInfo === false) {
      showAlert('error', 'Add Contact Info');
    } else {
      const flags = {
        hasPersonalInfo,
        hasStoryInfo,
        hasSocialMedia,
        hasSkillsData,
        hasEducation,
        hasWorkExperience,
        hasCertificates,
        hasAwardsAndHonors,
        hasLanguages,
        hasLicenses,
        hasCustomSections,
      };

      dispatch(setResumeViewFlags(flags));
      props.navigation.navigate('ResumeTemplates', {
        onGoBack: _onSelectResume,
      });
    }
  };

  const _onSelectResume = data => {
    setSelectedResumeTemplate(data);
  };

  const _onSavePress = () => {
    // showAlert('success', 'Saved Successfully!');
    if (addResumeRef !== null) {
      addResumeRef.current.baseModal.showModal();
    }
  };

  const _onSaveResume = async name => {
    let options = {
      html: selectedResumeTemplate.html_code,
      fileName: `${name}`,
      directory: 'Documents',
    };
    let file = await RNHTMLtoPDF.convert(options);
    console.log('[High5Resume.js] on Save Resume: ', options, file);
    if (Platform.OS === 'ios') {
      setTimeout(() => {
        downloadFile(
          'High5 Resume',
          `Save or share ${name}.pdf resume`,
          file.filePath,
        )
          .then(response => {
            showAlert('success', 'Saved Successfully!');
            props.navigation.replace('SubmitMCQ', {
              list: [],
            });
          })
          .catch(error => {
            showAlert('error', 'Error! Not Saved. Try Again');
          });
      }, 500);
    } else {
      // showAlert('success', 'Saved Successfully!');
      alert(`Saved in ${file.filePath}`);
      props.navigation.replace('SubmitMCQ', {
        list: [],
      });
    }
  };

  return (
    <BaseView
      ref={baseViewRef}
      hasStatusBar
      hasHeader
      hasBack
      onBackPress={() => _onBack()}
      title={'High5 Resume'}
      rightComponent={
        <ButtonView
          title={'Save'}
          buttonStyle={{backgroundColor: colors.accent, paddingHorizontal: 16}}
          size="small"
          containerStyle={{marginRight: 8}}
          disabled={selectedResumeTemplate === null}
          onPress={() => _onSavePress()}
        />
      }>
      <ScrollView
        style={styles.parent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 64}}>
        {/* <MenuItem
          hasIcon
          iconName="upload"
          iconType="feather"
          title="Upload Resume"
          selected={false}
          onPress={() => {}}
          // titleStyle={styles.menuItemTitle}
          // parentStyle={styles.menuItemParent}
        /> */}

        <TouchableOpacity onPress={() => _onAddResumeTemplate()}>
          <View style={styles.addTemplateView}>
            <Text style={[styles.text, {color: '#999', flex: 1}]}>
              Selected Template
            </Text>
            <Text style={[styles.text, {color: '#999', marginRight: 8}]}>
              {selectedResumeTemplate === null
                ? ' No Template Selected'
                : selectedResumeTemplate.title}
            </Text>
            <Icon
              name={'arrow-forward-ios'}
              type={'material'}
              color={'#999999'}
              size={18}
            />
          </View>
        </TouchableOpacity>

        <ProfileTitleView
          title="Contact Info"
          iconName="user"
          iconType="feather"
          checked={hasPersonalInfo}
          onCheckPress={() => {
            if (profilePersonalInfo !== null) {
              setHasPersonalInfo(prevState => !prevState);
            } else {
              showAlert('error', 'Add Contact Info');
            }
          }}
          onPress={() => props.navigation.navigate('PersonalInfo')}>
          {profilePersonalInfo !== null && (
            <Text style={[styles.text, {fontFamily: fonts.notoSans800}]}>
              ADDED
            </Text>
          )}
        </ProfileTitleView>
        {/* setup social media */}
        <ProfileTitleView
          title="Social Media"
          iconName="package"
          iconType="feather"
          checked={hasSocialMedia}
          onCheckPress={() => {
            if (profileSocialMedia !== null) {
              setHasSocialMedia(prevState => !prevState);
            } else {
              showAlert('error', 'Add Social Info');
            }
          }}
          onPress={() => props.navigation.navigate('SocialMedia')}>
          {profileSocialMedia !== null && (
            <View>
              {profileSocialMedia.linkedIn !== '' && (
                <ProfileItemView
                  hasIcon
                  iconName="users"
                  iconType="feather"
                  value={profileSocialMedia.linkedIn}
                />
              )}
              {profileSocialMedia.website !== '' && (
                <ProfileItemView
                  hasIcon
                  iconName="link"
                  iconType="feather"
                  value={profileSocialMedia.website}
                />
              )}
            </View>
          )}
        </ProfileTitleView>

        {/* setup story info */}
        <ProfileTitleView
          title="Story Info"
          iconName="file-text"
          iconType="feather"
          checked={hasStoryInfo}
          onCheckPress={() => {
            if (profileStory !== null) {
              setHasStoryInfo(prevState => !prevState);
            } else {
              showAlert('error', 'Add Story Info');
            }
          }}
          onPress={() => props.navigation.navigate('ProfileStory')}>
          {profileStory !== '' && <ProfileItemView value={profileStory} />}
        </ProfileTitleView>

        {/* set up skills */}
        <ProfileTitleView
          title="Skills"
          iconName="head-cog-outline"
          iconType="material-community"
          checked={hasSkillsData}
          onCheckPress={() => {
            if (profileSkills !== null) {
              setHasSkillsData(prevState => !prevState);
            } else {
              showAlert('error', 'Add Skills');
            }
          }}
          onPress={() => props.navigation.navigate('Skills', {flag: 0})}>
          {profileSkills !== null && (
            <Fragment>
              <ProfileDetailView
                data={profileSkills.primarySkills}
                renderItem={(item, index) => renderItemView(item, index)}
                onMorePress={() =>
                  props.navigation.navigate('Skills', {flag: 0})
                }
              />
              <ProfileItemView
                hasIcon
                iconName="link"
                iconType="feather"
                value={profileSkills.skillSet[0]}
              />
            </Fragment>
          )}
        </ProfileTitleView>

        {/* setup education  */}
        <ProfileTitleView
          title="Education"
          iconName="book-open"
          iconType="feather"
          checked={hasEducation}
          onCheckPress={() => {
            if (profileEducation.length > 0) {
              setHasEducation(prevState => !prevState);
            } else {
              showAlert('error', 'Add Education');
            }
          }}
          onPress={() => props.navigation.navigate('Education')}>
          <ProfileDetailView
            data={profileEducation}
            renderItem={(item, index) =>
              renderItemView(item.educationProgram, index)
            }
            onMorePress={() => props.navigation.navigate('Education')}
          />
        </ProfileTitleView>

        {/* set up work experience */}
        <ProfileTitleView
          title="Work Experience"
          iconName="certificate-outline"
          iconType="material-community"
          checked={hasWorkExperience}
          onCheckPress={() => {
            if (profileExperiences.length > 0) {
              setHasWorkExperience(prevState => !prevState);
            } else {
              showAlert('error', 'Add Work Experience');
            }
          }}
          onPress={() => props.navigation.navigate('WorkExperience')}>
          <ProfileDetailView
            data={profileExperiences}
            renderItem={(item, index) =>
              renderItemView(item.employerName, index)
            }
            onMorePress={() => props.navigation.navigate('WorkExperience')}
          />
        </ProfileTitleView>

        {/* set up Certificates */}
        <ProfileTitleView
          title="Certificates"
          iconName="file-minus"
          iconType="feather"
          checked={hasCertificates}
          onCheckPress={() => {
            if (profileCertificates.length > 0) {
              setHasCertificates(prevState => !prevState);
            } else {
              showAlert('error', 'Add Certificate');
            }
          }}
          onPress={() => props.navigation.navigate('Certificates')}>
          <ProfileDetailView
            data={profileCertificates}
            renderItem={(item, index) =>
              renderItemView(item.certificationName, index)
            }
            onMorePress={() => props.navigation.navigate('Certificates')}
          />
        </ProfileTitleView>

        {/* set up Awards & Honors */}
        <ProfileTitleView
          title="Awards & Honors"
          iconName="award"
          iconType="feather"
          checked={hasAwardsAndHonors}
          onCheckPress={() => {
            if (profileAwardsAndHonorsList.length > 0) {
              setHasAwardsAndHonors(prevState => !prevState);
            } else {
              showAlert('error', 'Add Award or honor');
            }
          }}
          onPress={() => props.navigation.navigate('AwardsAndHonors')}>
          <ProfileDetailView
            data={profileAwardsAndHonorsList}
            renderItem={(item, index) => renderItemView(item.awardname, index)}
            onMorePress={() => props.navigation.navigate('AwardsAndHonors')}
          />
        </ProfileTitleView>

        {/* set up  Languages*/}
        <ProfileTitleView
          title="Languages"
          iconName="language"
          iconType="material"
          checked={hasLanguages}
          onCheckPress={() => {
            if (profileLanguages.length > 0) {
              setHasLanguages(prevState => !prevState);
            } else {
              showAlert('error', 'Add Language');
            }
          }}
          onPress={() => props.navigation.navigate('Languages')}>
          <ProfileDetailView
            data={profileLanguages}
            renderItem={(item, index) =>
              renderItemView(item.languagename, index)
            }
            onMorePress={() => props.navigation.navigate('Languages')}
          />
        </ProfileTitleView>

        {/* set up  Licenses*/}
        <ProfileTitleView
          title="Licenses"
          iconName="file-minus"
          iconType="feather"
          checked={hasLicenses}
          onCheckPress={() => {
            if (profileLicenses.length > 0) {
              setHasLicenses(prevState => !prevState);
            } else {
              showAlert('error', 'Add License');
            }
          }}
          onPress={() => props.navigation.navigate('Licenses')}>
          <ProfileDetailView
            data={profileLicenses}
            renderItem={(item, index) =>
              renderItemView(item.licenseName, index)
            }
            onMorePress={() => props.navigation.navigate('Licenses')}
          />
        </ProfileTitleView>

        {/* set up  Custom Section*/}
        <ProfileTitleView
          title="Custom Section"
          iconName="perm-data-setting"
          iconType="material"
          checked={hasCustomSections}
          onCheckPress={() => {
            if (profileCustomSections.length > 0) {
              setHasCustomSections(prevState => !prevState);
            } else {
              showAlert('error', 'Add Custom Section');
            }
          }}
          onPress={() => props.navigation.navigate('CustomSections')}>
          <ProfileDetailView
            data={profileCustomSections}
            renderItem={(item, index) => renderItemView(item.title, index)}
            onMorePress={() => props.navigation.navigate('CustomSections')}
          />
        </ProfileTitleView>
      </ScrollView>
      <AddResumeName ref={addResumeRef} onSave={_onSaveResume} />
      
    </BaseView>
  );
};

export default High5Resume;

const styles = StyleSheet.create({
  parent: {
    marginHorizontal: 16,
  },
  addTemplateView: {
    backgroundColor: '#d3d3d3',

    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: colors.success,
    fontSize: 14,
    // fontFamily: fonts.notoSans400,
  },
});
