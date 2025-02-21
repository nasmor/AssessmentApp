import React, {useState} from 'react';
import {View, Text, Image, Button, Modal} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

const ArticleModal = ({selectedArticle, onClose}) => {
  if (!selectedArticle) return null;
  const [webView, setWebView] = useState(false);

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={!!selectedArticle}>
      {webView ? (
        <View>
          <WebView source={{uri: selectedArticle.url}} />
          <Button title="Close" onPress={() => setWebView(!webView)} />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: selectedArticle.image}}
            style={{width: 300, height: 200, marginBottom: 10}}
          />
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            {selectedArticle.title}
          </Text>
          <Text style={{marginVertical: 10}}>{selectedArticle.summary}</Text>
          <Button
            title="Read More"
            onPress={() => InAppBrowser.open(selectedArticle.url)}
          />
          <Button title="Close" onPress={onClose} />
        </View>
      )}
    </Modal>
  );
};

export default ArticleModal;
