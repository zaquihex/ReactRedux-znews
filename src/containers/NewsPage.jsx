//React imports
import React, { Component } from "react";

//Redux imports
import { connect } from "react-redux";
import { getTranslate, withLocalize } from "react-localize-redux";

//import news actions
import {
  getNews,
  getSources,
  setCountry,
  setLanguage,
  setCategory,
  setSource,
  setTabnews,
} from "store/actions/news";

//import coronavirus actions
import { getCoronavirusInfoStart } from "store/actions/coronavirus";

//constants
import { languages, countries, categories } from "constants/api";

//Components
import FilterSection from "components/FilterSection";
import Tabs from "components/Tabs";

//style
import "./NewsPage.css";

//antd Elements
//Icons imports
import { ClearOutlined } from "@ant-design/icons";
import { Layout, Menu, Tag, Typography, Button, Tooltip } from "antd";
const { SubMenu } = Menu;
const { Text } = Typography;

class NewsPage extends Component {
  //get "sources" and "news" with the initial values or values saved by the user
  componentDidMount() {
    const {
      language,
      country,
      category,
      source,
      tabNews,
      tagsArticles,
    } = this.props;
    this.getSources(language, country, category);
    this.getNews(language, country, category, source, tabNews, tagsArticles);
  }

  //get sources - call to redux action
  getSources = (language, country, category) => {
    const { getSourcesStart } = this.props;
    getSourcesStart(language, country, category);
  };

  //get news - call to redux action
  getNews = (language, country, category, source, tabNews, tagsArticles) => {
    const { getNewsStart } = this.props;
    getNewsStart(language, country, category, source, tabNews, tagsArticles);
  };

  //get "sources" and "news" with the new selected param by the user
  componentDidUpdate = (prevProps) => {
    const {
      language,
      country,
      category,
      source,
      tabNews,
      loadingNews,
      tagsArticles,
    } = this.props;

    //get new data if some param has changed
    if (
      language !== prevProps.language ||
      country !== prevProps.country ||
      category !== prevProps.category ||
      source !== prevProps.source ||
      tabNews !== prevProps.tabNews ||
      tagsArticles.length !== prevProps.tagsArticles.length
    ) {
      //Update news or sources if user has updated one of the filters or tabs
      if (
        source !== prevProps.source ||
        tagsArticles.length !== prevProps.tagsArticles.length ||
        tabNews !== prevProps.tabNews
      ) {
        if (loadingNews === prevProps.loadingNews) {
          this.getNews(
            language,
            country,
            category,
            source,
            tabNews,
            tagsArticles
          );
        }
      } else {
        //Has changed some param which affects to the sources list, so "sources" and "news" need to be updated
        this.getSources(language, country, category);
        this.getNews(
          language,
          country,
          category,
          source,
          tabNews,
          tagsArticles
        );
      }
    }
  };

  //update redux param (this method call to redux actions)
  updateNewsParams = (section, newValue) => {
    const {
      setNewCountry,
      setNewLanguage,
      setNewCategory,
      setNewSource,
      setNewTab,
      country,
      getCovidInfo,
    } = this.props;
    switch (section) {
      case "languages":
        setNewLanguage(newValue);
        break;
      case "countries":
        setNewCountry(newValue);
        getCovidInfo(newValue);
        break;
      case "categories":
        setNewCategory(newValue);
        break;
      case "sources":
        setNewSource(newValue);
        break;
      case "tabNews":
        if (newValue === "topNews" && country === "es") {
          setNewCountry("All");
        }
        if (newValue === "coronavirus" && country === "All") {
          setNewCountry("us");
        }
        setNewTab(newValue);
        break;
      default:
        break;
    }
  };

  //This method disable filter sections after check some conditions
  disableFilterSection = (section) => {
    const { country, category, tabNews, translate } = this.props;
    let disabledSection = { value: false, msg: null };
    switch (section) {
      case "languages":
        if (tabNews === "coronavirus") {
          disabledSection.value = true;
          disabledSection.msg = translate("newsPage_filterDisabledByCovid");
        } else if (country !== "All" || category !== "All") {
          disabledSection.value = true;
          disabledSection.msg = translate("newsPage_LanguageNotPriorized");
        }
        break;
      case "countries":
        if (tabNews === "articles") {
          disabledSection.value = true;
          disabledSection.msg = translate("newsPage_filterDisabledNotTopNews");
        }
        break;
      case "categories":
        if (tabNews !== "topNews") {
          disabledSection.value = true;
          disabledSection.msg = translate("newsPage_filterDisabledNotTopNews");
        }
        break;
      case "sources":
        if (tabNews === "coronavirus") {
          disabledSection.value = true;
          disabledSection.msg = translate("newsPage_filterDisabledByCovid");
        }
        break;
      default:
        break;
    }
    return disabledSection;
  };

