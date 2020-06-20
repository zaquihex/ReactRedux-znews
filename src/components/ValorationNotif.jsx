import React, { Component } from "react";
import { connect } from "react-redux";

import { setValorationApp } from "store/actions/common";

import { notification, Rate, Input, Button } from "antd";
import { HeartOutlined, SendOutlined } from "@ant-design/icons";

import { getTranslate } from "react-localize-redux";

import "./ValorationNotif.css";

const { TextArea } = Input;

class ValorationNotif extends Component {
  constructor(props) {
    super(props);
    this.valoration = props.valoration;
    this.valorationText = "";
  }

  componentDidMount = () => {
    const { translate, closeNotif } = this.props;
    const key = `open${Date.now()}`;
    notification.open({
      duration: 0,
      message: translate("valoration_title"),
      description: translate("valoration_message"),
      key: key,
      btn: (
        <>
          <Rate
            character={<HeartOutlined />}
            allowHalf
            defaultValue={this.valoration}
            onChange={(valoration) => {
              this.valoration = valoration;
            }}
          />
          <TextArea
            autoSize
            placeholder={translate("valoration_placeholder")}
            onChange={(textArea) => {
              this.valorationText = textArea.target.value;
            }}
          />
          <Button
            type="primary"
            shape="round"
            icon={<SendOutlined />}
            size="small"
            style={{ marginTop: "5px", float: "right" }}
            onClick={() => {
              this.sendEmail();
              notification.close(key);
            }}
          >
            Enviar
          </Button>
        </>
      ),
      onClose: () => {
        closeNotif();
      },
    });
  };

  sendEmail = () => {
    const { setValoration, translate } = this.props;

    if (this.valoration || this.valorationText.length > 0) {
      window.emailjs
        .send("zaq", "template_nKeRwDu1", {
          duration: 0,
          message_html:
            "valoration: " +
            this.valoration +
            ". \n opinion: " +
            this.valorationText,
          from_name: "user_qdHju52xya3TWsUOYA061",
          reply_to: "zaquihex@gmail.com",
        })
        .then((res) => {
          notification["success"]({
            duration: 2,
            message: translate("valoration_send_success"),
          });
        })
        // Handle errors here however you like, or use a React error boundary
        .catch((err) => {
          notification["error"]({
            duration: 2,
            message: translate("valoration_send_failure"),
          });
        });
      setValoration(this.valoration);
    }
  };

  render() {
    return null;
  }
}

const mapDispatchToProps = (dispatch) => ({
  setValoration: (valoration) => dispatch(setValorationApp(valoration)),
});

const mapStateToProps = (state) => ({
  translate: getTranslate(state.localize),
  valoration: state.commonReducer.valoration,
});

export default connect(mapStateToProps, mapDispatchToProps)(ValorationNotif);
