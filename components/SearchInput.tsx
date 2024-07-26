import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React from "react";
import { icons } from "@/constants";
import { router, usePathname } from "expo-router";
interface FormFieldProps {
  placeholder: string;
  initialQuery?: string;
}
const SearchInput = ({ placeholder, initialQuery }: FormFieldProps) => {
  const pathname = usePathname();
  const [query, setQuery] = React.useState(initialQuery || "");
  return (
    <View className="border-2 border-black-200 w-full h-14 px-4 rounded-lg bg-black-100 focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="font-pregular text-base mt-0.5 text-white flex-1"
        value={query}
        placeholder={placeholder}
        placeholderTextColor="#cdcde0"
        onChangeText={(e) => setQuery(e)}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing query",
              "Please input something to search results across database"
            );
          }
          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image source={icons.search} resizeMode="contain" className="w-5 h-5" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
