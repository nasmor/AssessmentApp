import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import ArticleModal from './components/ArticleModal';
import ArticleHeader from './components/ArticleHeader';
import StackableCard from './components/StackableCard';
import {articles as listOfArticles} from './models/ArticleModel';

const ArticleScreen = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [headerColor, setHeaderColor] = useState('#000');
  const [articleList, setArticleList] = useState(listOfArticles);
  const [expandedArticle, setExpandedArticle] = useState(null);
  const [activeToggle, setActiveToggle] = useState(null);

  const onSelectArticle = item => {
    setSelectedArticle(item);
    setHeaderColor(item.color);
  };

  const handleExpand = article => {
    setExpandedArticle(prev => (prev?.id === article.id ? null : article));
  };

  return (
    <View>
      <ArticleHeader
        color={headerColor}
        activeToggle={activeToggle}
        setActiveToggle={setActiveToggle}
      />
      <FlatList
        data={articleList}
        renderItem={({item}) => (
          <StackableCard
            article={item}
            // onSelect={setSelectedArticle}
            onExpand={() =>
              activeToggle === 'modal'
                ? onSelectArticle(item)
                : handleExpand(item)
            }
            isExpanded={expandedArticle?.id === item.id}
          />
        )}
        keyExtractor={item => item.id}
      />
      <ArticleModal
        selectedArticle={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </View>
  );
};

export default ArticleScreen;
