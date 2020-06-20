//React imports
import React from "react";

//Redux imports
import { connect } from "react-redux";
import { getTranslate, setActiveLanguage } from "react-localize-redux";

//Antd components
import { PageHeader, Button, Select, Tooltip } from "antd";
import { GithubOutlined } from "@ant-design/icons";

//Components
import Clock from "react-live-clock";
import ValorationNotif from "components/ValorationNotif";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//icons
import { HeartTwoTone } from "@ant-design/icons";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faKiwiBird } from '@fortawesome/free-solid-svg-icons'

//style
import "./Header.css";

const { Option } = Select;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valorationShow: false,
    };
  }

  componentWillMount() {
    library.add(fab,faKiwiBird);
  }  

  render() {
    const { translate, setLanguage, languageApp } = this.props;
    const { valorationShow } = this.state;

    //timezone to show the right hour
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return (
      <>
        {valorationShow ? (
          <ValorationNotif
            closeNotif={() => {
              this.setState({ valorationShow: false });
            }}
          />
        ) : null}
        <PageHeader
          //<i className="fa fa-exclamation-triangle" />
          style={{ backgroundColor: "transparent", color: "rgba(0, 0, 0, 0.45)" }}
          className="site-page-header"
          title={
            <>
              <FontAwesomeIcon icon={faKiwiBird} style={{marginRight: '5px'}}/>
              ZNEWS
            </>
          }
          subTitle={translate("header_title")}
          //github button
          tags={
            <Button
              type="dashed"
              shape="circle"
              icon={<GithubOutlined />}
              onClick={() => window.open("https://github.com/zaquihex/ReactRedux-znews")}
              style={{ marginTop: "12px" }}
            />
          }
          extra={[
            <Tooltip title="valoration" key="extraBtn-valorationTooltip">
              <Button
                type="dashed"
                shape="circle"
                icon={<HeartTwoTone twoToneColor="#eb2f96" />}
                onClick={() => {
                  this.setState({ valorationShow: true });
                }}
                style={{ marginTop: "5px" }}
              />
            </Tooltip>,
            <Select
              defaultValue={languageApp}
              style={{
                width: 100,
                color: "white",
                borderRight: "1px solid",
                marginTop: "5px",
              }}
              bordered={false}
              onChange={(newLanguage) => {
                setLanguage(newLanguage);
              }}
              key="extraBtn-language"
            >
              <Option key="en" value="en">
                English
              </Option>
              <Option key="es" value="es">
                Spanish
              </Option>
            </Select>,
            <div style={{ marginTop: "10px" }} key="extraBtn-clock">
              <Clock
                format={"dddd, MMMM Mo, YYYY, h:mm:ss A"}
                timezone={timezone}
              />
            </div>,
          ]}
        />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setLanguage: (newLanguage) => dispatch(setActiveLanguage(newLanguage)),
});

const mapStateToProps = (state) => ({
  languageApp: state.commonReducer.languageApp,
  translate: getTranslate(state.localize),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
