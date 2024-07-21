import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React from "react";
import { icons } from "@/constants";
interface FormFieldProps {
  title: string;
  value: string;
  handleChange: (e: any) => void;
  placeholder: string;
  otherStyles: string;
  keyboardType: string;
}
const FormField = ({
  title,
  value,
  handleChange,
  placeholder,
  otherStyles,
  keyboardType,
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <View className={`space-y-2 w-full justify-start  ${otherStyles}`}>
      <Text className="text-sm text-gray-100 font-pmedium">{title}</Text>
      <View className="border-2 border-black-200 w-full h-14 px-4 rounded-lg bg-black-100 focus:border-secondary items-center flex-row">
        <TextInput
          className="flex-1 text-white font-pregular text-sm w-full"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChange}
          secureTextEntry={title==="Password" && !showPassword}
        />
        {title === "Password" && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Image
                    source={showPassword ? icons.eye : icons.eyeHide}
                    resizeMode="contain"
                    className="w-6 h-6"/>
            </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
