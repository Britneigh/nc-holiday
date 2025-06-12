import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
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
  price?: { amount: number; currency: string } | string;
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
  const [expanded, setExpanded] = useState(false);

  const handleLinkPress = () => {
    if (activity.bookingLink) {
      Linking.openURL(activity.bookingLink).catch(() =>
        alert("Failed to open link.")
      );
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.label}>{activity.name || "Unnamed Activity"}</Text>
      </View>

      <View style={styles.cardData}>
        {activity.description && (
          <TouchableOpacity onPress={() => setExpanded(!expanded)}>
            <Text
              style={styles.cardText}
              numberOfLines={expanded ? undefined : 2}
            >
              {activity.description.replace(/<[^>]*>/g, "")}
            </Text>
            <Text style={styles.expandToggle}>
              {expanded ? "Show less ▲" : "Read more ▼"}
            </Text>

            {expanded && activity.bookingLink && (
              <Text style={styles.linkText} onPress={handleLinkPress}>
                {activity.bookingLink}
              </Text>
            )}
          </TouchableOpacity>
        )}

        {activity.category && (
          <Text style={styles.cardText}>Category: {activity.category}</Text>
        )}

        {activity.startTimes?.length > 0 && (
          <Text style={styles.cardText}>
            Start Times: {activity.startTimes.join(", ")}
          </Text>
        )}

        {typeof activity.rating === "number" && (
          <Text style={styles.cardText}>⭐ {activity.rating.toFixed(1)} / 5</Text>
        )}

        {activity.price && (
          <Text style={styles.price}>
            {typeof activity.price === "object"
              ? `Total: ${activity.price.amount} ${activity.price.currency}`
              : `Price: ${activity.price}`}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 0,
    marginTop: 10,
    marginBottom: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardHeader: {
    backgroundColor: "#269fc12e",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    margin: 8,
    color: "#2891D9",
  },
  cardData: {
    padding: 16,
  },
  cardText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  expandToggle: {
    fontSize: 12,
    color: "#0077cc",
    marginTop: 4,
  },
  linkText: {
    fontSize: 13,
    color: "#1d4ed8",
    textDecorationLine: "underline",
    marginTop: 10,
    marginBottom: 6,
  },
  price: {
    fontSize: 16,
    color: "#2891D9",
    fontWeight: "bold",
    marginTop: 10,
  },
});
