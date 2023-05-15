import React, {useEffect, useState} from 'react';
import styles from './styles';
import {View, Text, Image, SafeAreaView, TouchableWithoutFeedback, Platform} from 'react-native';
import { Avatar, Bubble, Composer, GiftedChat, IMessage, Send, SendProps, Time } from 'react-native-gifted-chat'
import { useTheme } from '../../../../providers/ThemeProvider';
import AllImages from '../../../../utils/Constants/AllImages';
import {scale} from '../../../../theme/responsive';
import {goBack, replace} from '../../../../routing/navigationRef';
import { usePubNub } from "pubnub-react";
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getUserProfilePic } from '../../../../redux/actions/homeAction';
import { CHAT_LIST_SCREEN } from '..';

export const CHAT_DETAILS_SCREEN = {
  name: 'ChatDetails',
};

const ChatDetails = ({route}: any) => {
  const {colors} = useTheme();
  const pubnub = usePubNub();
  const { friendId, userName } = route.params;
  const dispatch = useDispatch();
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
          setState(prev => ({...prev, userProfilePic: res[0]?.thumb}));
        }),
      );
    }
  }, [userData?.id]);

  const getChannelName = () => {
    return 'Channel_' + [userData?.id, friendId].sort().join('_');
  }
  
  useEffect(() => {
    let shouldSetMessages = true;

    const fetchHistory = async () => {
      try {
        const response = await pubnub.fetchMessages({
          channels: [getChannelName()]
        });
        
        const allData = response.channels[getChannelName()];
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
  }, [pubnub, userData?.id]);

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
        }
      };

      // Add the listener to pubnub instance and subscribe to `chat` channel.
      pubnub.addListener(listener);
      pubnub.subscribe({ channels: [getChannelName()] });

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
    // Publish our message to the channel `chat`
    const newMessage: any = messages[0];
    pubnub.publish({ channel: getChannelName(), message: newMessage });
  }
  
  return (
    <SafeAreaView style={styles.flexOneView}>
      <View style={{padding: scale(5)}}>
        <Text style={styles.userNameHeaderTextStyle}>{userName.substring(0, 1).toUpperCase() + userName.substring(1)}</Text>
        <Text style={styles.userOnlineOfflineStatusStyle}>Online</Text>
        <TouchableWithoutFeedback onPress={() => replace(CHAT_LIST_SCREEN.name)}>
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

export default ChatDetails;
