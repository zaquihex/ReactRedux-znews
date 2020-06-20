//basic import
import React from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";

//Redux import
import { getTranslate } from "react-localize-redux";

//mockup
import fakeCards from "mockups/fakeCardsNews.json";

//style
import "./Tabs.css";

//Components
import CardNew from "./CardNew";
import Tags from "./Tags";
import Covid19 from "./Covid19";

// "antd" elements
import { Tabs, Empty, Badge, Alert, BackTop } from "antd";
const { TabPane } = Tabs;

class Cards extends React.Component {
  tabChanged = (newTab) => {
    const { defaultValue, updateSelectedValue } = this.props;
    if (defaultValue !== newTab) {
      updateSelectedValue("tabNews", newTab);
    }
  };

  //render spin / empty view / news cards
  tabWithNews = (loadingNews, listNews) => {
    const { translate, tagsArticles } = this.props;

    return loadingNews || !listNews || !listNews.articles ? (
      fakeCards.articles.map((card, pos) => (
        <CardNew key={pos} card={card} loading={loadingNews} />
      ))
    ) : listNews.articles.length === 0 ? (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          tagsArticles.length === 0
            ? translate("newsPage_emptyTags")
            : translate("newsPage_emptyNews")
        }
      />
    ) : (
      <>
        <BackTop />
          {listNews.articles.map((card, pos) => (
            <CardNew
              key={`cardNew-list-${pos}`}
              card={card}
              loading={loadingNews}
            />
          ))}
      </>
    );
  };

  render() {
    const {
      defaultValue,
      loadingNews,
      news,
      error,
      errorTopNews,
      errorArticles,
      translate,
    } = this.props;

    return (
      <Tabs defaultActiveKey={defaultValue} onTabClick={this.tabChanged}>
        <TabPane
          tab={
            defaultValue === "topNews" ? (
              <Badge
                count={news && news.articles ? news.articles.length : 0}
                offset={[15, -5]}
                overflowCount={100}
              >
                {translate("tabs_topNews")}
              </Badge>
            ) : (
              translate("tabs_topNews")
            )
          }
          key="topNews"
        >
          {!errorTopNews ? (
            this.tabWithNews(loadingNews, news)
          ) : (
            <Alert
              message={errorTopNews.code}
              description={
                errorTopNews.response
                  ? errorTopNews.response.data.message
                  : errorTopNews.message
              }
              type="error"
            />
          )}
        </TabPane>
        <TabPane
          tab={
            defaultValue === "articles" ? (
              <Badge
                count={news && news.articles ? news.articles.length : 0}
                offset={[15, -5]}
                overflowCount={100}
              >
                {translate("tabs_articles")}
              </Badge>
            ) : (
              translate("tabs_articles")
            )
          }
          key="articles"
        >
          {!errorArticles ? (
            <>
              {loadingNews ? null : <Tags />}
              {this.tabWithNews(loadingNews, news)}
            </>
          ) : (
            <Alert
              message={errorArticles.code}
              description={
                errorArticles.response
                  ? errorArticles.response.data.message
                  : errorArticles.message
              }
              type="error"
            />
          )}
        </TabPane>
        <TabPane tab={translate("tabs_covid")} key="coronavirus">
          {!error ? (
            <Covid19 />
          ) : (
            <Alert
              message={error.code}
              description={error.message}
              type="error"
            />
          )}
        </TabPane>
      </Tabs>
    );
  }
}

Cards.propTypes = {
  defaultValue: PropTypes.string,
  updateSelectedValue: PropTypes.func,
};

const mapStateToProps = (state) => ({
  translate: getTranslate(state.localize),
  tagsArticles: state.newsReducer.tagsArticles,
  loadingNews: state.newsReducer.loadingNews,
  sources: state.newsReducer.sources,
  news: state.newsReducer.news,
  error: state.newsReducer.error,
  errorTopNews: state.newsReducer.errorTopNews,
  errorArticles: state.newsReducer.errorArticles,
});

export default connect(mapStateToProps)(Cards);
