import React, {useEffect, useState} from 'react';
import styles from './styles';
import {View, Text, Image, SafeAreaView, TouchableWithoutFeedback, Platform, Pressable} from 'react-native';
import { Avatar, Bubble, Composer, GiftedChat, IMessage, Send, SendProps, Time } from 'react-native-gifted-chat'
import { useTheme } from '../../../../providers/ThemeProvider';
import AllImages from '../../../../utils/Constants/AllImages';
import {scale} from '../../../../theme/responsive';
import {goBack, replace} from '../../../../routing/navigationRef';
import { usePubNub } from "pubnub-react";
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getUserProfilePic } from '../../../../redux/actions/homeAction';
import { CHAT_LIST_SCREEN } from '..';
import ImageSelection from '../../../../components/imageSelection';
import ImagePicker from 'react-native-image-crop-picker';

export const CHAT_DETAILS_SCREEN = {
  name: 'ChatDetails',
};

const ChatDetails = ({route}: any) => {
  const {colors} = useTheme();
  const pubnub = usePubNub();
  const { friendId, userName, userData, isFromChatList = true } = route.params;
  const dispatch = useDispatch();
  const [state, setState] = useState({
    messages: [],
    step: 0,
    userProfilePic: null,
    onlineStatus: "-",
    imageModalVisible: false,
    imageType: '',
  });

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

  useEffect(() => {
    getOnlineStatusOfUser();
  }, [state.messages]);
  
  const getOnlineStatusOfUser = () => {
    pubnub.hereNow({
      channels: [getChannelName()],
      includeUUIDs: true,
      includeState: true,
    }, (status, response) => {
      if(response){
        const strChannelsObj = response.channels[getChannelName()];
        if(Object.keys(strChannelsObj).length > 0){
          const strOccupants = strChannelsObj.occupants;
          let users = strOccupants.find(data => data.uuid.toString() === friendId.toString());
          if(users && Object.keys(users).length > 0){
            setState(prev => ({...prev, onlineStatus: "Online"}));
          } else {
            setState(prev => ({...prev, onlineStatus: "Offline"}));
          }
        } else {
          setState(prev => ({...prev, onlineStatus: "Offline"}));
        }
      }
    });
  }

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
        },
        presence: (presenceEvent: any) => {
          // handle presence
          //console.log("Presence Event ===========================================>", presenceEvent);
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

  const openCamera = () => {
    try {
      ImagePicker.openCamera({
        width: state.imageType === 'cover' ? 1350 : 500,
        height: 500,
        cropping: true,
      }).then(async image => {
        sendImageInMessage(image);
      });
    } catch (e) {
      //console.log('error', e);
    }
  };

  const openGallery = () => {
    try {
      ImagePicker.openPicker({
        width: state.imageType === 'cover' ? 1350 : 500,
        height: 500,
        cropping: true,
      }).then(async (image: any) => {
        sendImageInMessage(image);
      });
    } catch (e) {
    }
  };

  const sendImageInMessage = async (image: any) => {
    // Generate a unique ID for the message
    const messageId = generateMessageId();

    // Create the message object with image, ID, and createdAt
    const message = {
      _id: messageId,
      createdAt: new Date().toISOString(),
      image: Platform.OS === 'ios' ? image.path.replace('file://', '') : image.path,
      user: {
        _id: userData?.id,   
        name: userData?.displayName,
        avatar: state.userProfilePic ? state.userProfilePic : 'https://placeimg.com/140/140/any',
      }
    }
    try {
      await pubnub.publish({
        channel: getChannelName(),
        message
      });
    } catch (error) {
    }
    setState(prev => ({...prev, imageModalVisible: false}));
  }

  // Generate a unique ID for the message
  const generateMessageId = () => {
    return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  };

  const onBackPress = () => {
    if(isFromChatList) 
      replace(CHAT_LIST_SCREEN.name);
    else
      goBack(); 
  }

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
    wrapperStyle={{
      left: styles.leftSideViewContainer,
      right: styles.rightSideViewContainer,
    }}
    textStyle={{
      left: styles.leftSideTextStyle,
      right: styles.rightSideTextStyle,
    }}
    bottomContainerStyle={{
      left: styles.bottomViewTextStyle,
      right: styles.bottomViewTextStyle,
    }}
    // containerStyle={{
    //   right: {marginBottom: 100}
    // }}
  />
  }

  const renderChatFooter = () => {
    return <View style={{height: scale(20)}}/>;
  };

    // custom action 
  const renderActions = () => {
    return(
      <Pressable style={{alignSelf: 'center'}}
        onPress={() => setState(prev => ({...prev, imageModalVisible: true}))}>
        <Image
          style={styles.plusButtonStyle}
          source={AllImages.addIcon}/>
      </Pressable>
    );
  }

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
    console.log("New Messgae", newMessage);
    pubnub.publish({ channel: getChannelName(), message: newMessage });
  }
  
  return (
    <SafeAreaView style={styles.flexOneView}>
      <View style={{padding: scale(5)}}>
        <Text style={styles.userNameHeaderTextStyle}>{userName.substring(0, 1).toUpperCase() + userName.substring(1)}</Text>
        <Text style={styles.userOnlineOfflineStatusStyle}>{state.onlineStatus}</Text>
        <TouchableWithoutFeedback onPress={onBackPress}>
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
          renderActions={renderActions}
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
      <ImageSelection
        modalVisible={state.imageModalVisible}
        setModalVisible={() =>  setState(prev => ({...prev, imageModalVisible: !prev.imageModalVisible}))}
        onPressCamera={openCamera}
        onPressGallery={openGallery}
      /> 
    </SafeAreaView>
  );
};

export default ChatDetails;
