import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
  Button,
} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

const StackableCard = ({article, onExpand, isExpanded}) => {
  const animation = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isExpanded ? height / 3 : 85,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isExpanded]);

  return (
    <View>
      <TouchableOpacity onPress={onExpand} activeOpacity={1}>
        <Animated.View
          style={[
            styles.card,
            {backgroundColor: article.color, height: animation},
          ]}>
          <Text style={styles.title}>{article.title}</Text>
        </Animated.View>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.fullContent}>
          <LinearGradient colors={['#ffffff', article.color, '#ffffff']}>
            <Image
              source={{
                uri: article.image,
              }}
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={styles.summary}>{article.summary}</Text>
          </LinearGradient>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              height: 20,
              width: 20,
              alignContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: 10,
            }}
            onPress={onExpand}>
            <Text>X</Text>
          </TouchableOpacity>

          <Button
            title="Read More"
            onPress={() => InAppBrowser.open(article.url)}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  gradient: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 10,
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  fullContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height / 2,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  image: {
    width: width,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  summary: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  closeButton: {
    backgroundColor: '#2575fc',
    padding: 10,
    borderRadius: 10,
  },
  closeText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default StackableCard;
