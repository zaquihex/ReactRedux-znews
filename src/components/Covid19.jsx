//React import
import React from "react";

//Redux imports
import { connect } from "react-redux";
import { getTranslate } from "react-localize-redux";

import { Layout } from "antd";

//actions
import { getCoronavirusInfoStart } from "store/actions/coronavirus";

//Components
import BarChart from "./graphics/BarChart";
import LineChart from "./graphics/LineChart";

// "antd" elements
import { Spin, Alert, Checkbox } from "antd";
const { Sider } = Layout;

class Covid19 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indexY: [{ name: "indexYTotalCases", color: "#1890ff" }],
    };
  }

  componentDidMount = () => {
    const { getCovidInfo, country } = this.props;
    getCovidInfo(country);
  };

  onChange = (element) => {
    const { indexY } = this.state;
    if (element.target.checked) {
      indexY.push(element.target.value);
      this.setState({ indexY: indexY });
    } else {
      this.setState({
        indexY: indexY.filter(
          (value) => value.name !== element.target.value.name
        ),
      });
    }
  };
  //render method to print covi19 graphic
  render() {
    const { coronavirusInfo, loadingCovid, error, translate } = this.props;
    const { indexY } = this.state;
    
    //calculate the maxIndex for the graphic
    let maxIndexYPos = 0;
    let maxIndexYValue = 0;
    indexY.forEach((index, pos) => {
      coronavirusInfo.forEach((data) => {
        if (data[index.name] > maxIndexYValue) {
          maxIndexYPos = pos;
          maxIndexYValue = data[index.name];
        }
      });
    });

    return (
      <Layout>
        {!error ? (
          loadingCovid ? (
            <Spin />
          ) : (
            <>
            {/* barchart graphic if there is only one data to print*/}
              {indexY.length === 1 ? (
                <BarChart
                  indexY={indexY[0].name}
                  data={coronavirusInfo}
                  width={1000}
                  height={300}
                  top={20}
                  bottom={30}
                  left={40}
                  right={0}
                />
              ) : (
                <LineChart
                  data={indexY.length === 0 ? [] : coronavirusInfo}
                  indexY={indexY.length === 0 ? [] : indexY}
                  maxIndexYValue={maxIndexYValue}
                />
              )}
              {/* checkbox list to select the data showed in the graphic */}
              <Sider>
                <Layout>
                  <Checkbox
                    style={{ paddingLeft: "8px" }}
                    value={{ name: "indexYDailyCases", color: "#EEB029" }}
                    onChange={this.onChange}
                    checked={
                      indexY
                        .map((index) => index.name)
                        .indexOf("indexYDailyCases") > -1
                    }
                  >
                    <span style={{ color: "#EEB029" }}>{translate("covid_dailyCases")}</span>
                  </Checkbox>
                  <Checkbox
                    value={{ name: "indexYDailyDeaths", color: "#900C3F" }}
                    onChange={this.onChange}
                    checked={
                      indexY
                        .map((index) => index.name)
                        .indexOf("indexYDailyDeaths") > -1
                    }
                  >
                    <span style={{ color: "red" }}>{translate("covid_dailyDeaths")}</span>
                  </Checkbox>
                  <Checkbox
                    value={{ name: "indexYTotalCases", color: "red" }}
                    onChange={this.onChange}
                    checked={
                      indexY
                        .map((index) => index.name)
                        .indexOf("indexYTotalCases") > -1
                    }
                  >
                    <span style={{ color: "#1890ff" }}>{translate("covid_totalCases")}</span>
                  </Checkbox>
                  <Checkbox
                    value={{ name: "indexYTotalRecoveries", color: "#009933" }}
                    onChange={this.onChange}
                    checked={
                      indexY
                        .map((index) => index.name)
                        .indexOf("indexYTotalRecoveries") > -1
                    }
                  >
                    <span style={{ color: "#009933" }}>{translate("covid_totalRecoveries")}</span>
                  </Checkbox>
                  <Checkbox
                    value={{ name: "indexYTotalDeaths", color: "black" }}
                    onChange={this.onChange}
                    checked={
                      indexY
                        .map((index) => index.name)
                        .indexOf("indexYTotalDeaths") > -1
                    }
                  >
                    <span style={{ color: "black" }}>{translate("covid_totalDeaths")}</span>
                  </Checkbox>
                </Layout>
              </Sider>
            </>
          )
        ) : (
          //Alert if there is one problem with the response of the covid19 API
          <Alert
            message={error.code}
            description={error.message}
            type="error"
          />
        )}
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  translate: getTranslate(state.localize),
  coronavirusInfo: state.covidReducer.coronavirusInfo,
  loadingCovid: state.covidReducer.loadingCovid,
  error: state.covidReducer.errorCovid,
  country: state.newsReducer.country,
});

const mapDispatchToProps = (dispatch) => ({
  getCovidInfo: (country) => dispatch(getCoronavirusInfoStart(country)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Covid19);
