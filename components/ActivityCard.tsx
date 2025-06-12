import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";

type Activity = {
  id: string;
  name: string;
  description?: string;
  duration?: string;
  location?: {
    latitude: number;
    longitude: number;
    cityCode: string;
  };
  price?: { amount: number; currencyCode: string } | string;
  category?: string;
  rating?: number;
  images?: string[];
  bookingLink?: string;
  startTimes?: string[];
};

type Props = {
  activity: Activity;
};

export default function ActivityCard({ activity }: Props) {
  const handlePress = () => {
    if (activity.bookingLink) {
      Linking.openURL(activity.bookingLink).catch(() =>
        alert("Failed to open link.")
      );
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      {activity.images?.length > 0 && (
        <Image
          source={{ uri: activity.images[0] }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <View style={styles.content}>
        <Text style={styles.title}>{activity.name || "Unnamed Activity"}</Text>

        {activity.description && (
          <Text style={styles.description} numberOfLines={2}>
            {activity.description}
          </Text>
        )}

        {activity.category && (
          <Text style={styles.meta}>Category: {activity.category}</Text>
        )}

        {activity.startTimes?.length > 0 && (
          <Text style={styles.meta}>
            Start Times: {activity.startTimes.join(", ")}
          </Text>
        )}

        {typeof activity.rating === "number" && (
          <Text style={styles.rating}>
            ⭐ {activity.rating.toFixed(1)} / 5
          </Text>
        )}

        {activity.price && (
          <Text style={styles.price}>
            Price:{" "}
            {typeof activity.price === "object"
              ? `${activity.price.amount} ${activity.price.currencyCode}`
              : activity.price}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 160,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#1b3a57",
  },
  description: {
    fontSize: 14,
    color: "#333",
    marginBottom: 6,
  },
  meta: {
    fontSize: 13,
    color: "#5a8fbd",
    marginBottom: 4,
  },
  rating: {
    fontSize: 13,
    color: "#2a9d8f",
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: "600",
    color: "#e76f51",
  },
});
