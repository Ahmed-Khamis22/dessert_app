// Enhanced products.tsx with dynamic discount handling
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ImageBackground,
} from 'react-native';
import { Link } from 'expo-router';

const defaultImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/800px-Image_not_available.png';

const productsData = [
  {
    id: '1',
    name: 'Molten lava cake',
    description: 'A delicate chocolate cake hidden a rich, molten\u00a0heart',
    image: 'https://cdn.craft.cloud/224393fa-1975-4d80-9067-ada3cb5948ca/assets/detail_White_Cocoa_Oatmeal_Hot_Lava_Cake.png',
    price: '$12.00',
  },
  {
    id: '2',
    name: 'Strawberry Cheesecake',
    description:
      'Smooth cheesecake topped with fresh strawberries and layered with creamy filling and a hint of vanilla for the perfect balance of flavors in every bite you take.',
    image: 'https://hips.hearstapps.com/hmg-prod/images/strawberry-cheesecake-1648487650.jpg?crop=1.00xw:0.801xh;0,0.101xh&resize=980:*',
    price: '$15.00',
    tag: '30% OFF',
  },
  {
    id: '3',
    name: 'Baklava',
    description: 'Traditional Middle Eastern dessert with nuts and syrup.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRgqytQcxPCjXV4SEB0796nVfVPLTtomBjUg&s',
    price: '$8.00',
    tag: '20% OFF',
  },
  {
    id: '4',
    name: 'Macarons',
    description: 'Colorful French cookies with creamy filling.',
    image: 'https://mealsbymolly.com/wp-content/uploads/2021/08/Raspberry-Macarons-1320x1440.jpg',
    price: '$5.00',
  },
  {
    id: '5',
    name: 'Kunafa',
    description: 'Sweet, cheesy, crispy dessert loved across the Middle East.',
    image: '',
    price: '$9.00',
  },
  {
    id: '6',
    name: 'Tiramisu',
    description: 'Italian coffee-flavored dessert with mascarpone cheese.',
    image: 'https://www.bakinglikeachef.com/wp-content/uploads/italian-tiramisu.jpg',
    price: '$11.00',
    tag: 'NEW',
  },
];

export default function ProductsScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleDescription = (desc: string): string => {
    return desc.length > 70 ? `${desc.substring(0, 70)}...` : desc;
  };

  const filteredProducts = productsData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1600&q=80' }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Our Sweet Treats</Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Search for a dessert"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <FlatList
          data={filteredProducts}
          numColumns={2}
          renderItem={({ item }) => {
            const priceNumber = parseFloat(item.price.replace('$', ''));
            const discountMatch = item.tag?.match(/(\d+)%\s*OFF/i);
            const discountPercent = discountMatch ? parseFloat(discountMatch[1]) : 0;
            const originalPrice = discountPercent ? (priceNumber / (1 - discountPercent / 100)).toFixed(2) : null;

            return (
              <Link
                href={{
                  pathname: '../singleProduct',
                  params: {
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    price: item.price,
                    image: item.image || defaultImage,
                    tag: item.tag,
                  },
                }}
                asChild
              >
                <TouchableOpacity style={styles.productContainer}>
                  {item.tag && (
                    <View style={styles.tagContainer}>
                      <Text style={styles.tagText}>{item.tag}</Text>
                    </View>
                  )}
                  <Image
                    source={{ uri: item.image || defaultImage }}
                    style={styles.productImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productRating}>★★★★★</Text>
                  <Text style={styles.productDescription}>{handleDescription(item.description)}</Text>
                  <View style={styles.priceContainer}>
                    {originalPrice && (
                      <Text style={styles.oldPrice}>${originalPrice}</Text>
                    )}
                    <Text style={styles.productPrice}>{item.price}</Text>
                  </View>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>Add to Order</Text>
                  </View>
                </TouchableOpacity>
              </Link>
            );
          }}
          keyExtractor={item => item.id}
        />

        <View style={styles.backButton}>
          <Link href="/(tabs)" style={styles.backButtonText}>
            Go Back to Home
          </Link>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  title: {
    color: '#6d4c41',
    fontSize: 50,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'GreatVibes',
    fontWeight: 'normal',
  },
  searchInput: {
    height: 44,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingLeft: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0c3b2',
    color: '#333',
    alignSelf: 'center',
  },
  productContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    width: '45%',
    marginHorizontal: '2.5%',
    position: 'relative',
    minHeight: 300,
    justifyContent: 'space-between',
  },
  tagContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#ff4081',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  productImage: {
    width: 130,
    height: 130,
    borderRadius: 30,
    marginBottom: 10,
  },
  productName: {
    color: '#d81b60',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  productRating: {
    color: '#FFD700',
    fontSize: 14,
    marginBottom: 6,
    textAlign: 'center',
  },
  productDescription: {
    color: '#5d4037',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    color: '#aaa',
    fontSize: 14,
    marginRight: 5,
    fontWeight: 'bold',
  },
  productPrice: {
    color: '#6d4c41',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#f48fb1',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    marginTop: 'auto',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButton: {
    marginTop: 15,
    backgroundColor: '#6d4c41',
    padding: 12,
    borderRadius: 30,
    alignSelf: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});