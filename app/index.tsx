import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Redirect, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import CustomButton from '@/components/CustomButton'
import 'react-native-url-polyfill/auto'
import { useGlobalContext } from '@/context/GlobalProvider'

const App = () => {
  const {isLoading, isLoggedIn} = useGlobalContext();
  if(!isLoading && isLoggedIn){
    return <Redirect href="/home"/>
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
       <View className="w-full flex justify-center items-center h-full px-4">
         <Image source={images.logo} resizeMode='contain' className="w-[140px] h-[82px]"/>
         <Image source={images.cards} resizeMode='contain' className="max-w-[380px] w-full h-[280px]"/>
         <View className="relative mt-5">
          <Text className="text-3xl text-white font-bold text-center">Discover Endless{"\n"}
              Possibilities with{" "} <Text className="text-secondary-200">Aora</Text></Text>
          <Image source={images.path} resizeMode='contain' className="absolute w-[136px] h-[15px] -bottom-2 -right-8"/>
         </View>
         <Text className="text-sm font-pregular text-gray-100 mt-6 text-center">Where creativity meets innovation: embark on a journey of limitless exploration with Aora</Text>
         <CustomButton title="Continue with Email" handlePress={()=>router.push('/sign-in')} containerStyles="mt-6" />
       </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style="light" />
    </SafeAreaView>
  )
}

export default App