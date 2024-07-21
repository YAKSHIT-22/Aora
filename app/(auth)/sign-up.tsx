import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../../constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link } from 'expo-router';
const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  })
  const submit = () => {

  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View className='w-full justify-center items-start h-[93%] px-5 my-6'>
         <Image source={images.logo} resizeMode='contain' className='w-[110px] h-[35px]'/>
         <Text className='text-2xl text-white text-semibold mt-6 font-psemibold'>
          Sign Up to Aora!
         </Text>
         <FormField 
          title="Username"
          value={form.username}
          handleChange={(e)=>setForm({...form,username:e})}
          placeholder="Enter your username"
          otherStyles = "mt-7"
          keyboardType="text"
         />
         <FormField 
          title="Email"
          value={form.email}
          handleChange={(e)=>setForm({...form,email:e})}
          placeholder="Enter your email"
          otherStyles = "mt-7"
          keyboardType="email-address"
         />
         <FormField 
          title="Password"
          value={form.password}
          handleChange={(e)=>setForm({...form,password:e})}
          placeholder="Enter your password"
          otherStyles = "mt-7"
          keyboardType=''
         />
         <CustomButton title='Sign In' handlePress={submit} containerStyles='mt-7' isloading={isSubmitting}/>
         <View className='justify-center pt-5 flex-row gap-2'>
          <Text className='text-xs text-gray-100 font-pregular'>
           Have an account already?
          </Text>
          <Link href='/sign-in' className='text-xs text-secondary font-psemibold'>Sign In</Link>
         </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp