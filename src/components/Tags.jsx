import React from "react";
import { connect } from "react-redux";
import { Select } from "antd";

import { getTranslate } from "react-localize-redux";

import { setTagsArticles } from "store/actions/news";

class Tags extends React.Component {
  handleInputConfirm = (newListTags) => {
    const { setNewTags } = this.props;

    setNewTags(newListTags);
  };

  render() {
    const { tagsArticles, translate } = this.props;
    return (
      <Select
        mode="tags"
        style={{ width: "100%", marginBottom: "15px", display: "block" }}
        onChange={this.handleInputConfirm}
        tokenSeparators={[","]}
        defaultValue={tagsArticles}
        placeholder={translate("tags_searchTags")}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  translate: getTranslate(state.localize),
  tagsArticles: state.newsReducer.tagsArticles,
});

const mapDispatchToProps = (dispatch) => ({
  setNewTags: (newTagsArticle) => dispatch(setTagsArticles(newTagsArticle)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
