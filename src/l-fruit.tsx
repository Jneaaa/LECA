import ProdCard from "../src/ProdCard";
import { ScrollView } from "react-native";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const App = () => {
  return (
    <ScrollView>
      <View>
        <View style={styles.pageName}>
          <Text>hello</Text>
        </View>
      </View>
      <ProdCard name="Salted Eggs" desc="1 bulk" price={80.5} image="" />
      <ProdCard name="Tuyo" desc="250g" price={65.0} image="" />
      <ProdCard name="Bitsin" desc="500g" price={69.2} image="" />
      <ProdCard name="Avocado" desc="500g" price={100.0} image="" />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  pageName: { alignContent: "center", alignItems: "center" },
});
export default App;
