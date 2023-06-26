import { View, Text,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import {Icon} from 'react-native-elements';
import { colors } from '../../values/colors';
import { showConfirmAlert } from '../../utils/Message';
import { clearUserPrefs } from '../../utils/UserPrefs';

export default function MenuView(props) {
    console.log("MenuView")
    console.log(props);
    const [visible, setVisible] = useState(false);

    const hideMenu = (flag) => {
        setVisible(false);
        if(flag==='logout'){
            props._onLogout();
        }
    }

    const showMenu = () => setVisible(true);

  return (
    <Menu
        visible={visible}
        anchor={<TouchableOpacity onPress={showMenu}>
                    <Icon
                    name={'more-vertical'}
                    type={'feather'}
                    color={colors.whiteColor}
                    size={20}
                    />
                </TouchableOpacity>
        }
        onRequestClose={hideMenu}
    >
        <MenuItem onPress={hideMenu}>Profile</MenuItem>
        <MenuItem onPress={hideMenu}>Manage users</MenuItem>
        <MenuItem disabled>Disabled item</MenuItem>
        <MenuDivider />
        <MenuItem  onPress={()=>hideMenu('logout')}>
            <View style={{flexDirection:"row"}}>
                <Icon
                    name={'logout'}
                    type={'MaterialIcons'}
                    size={20}
                />
                 <Text>  Logout</Text>
            </View>
        </MenuItem>
    </Menu>
  )
}