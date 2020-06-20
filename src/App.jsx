//React import
import React, { Component } from "react";

//Redux import
import { connect } from "react-redux";
import { getTranslate } from "react-localize-redux";

//Containers and Components
import NewsPage from "./containers/NewsPage";
import HeaderContainer from "./containers/Header";


//stye
import "./App.css";


//"antd" elements
import { Layout, Typography } from "antd";

const { Text } = Typography;
const { Header, Footer, Content } = Layout;

class App extends Component {

  //Render basic App layouts
  render() {
    const { translate } = this.props;
    
    return (
      <Layout>
        <Header>
          <HeaderContainer />
        </Header>
        <Content className="site-layout-content">
          <NewsPage />
        </Content>
        <Footer>
          <Text code style={{ float: "left" }}>
            {translate("footer_developer") + "Zaquiel Rodriguez Arce"}
          </Text>
          <a href="https://newsapi.org" style={{ float: "right" }}>
            {translate("footer_powered") + "News API"}
          </a>
        </Footer>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  translate: getTranslate(state.localize)
});

export default connect(mapStateToProps)(App);
