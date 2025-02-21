import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Animated,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} = Dimensions.get('window');

const baseOptions = {
  width: WINDOW_WIDTH,
  height: Math.floor(WINDOW_HEIGHT * 0.725),
  gap: 16,
  itemHeight: Math.floor(WINDOW_HEIGHT * 0.725) + 16,
};

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const CarouselCard = ({articles, setActiveToggle}) => {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const handleExit = () => setActiveToggle(null);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
        <Text style={styles.exitText}>EXIT</Text>
      </TouchableOpacity>
      <AnimatedScrollView
        showsVerticalScrollIndicator={false}
        snapToInterval={baseOptions.itemHeight}
        snapToAlignment="start"
        decelerationRate="fast"
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}>
        {articles.map((article, index) => {
          const inputRange = [
            (index - 1) * baseOptions.itemHeight,
            index * baseOptions.itemHeight,
            (index + 1) * baseOptions.itemHeight,
          ];

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [0.9, 1, 0.9],
            extrapolate: 'clamp',
          });

          const translateY = scrollY.interpolate({
            inputRange,
            outputRange: [
              baseOptions.itemHeight * 0.2,
              0,
              -baseOptions.itemHeight * 0.2,
            ],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={article.id}
              style={[styles.card, {transform: [{scale}, {translateY}]}]}>
              <View style={styles.box}>
                <Image
                  source={{uri: article.image}}
                  style={styles.image}
                  resizeMode="cover"
                />
                <View style={styles.articleContainer}>
                  <Text style={styles.title}>{article.title}</Text>
                  <Text style={styles.summary}>{article.summary}</Text>
                  <Text style={styles.url}>{article.url}</Text>
                </View>
              </View>
            </Animated.View>
          );
        })}
      </AnimatedScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 88,
    backgroundColor: '#1B4242',
  },
  exitButton: {
    position: 'absolute',
    top: 30,
    right: 20,
    padding: 10,
  },
  exitText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    width: baseOptions.width - 32,
    height: baseOptions.height,
    marginBottom: baseOptions.gap,
  },
  box: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  articleContainer: {
    padding: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  summary: {
    marginTop: 8,
    fontSize: 14,
    color: '#444',
  },
  url: {
    marginTop: 10,
    fontSize: 14,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  image: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default CarouselCard;