  //render method
  render() {
    const {
      language,
      country,
      category,
      source,
      sources,
      loadingSources,
      tabNews,
      translate,
    } = this.props;

    return (
      <Layout>
        <Layout>
          <Menu mode="inline" defaultOpenKeys={["subMenu-filters"]}>
            {/* Filter title with tags */}
            <SubMenu
              key="subMenu-filters"
              title={
                <>
                  <Tooltip title={translate("newsPage_resetFilters")}>
                    <Button shape="circle" icon={<ClearOutlined />} style={{marginRight: '5px', border: 'thin'}}/>
                  </Tooltip>
                  <Text strong>
                    {translate("newsPage_filters")}
                  </Text>
                  <Tag color="magenta" style={{ cursor: "pointer" }}>
                    {translate("newsPage_language") + ": " + language}
                  </Tag>
                  <Tag
                    color="cyan"
                    closable={country !== "All"}
                    onClose={(e) => {
                      this.updateNewsParams("countries", "All");
                    }}
                  >
                    {translate("newsPage_country") + ": " + country}
                  </Tag>
                  <Tag
                    color="purple"
                    closable={category !== "All"}
                    onClose={(e) => {
                      this.updateNewsParams("categories", "All");
                    }}
                  >
                    {translate("newsPage_category") + ": " + category}
                  </Tag>
                  <Tag
                    color="gold"
                    closable={source !== "All"}
                    onClose={(e) => {
                      this.updateNewsParams("sources", "All");
                    }}
                  >
                    {translate("newsPage_source") + ": " + source}
                  </Tag>
                </>
              }
            >
              {/*filter sections */}
              <FilterSection
                sectionId="languages"
                title={translate("newsPage_languages")}
                data={languages}
                updateSelectedValue={this.updateNewsParams}
                defaultValue={language}
                color="magenta"
                disabledSection={this.disableFilterSection("languages")}
              />
              <FilterSection
                sectionId="countries"
                title={translate("newsPage_countries")}
                data={countries}
                updateSelectedValue={this.updateNewsParams}
                defaultValue={country}
                color="cyan"
                disabledES={tabNews === "topNews" || tabNews === "articles"}
                disabledSection={this.disableFilterSection("countries")}
              />
              <FilterSection
                sectionId="categories"
                title={translate("newsPage_categories")}
                data={categories}
                updateSelectedValue={this.updateNewsParams}
                defaultValue={category}
                color="purple"
                disabledSection={this.disableFilterSection("categories")}
              />
              <FilterSection
                sectionId="sources"
                title={translate("newsPage_sources")}
                data={sources}
                defaultValue={source}
                updateSelectedValue={this.updateNewsParams}
                loadingSources={loadingSources}
                color="gold"
                disabledSection={this.disableFilterSection("sources")}
              />
            </SubMenu>
          </Menu>
        </Layout>
        <Tabs
          defaultValue={tabNews}
          updateSelectedValue={this.updateNewsParams}
        />
      </Layout>
    );
  }
}

//redux props
const mapStateToProps = (state) => ({
  translate: getTranslate(state.localize),
  language: state.newsReducer.language,
  country: state.newsReducer.country,
  category: state.newsReducer.category,
  source: state.newsReducer.source,
  sources: state.newsReducer.sources,
  loadingSources: state.newsReducer.loadingSources,
  tabNews: state.newsReducer.tabNews,
  tagsArticles: state.newsReducer.tagsArticles,


  loadingNews: state.newsReducer.loadingNews,
  news: state.newsReducer.news,
  errorTopNews: state.newsReducer.errorTopNews
});

//redux functions
const mapDispatchToProps = (dispatch) => ({
  getSourcesStart: (language, country, category) =>
    dispatch(getSources(language, country, category)),
  getNewsStart: (language, country, category, source, tabNews, tagsArticles) =>
    dispatch(
      getNews(language, country, category, source, tabNews, tagsArticles)
    ),
  setNewCountry: (newCountry) => dispatch(setCountry(newCountry)),
  setNewLanguage: (newLanguage) => dispatch(setLanguage(newLanguage)),
  setNewCategory: (newCategory) => dispatch(setCategory(newCategory)),
  setNewSource: (newSource) => dispatch(setSource(newSource)),
  setNewTab: (newTab) => dispatch(setTabnews(newTab)),
  getCovidInfo: (country) => dispatch(getCoronavirusInfoStart(country)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withLocalize(NewsPage));
