import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

interface CustomButtonProps {
    title: string
    handlePress: () => void
    containerStyles: string
    textStyles?: string
    isloading?: boolean
}

const CustomButton = ({title, handlePress, containerStyles, textStyles="", isloading=false}:CustomButtonProps) => {
  return (
    <TouchableOpacity onPress={handlePress} disabled={isloading} activeOpacity={0.7} className={`bg-secondary rounded-lg min-h-[56px] justify-center items-center w-full ${containerStyles} ${isloading ? 'opacity-50' : ''}`}>
      <Text className={`text-white font-pmedium text-base ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton