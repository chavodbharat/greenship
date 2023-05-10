import React, { useCallback, useEffect, useState } from 'react';
import styles from './styles';
import {View, Text, Image, SafeAreaView, Pressable, TouchableWithoutFeedback, Platform, TextInput} from 'react-native';
import { Avatar, Bubble, Composer, GiftedChat, IMessage, InputToolbar, Send, SendProps, Time } from 'react-native-gifted-chat'
import { useTheme } from '../../../providers/ThemeProvider';
import { fonts } from '../../../theme/fonts';
import AllImages from '../../../utils/Constants/AllImages';
import { scale, verticalScale } from '../../../theme/responsive';
import { goBack } from '../../../routing/navigationRef';
import { Button } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Chat = () => {
  const {colors} = useTheme();
  const [state, setState] = useState({
    loader: false,
    messages: [],
    step: 0,
  });
  
  useEffect(() => {
    const strObj: any = [
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'Hello developer I am Keyur Patel which is very important in your list',
        createdAt: new Date(),
        user: {
          _id: 3,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ];

    setState(prev => ({...prev, messages: strObj}));
  }, [])

  const renderBubble = (props: any) => {
    return  <Bubble
    {...props}
    renderTime={() => 
      <Time {...props}
        timeTextStyle={{
          left: styles.leftSideBottomTimeTextStyle,
          right: styles.rightSideBottomTimeTextStyle,
        }}
      />
    }
    tickStyle={{ color: props.currentMessage.seen ? '#34B7F1' : '#999' }}
    // containerStyle={{
    //   left: styles.leftSideViewContainer,
    //   right: {},
    // }}
    wrapperStyle={{
      left: styles.leftSideViewContainer,
      right: styles.rightSideViewContainer,
    }}
    textStyle={{
      left: styles.leftSideTextStyle,
      right: styles.rightSideTextStyle,
    }}
    // bottomContainerStyle={{
    //   left: { borderColor: 'purple', borderWidth: 4 },
    //   right: {},
    // }}
    // tickStyle={{}}
    // usernameStyle={{ color: 'tomato', fontWeight: '100' }}
    bottomContainerStyle={{
      left: styles.bottomViewTextStyle,
      right: styles.bottomViewTextStyle,
    }}
    // containerToNextStyle={{
    //   left: { borderColor: 'navy', borderWidth: 4 },
    //   right: {},
    // }}
    // containerToPreviousStyle={{
    //   left: { borderColor: 'mediumorchid', borderWidth: 4 },
    //   right: {},
    // }}
  />
  }

  const renderChatFooter = () => {
    return (
      <View>
        
      </View>
    )
  }

  const renderAvtar = (props: any) => {
   // console.log(props)
    return (
      <Avatar {...props}
      imageStyle = {{
        left: styles.avtarLeftProfileStyle,
        right: styles.avtarLeftProfileStyle
      }}
        />
      // <>
      // <Image
      //   style={styles.avtarLeftProfileStyle}
      //   source={{uri: props.currentMessage.user.avatar}}/>
      //   <Image
      //   style={styles.avtarLeftProfileStyle}
      //   source={{uri: props.previousMessage?.user?.avatar}}/>
      // </>  
    )
  }

  
  const onSend = (messages = []) => {
    console.log("Messages", messages);
    const step = state.step + 1
    setState((previousState: any) => {
      const sentMessages = [{ ...messages[0], sent: true,  receiived: true}]
      return {
        messages: GiftedChat.append(
          previousState.messages,
          sentMessages,
          Platform.OS !== 'web',
        ),
        step,
      }
    })
  }
  
  return (
    <SafeAreaView style={styles.flexOneView}>
      <View style={{padding: scale(5)}}>
        <Text style={styles.userNameHeaderTextStyle}>Keyur Patel</Text>
        <Text style={styles.userOnlineOfflineStatusStyle}>Online</Text>
        <TouchableWithoutFeedback
          onPress={goBack}>
          <View style={styles.imageLeftArrowParentView}>
            <Image
              style={styles.imageLeftArrowStyle}
              source={AllImages.leftBackIcon} />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.flexOneView}>
        <GiftedChat
          messages={state.messages}
          renderBubble={renderBubble}
          renderChatFooter={renderChatFooter}
          alwaysShowSend={true}
          showUserAvatar={true}
          renderAvatar={obj => renderAvtar(obj)}
          renderAvatarOnTop={true}
          showAvatarForEveryMessage={true}
          onSend={(messages) => onSend(messages)}
          renderComposer={(props) => <Composer 
            textInputStyle={styles.customTextInputStyle}
            placeholder={"create message"} 
            {...props} />}
          //renderInputToolbar={(props) => MessengerBarContainer(props)}
          renderSend={(props: SendProps<IMessage>) => (       
            <Send {...props} containerStyle={styles.sendBtnStyle}>
              <Text style={styles.sendFontStyle}>SEND</Text>
            </Send>
          )}
          user={{
            _id: 1,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Chat;
