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
import { registerUser } from "../services/authService";

const RegistrationScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Registration Function with proper error handling
  const register = async () => {
    // Validation
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      const result = await registerUser(email, password);

      if (result.success) {
        Alert.alert("Success", "Account created successfully!");
        // User will be automatically logged in and redirected by the auth state listener
      } else {
        Alert.alert("Registration Failed", result.error || "An error occurred");
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const goToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <Text style={styles.title}>Create Account</Text>

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

        <TextInput
          style={styles.inputField}
          placeholder="Confirm Password"
          onChangeText={(newText) => setConfirmPassword(newText)}
          value={confirmPassword}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={register}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Create Account</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkButton} onPress={goToLogin}>
          <Text style={styles.linkText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputField: {
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    marginTop: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "black",
    textAlign: "center",
    padding: 10,
    marginTop: 30,
    borderRadius: 5,
  },
  buttonDisabled: {
    backgroundColor: "#666",
    opacity: 0.7,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
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
