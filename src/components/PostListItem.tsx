import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback } from 'react'
import { useVideoPlayer, VideoView } from 'expo-video';
import { Ionicons } from '@expo/vector-icons';
import { Post } from '@/types/types';
import { useFocusEffect } from 'expo-router';

// const videoSource =
//   'https://www.w3schools.com/html/mov_bbb.mp4';

type VideoItemProps = {
  postItem: Post,
  isActive : Boolean,
}

export default function PostListItem({ postItem,isActive }: VideoItemProps) {
  const { height } = Dimensions.get('window')
  const {description,id,nrOfComments,nrOfLikes,nrOfShares,user,video_url} = postItem

  const player = useVideoPlayer(video_url, player => {
    player.loop = true;
   
  });

  // console.log("Player", player)

  useFocusEffect(
    useCallback (() =>{
      if(!player) return
      try {
        if(isActive){
          player.play()
        }
      } catch (error) {
        console.log(error)
      }

      return () => {
        try {
          if(player && isActive){
          player.pause()
          }
        } catch (error) {
          console.log(error)
        }
      }
    },[isActive,player])
  )

  return (
    <View style={{ height  }}>
      <VideoView
        style={{ flex: 1 }}
        player={player}
        contentFit='cover'
        nativeControls={false}
      />

      <View style={styles.interactionBars}>
        <TouchableOpacity style={styles.interactionButton} onPress={() => console.log("Heart Pressed")}>
          <Ionicons name="heart" size={33} color="#fff" />
          <Text style={styles.interactionText}>{nrOfLikes[0]?.count || 0}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.interactionButton} onPress={() => console.log("Comment Pressed")}>
          <Ionicons name="chatbubble" size={33} color="#fff" />
          <Text style={styles.interactionText}>{nrOfComments[0].count || 0}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.interactionButton} onPress={() => console.log("Share Pressed")}>
          <Ionicons name="arrow-redo" size={33} color="#fff" />
          <Text style={styles.interactionText}>{nrOfShares[0].count || 0}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.avatar} onPress={() => console.log("Share Pressed")}>
          <Text>{user?.username.charAt(0).toUpperCase()}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.videoInfo}>
        <Text style={styles.username}>{user?.username}</Text>
        <Text style={styles.description}>{description} </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  interactionBars: {
    position: "absolute",
    right: 20,
    bottom: 20,
    alignItems: 'center',
    gap: 25,
  },
  interactionButton: {
    alignItems: "center",
    gap: 5,
  },
  interactionText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: '600',
  },
  avatar: {
    width: 34,
    height: 34,
    backgroundColor: '#fff',
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  videoInfo: {
    position: "absolute",
    bottom: 20,
    left: 15,
    right: 100,
    gap: 5,
  },
  username: {
    color: "#fff",
  },
  description: {
    color: "#fff"
  }

});