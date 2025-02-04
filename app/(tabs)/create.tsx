import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import { ResizeMode, Video } from "expo-av";
import { icons } from "@/constants";
import CustomButton from "@/components/CustomButton";
import * as DocumentPicker from "expo-document-picker";
import { router, usePathname } from "expo-router";
import { createVideo } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import * as ImagePicker from 'expo-image-picker';

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = React.useState(false);
  const pathname = usePathname();
  const [form, setForm] = React.useState({
    title: "",
    prompt: "",
    video: null,
    thumbnail: null,
  });
  useEffect(() => {
    return () => {
      setForm({
        title: "",
        prompt: "",
        video: null,
        thumbnail: null,
      });
    }
  }, [pathname]);
  const openPicker = async (selectType:string) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      if (selectType === "image") {
        setForm({
          ...form,
          // @ts-ignore
          thumbnail: result.assets[0],
        });
      }

      if (selectType === "video") {
        setForm({
          ...form,
          // @ts-ignore
          video: result.assets[0],
        });
      }
    } 
  }
  const submit = async () => {
    if(!form.title || !form.prompt || !form.video || !form.thumbnail){
      return Alert.alert("Error", "Please fill all fields")
    }
    setUploading(true);
    try{
      await createVideo({...form, userId: user.$id})
      Alert.alert("Success", "Video uploaded successfully")
      router.push("/home")
    }catch(e:any){
       Alert.alert("Error", e.message)
    }finally{
      setUploading(false);
      setForm({
        title: "",
        prompt: "",
        video: null,
        thumbnail: null,
      })
    }
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>
        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catchy title...."
          handleChange={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-5"
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity onPress={()=>openPicker('video')}>
            {form.video ? (
              <Video
                // @ts-ignore
                source={{ uri: form.video.uri }}
                className="w-full h-64 rouned-2xl"
                resizeMode={ResizeMode.COVER}
                shouldPlay
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>
          <TouchableOpacity onPress={()=>openPicker('image')}>
            {form.thumbnail ? (
              <Image
                // @ts-ignore
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rouned-2xl"
              />
            ) : (
              <View className="w-full h-16 border-2 border-black-200 flex-row space-x-2 px-4 bg-black-100 rounded-2xl justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-5 h-5"
                  />
                  <Text className="text-sm text-gray-100 font-pmedium">
                    Choose a file
                  </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The prompt you used to create this video"
          handleChange={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-5"
        />
        <CustomButton title="Submit & Publish" handlePress={submit} containerStyles="mt-6" isloading={uploading}/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
