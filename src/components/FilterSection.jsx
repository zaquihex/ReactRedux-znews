//React imports
import React from "react";

import PropTypes from "prop-types";

//Redux imports
import { connect } from "react-redux";
import { getTranslate } from "react-localize-redux";

//Icons imports
import {
  FilterOutlined,
  GlobalOutlined,
  FlagOutlined,
  DeploymentUnitOutlined,
} from "@ant-design/icons";

//antd elements
import { Radio, Menu, Spin, Empty, Tag, Tooltip } from "antd";

//style
import "./FilterSection.css";

const { SubMenu } = Menu;

class FilterSection extends React.Component {
  //update value of the filter section
  onChange = (item) => {
    const { sectionId, updateSelectedValue } = this.props;
    updateSelectedValue(sectionId, item.target.value);
  };

  //render method
  render() {
    const {
      data,
      sectionId,
      title,
      loadingSources,
      defaultValue,
      disabledSection,
      color,
      disabledES,
      translate,
    } = this.props;

    return (
      <Menu mode="inline">
        <SubMenu
          title={
            //icons depend of the filter section
            <div>
              {sectionId === "categories" && <FilterOutlined />}
              {sectionId === "countries" && <GlobalOutlined />}
              {sectionId === "languages" && <FlagOutlined />}
              {sectionId === "sources" && <DeploymentUnitOutlined />}
              <span style={{ margin: "0px 5px 0px 10px" }}>{title}</span>
              {disabledSection.value ? (
                <Tag color={color}>{disabledSection.msg}</Tag>
              ) : (
                <Tag color={color}>{defaultValue}</Tag>
              )}
            </div>
          }
        >
          {/*options list of the filter section*/}
          {!data || (data && data.length === 0) ? (
            <Empty description={translate("newsPage_emptySources")}></Empty>
          ) : loadingSources && sectionId === "sources" ? (
            <Spin />
          ) : (
            <Radio.Group value={defaultValue} size="small">
              {sectionId === "categories" ||
              sectionId === "languages" ? null : (
                <Radio.Button
                  value="All"
                  onChange={this.onChange}
                  disabled={
                    disabledSection.value || sectionId === "coronavirus"
                  }
                  style={{ margin: "5px 5px 0px 0px" }}
                >
                  All
                </Radio.Button>
              )}

              {data.map((elem, pos) => (
                <Tooltip
                  key={`filterection-data-${pos}`}
                  title={
                    disabledES &&
                    elem === "es" &&
                    translate("newsPage_filterDisabledNotTopNews")
                  }
                >
                  <Radio.Button
                    key={title + "-" + pos}
                    value={sectionId === "sources" ? elem.id : elem}
                    onChange={this.onChange}
                    disabled={
                      disabledSection.value || (disabledES && elem === "es")
                    }
                    style={{ margin: "5px 5px 0px 0px" }}
                  >
                    {sectionId === "sources" ? elem.name : elem}
                  </Radio.Button>
                </Tooltip>
              ))}
            </Radio.Group>
          )}
        </SubMenu>
      </Menu>
    );
  }
}

FilterSection.propTypes = {
  sectionId: PropTypes.string,
  title: PropTypes.string,
  data: PropTypes.array,
  updateSelectedValue: PropTypes.func,
  defaultValue: PropTypes.string,
  color: PropTypes.string,
  disabledSection: PropTypes.shape({
    value: PropTypes.bool,
    msg: PropTypes.string,
  }),
};

const mapStateToProps = (state) => ({
  translate: getTranslate(state.localize),
});

export default connect(mapStateToProps)(FilterSection);
