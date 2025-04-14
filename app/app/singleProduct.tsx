// Refined singleProduct.tsx with dynamic discount pricing
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const defaultImage = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80';

export default function SingleProductScreen() {
  const router = useRouter();
  const { name, image, description, price, tag } = useLocalSearchParams<{
    name: string;
    image?: string | string[];
    description: string;
    price: string;
    tag?: string;
  }>();

  const actualImage =
    typeof image === 'string'
      ? image
      : Array.isArray(image) && typeof image[0] === 'string'
      ? image[0]
      : '';

  const displayImage = actualImage.startsWith('https://') ? actualImage : defaultImage;

  const displayDescription = typeof description === 'string' && description.length > 200
    ? description.slice(0, 200) + '...'
    : description;

  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const numericPrice = parseFloat(price.replace('$', ''));
  const discountMatch = tag?.match(/(\d+)%\s*OFF/i);
  const discountPercent = discountMatch ? parseFloat(discountMatch[1]) : 0;
  const originalPrice = discountPercent ? (numericPrice / (1 - discountPercent / 100)).toFixed(2) : null;

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1600&q=80' }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.pageTitleWrapper}>
          <Text style={styles.pageTitle}>Product Details</Text>
        </View>
        <View style={styles.card}>
        {tag && (
          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        )}
          <Image
            source={{ uri: displayImage }}
            style={styles.image}
            resizeMode="cover"
          />

          <View style={styles.textBlock}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.rating}>★★★★★</Text>
            <View style={styles.priceWrapper}>
              {originalPrice && (
                <Text style={styles.oldPrice}>${originalPrice}</Text>
              )}
              <Text style={styles.price}>${numericPrice}</Text>
            </View>
            <Text style={styles.description}>{displayDescription}</Text>
          </View>

          <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.quantityButton} onPress={handleDecrease}>
              <Text style={styles.quantityText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityValue}>{quantity}</Text>
            <TouchableOpacity style={styles.quantityButton} onPress={handleIncrease}>
              <Text style={styles.quantityText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Add {quantity} to Order</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>Back to Products</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    paddingTop: 40,
  },
  pageTitleWrapper: {
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  pageTitle: {
    fontSize: 28,
    fontFamily: 'GreatVibes',
    color: '#3e2723',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    maxWidth: 360,
    alignSelf: 'center',
    marginTop: 10,
  },
  tagContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#ff4081',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    zIndex: 2,
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },  
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1.5,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginBottom: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  textBlock: {
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    color: '#d81b60',
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  rating: {
    fontSize: 25,
    color: '#FFD700',
    marginBottom: 4,
    textAlign: 'center',
  },
  priceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    color: '#aaa',
    fontSize: 16,
    marginRight: 6,
  },
  price: {
    fontSize: 18,
    color: '#6d4c41',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#5d4037',
    textAlign: 'center',
    fontStyle: 'italic',
    paddingHorizontal: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f48fb1',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  quantityText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityValue: {
    fontSize: 16,
    color: '#6d4c41',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#f48fb1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  backButton: {
    backgroundColor: '#6d4c41',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
  },
  backText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
