import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useVideoPlayer, VideoView } from 'expo-video';
import {Ionicons} from '@expo/vector-icons';

const videoSource =
  'https://www.w3schools.com/html/mov_bbb.mp4';

export default function PostListItem() {
    const {height} = Dimensions.get('window')

     const player = useVideoPlayer(videoSource, player => {
    player.loop = true;
    player.play();
  });

  console.log("Player",player)

  return (
    <View style={{height}}>
         <VideoView
        style={{flex : 1}}
        player={player}
        contentFit='cover'
        nativeControls={false}
      />

      <View>
        <TouchableOpacity style={{}} onPress={() => console.log("Heart Pressed")}>
            <Ionicons name="heart" size={33} color="#fff" />
            <Text>0</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
});