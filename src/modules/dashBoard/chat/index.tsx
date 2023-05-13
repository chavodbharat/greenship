import React, {useCallback, useEffect, useState} from 'react';
import styles from './styles';
import {View, Text, Image, SafeAreaView, Pressable, TouchableWithoutFeedback, Platform, TextInput} from 'react-native';
import { Avatar, Bubble, Composer, GiftedChat, IMessage, InputToolbar, Send, SendProps, Time } from 'react-native-gifted-chat'
import { useTheme } from '../../../providers/ThemeProvider';
import { fonts } from '../../../theme/fonts';
import AllImages from '../../../utils/Constants/AllImages';
import {scale, verticalScale} from '../../../theme/responsive';
import {goBack} from '../../../routing/navigationRef';
import {Button} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { usePubNub } from "pubnub-react";
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { getUserProfilePic } from '../../../redux/actions/homeAction';

const Chat = () => {
  const {colors} = useTheme();
  const pubnub = usePubNub();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [messages, setMessages] = useState([]);
  const [state, setState] = useState({
    loader: false,
    messages: [],
    step: 0,
    userProfilePic: null
  });

  const {userData} = useSelector(
    state => ({
      userData: state.auth?.loginData,
    }),
    shallowEqual,
  );

  useEffect(() => {
    if (userData?.id) {
      let body = {
        context: 'view',
        id: userData?.id,
      };

      dispatch(
        getUserProfilePic(body, (res: any) => {
          console.log("res", res[0]?.thumb)
          setState(prev => ({...prev, userProfilePic: res[0]?.thumb}));
        }),
      );
    }
  }, [isFocused, userData?.id]);
  

  useEffect(() => {
    let shouldSetMessages = true;

    const fetchHistory = async () => {
      try {
        const response = await pubnub.fetchMessages({
          channels: ["Channel-Barcelona"],
          includeUUID: true,
          count: 50,
        });
        
        const allData = response.channels['Channel-Barcelona'];
        const allArrayData: any[] = [];
        if(allData && allData.length > 0){
          allData.forEach(data => {
            if(!data.message.content){
              allArrayData.push(data.message);
            }
          });
        }
        setState(prev => ({...prev, messages: allArrayData.reverse()}));
        if (!shouldSetMessages) {
          return;
        }
      } catch (e) {
        console.log('error fetching history', e);
      }
    };

    fetchHistory();

    return () => {
      shouldSetMessages = false;
    };
  }, [pubnub, isFocused]);

   // First we need to set our PubNub UUID and subscribe to chat channel.
  // We will use `useEffect` hook for that.
  useEffect(() => {
    // We need to make sure that PubNub is defined
    if (pubnub) {
      if(userData.id){
        pubnub.setUUID(userData.id.toString()); 
      }
      // Create a listener that will push new messages to our `messages` variable
      // using the `setMessages` function.
      const listener = {
        message: (receiveData: any) => {
          
          // setState((previousState: any) => {
          //   return {
          //     messages: [...previousState.messages, receiveData.message]
          //   }
          // });

          const step = state.step + 1;

          setState((previousState: any) => {
            const sentMessages = [{...receiveData.message}];
            return {
              messages: GiftedChat.append(
                previousState.messages,
                sentMessages,
                Platform.OS !== 'web',
              ),
              step,
            }
          })

          // let updatedMessage = state.messages.push(receiveData.message);
          // console.log("updatedMessage", updatedMessage)
        //  setState(prev => ({...prev, messages: prev.messages.push(receiveData.message)}));
        }
      };

      // Add the listener to pubnub instance and subscribe to `chat` channel.
      pubnub.addListener(listener);
      pubnub.subscribe({ channels: ["Channel-Barcelona"] });

      // We need to return a function that will handle unsubscription on unmount
      return () => {
        pubnub.removeListener(listener);
        pubnub.unsubscribeAll();
      };
    }
  }, [pubnub]);

  const renderBubble = (props: any) => {
    return  <Bubble
    {...props}
    key={props.index}
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
    return <View></View>;
  };

  const renderAvtar = (props: any) => {
   // console.log(props)
    return (
      <Avatar {...props}
      showAvatarForEveryMessage={true}
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
    console.log('Messages', messages);
    const step = state.step + 1;

    // setState((previousState: any) => {
    //   const sentMessages = [{...messages[0], sent: true, received: true}];
    //   return {
    //     messages: GiftedChat.append(
    //       previousState.messages,
    //       sentMessages,
    //       Platform.OS !== 'web',
    //     ),
    //     step,
    //   }
    // })

    // Publish our message to the channel `chat`
    const newMessage: any = messages[0];
    pubnub.publish({ channel: "Channel-Barcelona", message: newMessage });
  }
  
  return (
    <SafeAreaView style={styles.flexOneView}>
      <View style={{padding: scale(5)}}>
        <Text style={styles.userNameHeaderTextStyle}>{userData?.displayName}</Text>
        <Text style={styles.userOnlineOfflineStatusStyle}>Online</Text>
        <TouchableWithoutFeedback onPress={goBack}>
          <View style={styles.imageLeftArrowParentView}>
            <Image
              style={styles.imageLeftArrowStyle}
              source={AllImages.leftBackIcon}
            />
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
            _id: userData?.id,   
            name: userData?.displayName,
            avatar: state.userProfilePic ? state.userProfilePic : 'https://placeimg.com/140/140/any',
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Chat;
