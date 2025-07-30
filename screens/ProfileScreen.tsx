import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { logoutUser, getCurrentUser } from "../services/authService";
import { User } from "firebase/auth";

const ProfileScreen = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Get current user when component mounts
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  // Handle logout functionality
  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            const result = await logoutUser();
            if (result.success) {
              // User will be automatically redirected by auth state listener in App.tsx
              console.log("User logged out successfully");
            } else {
              Alert.alert("Error", result.error || "Failed to logout");
            }
          } catch (error) {
            Alert.alert("Error", "An unexpected error occurred during logout");
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Profile</Text>

        <View style={styles.userInfo}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user?.email || "No email"}</Text>

          <Text style={styles.label}>User ID:</Text>
          <Text style={styles.value}>{user?.uid || "No user ID"}</Text>

          <Text style={styles.label}>Account Created:</Text>
          <Text style={styles.value}>
            {user?.metadata?.creationTime
              ? new Date(user.metadata.creationTime).toLocaleDateString()
              : "Unknown"}
          </Text>

          <Text style={styles.label}>Last Sign In:</Text>
          <Text style={styles.value}>
            {user?.metadata?.lastSignInTime
              ? new Date(user.metadata.lastSignInTime).toLocaleDateString()
              : "Unknown"}
          </Text>
        </View>

        <Button title="Sign Out" color="red" onPress={handleLogout} />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  userInfo: {
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    color: "#555",
  },
  value: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    paddingLeft: 10,
  },
});
