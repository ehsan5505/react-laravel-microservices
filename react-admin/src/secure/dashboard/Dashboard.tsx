import React, { Component } from "react";
import Wrapper from "../Wrapper";
import c3 from "c3";
import axios from "axios";
class Dashboard extends Component {
  componentDidMount = async () => {
    let chart = c3.generate({
      bindto: "#chart",
      data: {
        x: 'x',
        columns: [
          ['x','2021-01-01','2022-01-01'],
          ['Sales','20','30'],
        ],
        types: {
          Sales: 'bar'
        }
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%Y-%m-%d'
          }
        }
      }
    });

    const resp = await axios.get('chart');
    console.info(resp);
  };
  render() {
    return (
      <Wrapper>
        <h2>Dashboard</h2>

        <div id="chart" />
      </Wrapper>
    );
  }
}

export default Dashboard;
