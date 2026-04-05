import { FlatList, StyleSheet, Text, View,Dimensions, ViewToken } from 'react-native'
import React, { useRef, useState } from 'react'
import PostListItem from '@/components/PostListItem'
import postData from "@assets/data/posts.json"



export default function HomeScreen() {
  const {height} = Dimensions.get('window')
  const [currentIndex,setCurrentIndex] = useState(0)
  
  const onViewableItemsChanged = useRef(({viewableItems} : {viewableItems : ViewToken[]}) => {
     if(viewableItems){
       setCurrentIndex(viewableItems[0]?.index || 0)
     }
  })

  // console.log(currentIndex)

  return (
    <View>
      <FlatList
       data = {postData}
       renderItem={({item,index}) => (
        <PostListItem postItem = {item} isActive = {index === currentIndex} />
       )}
       showsVerticalScrollIndicator ={false}
       snapToInterval={height - 80}
       decelerationRate={"fast"}
       disableIntervalMomentum
       onViewableItemsChanged={onViewableItemsChanged.current}
      />
    </View>
  )
}

const styles = StyleSheet.create({})