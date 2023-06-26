import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { transitionConfig } from './ScreenAnim';

import Splash from '../views/screens/auth/Splash';
import LoginWithCode from '../views/screens/auth/LoginWithCode';
import Dashboard from '../views/screens/home/dashboard/Dashboard';
import PracticeMCQ from '../views/screens/home/mcq/PracticeMCQ';
import SubmitMCQ from '../views/screens/home/mcq/SubmitMCQ';
import OneWay from '../views/screens/home/1Way/OneWay';
import SubmitOneWay from '../views/screens/home/1Way/SubmitOneWay';
// import TwoWay from '../views/screens/home/2Way/TwoWay';
import SubmitTwoWayInterview from '../views/screens/home/2Way/SubmitTwoWayInterview';
// import Modules from '../views/screens/home/dashboard/Modules';
import Instructions from '../views/screens/home/dashboard/Instructions';
import ResumeHome from '../views/screens/home/resume/ResumeHome';
import CreateScript from '../views/screens/home/resume/video/CreateScript';
import VideoResumeInstructions from '../views/screens/home/resume/video/VideoResumeInstructions';
import RecordVideoResume from '../views/screens/home/resume/video/RecordVideoResume';
import VideoPreview from '../views/screens/home/resume/video/VideoPreview';
import High5Resume from '../views/screens/home/resume/custom/High5Resume';
import PersonalInfo from '../views/screens/home/resume/custom/PersonalInfo';
import SocialMedia from '../views/screens/home/resume/custom/SocialMedia';
import ProfileStory from '../views/screens/home/resume/custom/ProfileStory';
import Skills from '../views/screens/home/resume/custom/Skills';
import Education from '../views/screens/home/resume/custom/Education';
import WorkExperience from '../views/screens/home/resume/custom/WorkExperience';
import Certificates from '../views/screens/home/resume/custom/Certificates';
import AwardsAndHonors from '../views/screens/home/resume/custom/AwardsAndHonors';
import Languages from '../views/screens/home/resume/custom/Languages';
import Licenses from '../views/screens/home/resume/custom/Licenses';
import CustomSections from '../views/screens/home/resume/custom/CustomSections';
import AssessmentScreen from '../views/screens/home/assessment/AssessmentScreen';
import GeneralAssessment from '../views/screens/home/General/GeneralAssessment';
import PreviewVideo from '../views/screens/home/1Way/PreviewVideo';
import SelectAddress from '../views/screens/home/resume/custom/SelectAddress';
import ResumeTemplates from '../views/screens/home/resume/custom/template/ResumeTemplates';
import ResumePreview from '../views/screens/home/resume/custom/template/ResumePreview';
import TwoWay from '../views/screens/home/2Way/TwoWay';
import { Platform } from 'react-native';

// Customer Module
import DrawerRoute from './DrawerRoute';
import Login from '../views/screens/auth/Login';

const Stack = createStackNavigator();

export default class Routes extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            transitionSpec: transitionConfig,
            headerShown: false,
            headerMode: 'float',
            animationEnabled: Platform.OS === 'ios' ? true : false
          }}>
          <Stack.Screen name={'Splash'} component={Splash} />
          <Stack.Screen name={'MainRoutes'} component={MainRoutes} />
          <Stack.Screen name={'CustomerModule'} component={CustomerModule} />
          <Stack.Screen name={'PreviewVideo'} component={PreviewVideo} />
          <Stack.Screen
            name={'VideoResumeInstructions'}
            component={VideoResumeInstructions}
          />
          <Stack.Screen name={'VideoPreview'} component={VideoPreview} />
          <Stack.Screen name={'PersonalInfo'} component={PersonalInfo} />
          <Stack.Screen name={'SocialMedia'} component={SocialMedia} />
          <Stack.Screen name={'ProfileStory'} component={ProfileStory} />
          <Stack.Screen name={'Skills'} component={Skills} />
          <Stack.Screen name={'Education'} component={Education} />
          <Stack.Screen name={'WorkExperience'} component={WorkExperience} />
          <Stack.Screen name={'Certificates'} component={Certificates} />
          <Stack.Screen name={'AwardsAndHonors'} component={AwardsAndHonors} />
          <Stack.Screen name={'Languages'} component={Languages} />
          <Stack.Screen name={'Licenses'} component={Licenses} />
          <Stack.Screen name={'CustomSections'} component={CustomSections} />
          <Stack.Screen name={'SelectAddress'} component={SelectAddress} />
          <Stack.Screen name={'ResumePreview'} component={ResumePreview} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const MainRoutes = () => {
  return (
    <Stack.Navigator
      // headerMode='none'
      initialRouteName="LoginWithCode"
      screenOptions={{
        transitionSpec: transitionConfig,
        headerShown: false,
      }}>
      <Stack.Screen name={'LoginWithCode'} component={LoginWithCode} />
      <Stack.Screen name={'Dashboard'} component={Dashboard} />
      <Stack.Screen name={'Instructions'} component={Instructions} />
      <Stack.Screen name={'PracticeMCQ'} component={PracticeMCQ} />
      <Stack.Screen name={'SubmitMCQ'} component={SubmitMCQ} />

      <Stack.Screen name={'AssessmentScreen'} component={AssessmentScreen} />
      <Stack.Screen name={'GeneralAssessment'} component={GeneralAssessment} />
      <Stack.Screen name={'OneWay'} component={OneWay} />
      <Stack.Screen name={'SubmitOneWay'} component={SubmitOneWay} />

      <Stack.Screen name={'TwoWay'} component={TwoWay} />
      <Stack.Screen name={'SubmitTwoWay'} component={SubmitTwoWayInterview} />

      <Stack.Screen name={'ResumeHome'} component={ResumeHome} />
      <Stack.Screen name={'High5Resume'} component={High5Resume} />
      <Stack.Screen name={'CreateScript'} component={CreateScript} />

      <Stack.Screen name={'RecordResume'} component={RecordVideoResume} />
      <Stack.Screen name={'ResumeTemplates'} component={ResumeTemplates} />
    </Stack.Navigator>
  );
};

const CustomerModule = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        transitionSpec: transitionConfig,
        headerShown: false,
      }}>
      <Stack.Screen name={'Login'} component={Login} />
      <Stack.Screen name={'DrawerRoute'} component={DrawerRoute} />
    </Stack.Navigator>
  );
};
