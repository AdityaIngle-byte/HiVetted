import {Image, ImageBackground, StyleSheet, Text} from 'react-native';
import React, {useEffect} from 'react';
import BaseView from '../../hoc/BaseView';
import {images} from '../../../assets/images';
import {fonts} from '../../../values/fonts';
import {colors} from '../../../values/colors';
import {getUserPref} from '../../../utils/UserPrefs';
import {setUserPrefs} from '../../../redux/actions/customerLoginActions';
import { useDispatch } from 'react-redux';

const Splash = props => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    init();
    return () => {};
  }, []);

  const init = () => {
    setTimeout(() => {
      props.navigation.replace('MainRoutes');
    }, 2000);
  };


  return (
    <BaseView>
      <ImageBackground
        style={styles.parent}
        source={images.splash}
        resizeMode="stretch">
        <Image
          source={images.high5Logo}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.text}>
          Work, <Text style={{color: colors.accent}}>Liberated.</Text>
        </Text>
        {/* <Text style={styles.text}>
          Solutions for every stage {'\n'}in your hiring process
        </Text> */}
      </ImageBackground>
    </BaseView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 72
    // paddingTop: 144,
    // paddingLeft: 16,
  },
  logo: {
    height: 144,
    width: '60%',
    marginLeft: 16,
  },
  text: {
    fontSize: 18,
    color: '#fff',
    fontFamily: fonts.notoSans700,
    paddingLeft: 16,
  },
});
