import AsyncStorage from "@react-native-async-storage/async-storage";
import Slider from "@react-native-community/slider";
import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView } from "react-native";

const App = () => {
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);

  useEffect(() => {
    loadColor();
  }, []);

  useEffect(() => {
    saveColor();
  }, [red, green, blue]);

  const loadColor = async () => {
    try {
      const savedRed = await AsyncStorage.getItem("@red");
      const savedGreen = await AsyncStorage.getItem("@green");
      const savedBlue = await AsyncStorage.getItem("@blue");
      if (savedRed !== null) setRed(parseFloat(savedRed));
      if (savedGreen !== null) setGreen(parseFloat(savedGreen));
      if (savedBlue !== null) setBlue(parseFloat(savedBlue));
    } catch (e) {
      console.error("Failed to load color");
    }
  };

  const saveColor = async () => {
    try {
      await AsyncStorage.setItem("@red", red.toString());
      await AsyncStorage.setItem("@green", green.toString());
      await AsyncStorage.setItem("@blue", blue.toString());
    } catch (e) {
      console.error("Failed to save color");
    }
  };

  const backgroundColor = `rgb(${Math.round(red * 255)}, ${Math.round(
    green * 255
  )}, ${Math.round(blue * 255)})`;

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor }}>
      <View className="flex-1 justify-center px-4">
        <View className="bg-white/80 rounded-lg p-4">
          <Text className="text-lg mb-2">Red: {Math.round(red * 255)}</Text>
          <Slider
            className="w-full h-10 mb-4"
            minimumValue={0}
            maximumValue={1}
            value={red}
            onValueChange={setRed}
            minimumTrackTintColor="#ff0000"
            thumbTintColor="#ff0000"
          />
          <Text className="text-lg mb-2">Green: {Math.round(green * 255)}</Text>
          <Slider
            className="w-full h-10 mb-4"
            minimumValue={0}
            maximumValue={1}
            value={green}
            onValueChange={setGreen}
            minimumTrackTintColor="#00ff00"
            thumbTintColor="#00ff00"
          />
          <Text className="text-lg mb-2">Blue: {Math.round(blue * 255)}</Text>
          <Slider
            className="w-full h-10 mb-4"
            minimumValue={0}
            maximumValue={1}
            value={blue}
            onValueChange={setBlue}
            minimumTrackTintColor="#0000ff"
            thumbTintColor="#0000ff"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
