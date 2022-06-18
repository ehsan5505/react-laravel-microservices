import React, { Component } from "react";
import Wrapper from "../Wrapper";
import c3 from "c3";
import axios from "axios";
class Dashboard extends Component {
  componentDidMount = async () => {
    let chart = c3.generate({
      bindto: "#chart",
      data: {
        x: "x",
        columns: [["x"], ["Sales"]],
        // types: {
        //   Sales: "line",
        // },
        type: "bar",
        labels: true,
        colors: {
          Sales: "orange",
        },
      },

      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: "%Y-%m-%d",
          },
        },
      },
    });

    const resp = await axios.get("chart");
    const records: { date: string; total_sales: number }[] = resp.data;
    chart.load({
      columns: [
        ["x", ...records.map((r) => r.date)],
        ["Sales", ...records.map((r) => r.total_sales)],
      ],
    });
    console.info(records);
  };
  render() {
    return (
      <Wrapper>
        <h2>Daily Sales Performance</h2>

        <div id="chart" />
      </Wrapper>
    );
  }
}

export default Dashboard;
