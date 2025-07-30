import {
  TextInput,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as React from "react";
import { useState } from "react";
import { loginUser } from "../services/authService";

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //   Login Function with proper error handling
  const login = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    setIsLoading(true);
    try {
      const result = await loginUser(email, password);

      if (result.success) {
        Alert.alert("Success", "Login successful!");
        // Navigate to next screen
      } else {
        Alert.alert("Login Failed", result.error || "An error occurred");
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const goToRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.inputField}
          placeholder="Your Email"
          onChangeText={(newText) => setEmail(newText)}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TextInput
          style={styles.inputField}
          placeholder="Your Password"
          onChangeText={(newText) => setPassword(newText)}
          value={password}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={login}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        {/* Link to Registration Screen */}
        <TouchableOpacity style={styles.linkButton} onPress={goToRegister}>
          <Text style={styles.linkText}>Don't have an account? Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 30,
  },
  inputField: {
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    marginTop: 15,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "black",
    textAlign: "center",
    padding: 10,
    marginTop: 30,
  },
  buttonDisabled: {
    backgroundColor: "#666",
    opacity: 0.7,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
  },
  linkButton: {
    marginTop: 20,
    padding: 10,
  },
  linkText: {
    textAlign: "center",
    color: "black",
    fontSize: 16,
  },
});
