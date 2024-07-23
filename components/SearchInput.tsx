import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React from "react";
import { icons } from "@/constants";
interface FormFieldProps {
  value: string;
  handleChange: (e: any) => void;
  placeholder: string;
}
const SearchInput = ({
  value,
  handleChange,
  placeholder,
}: FormFieldProps) => {
  
  return (
    
      <View className="border-2 border-black-200 w-full h-14 px-4 rounded-lg bg-black-100 focus:border-secondary items-center flex-row space-x-4">
        <TextInput
          className="font-pregular text-base mt-0.5 text-white flex-1"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChange}
        />
            <TouchableOpacity onPress={() => {}}>
                <Image
                    source={icons.search}
                    resizeMode="contain"
                    className="w-5 h-5"/>
            </TouchableOpacity>
      </View>
  );
};

export default SearchInput;
