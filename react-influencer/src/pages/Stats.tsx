import axios from "axios";
import { useEffect, useState } from "react";
import Wrapper from "./Wrapper";
import constant from "../config_const";

interface StatsProps {
  code: string;
  count: number;
  revenue: number;
}
const Stats = () => {
  const [stats, setStats] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await axios.get(`${constant.BASE_URL}/stats`);
      console.info(response);
      setStats(response.data);
    })();
  }, []);
  return (
    <Wrapper>
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="table-responsive">
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Code</th>
                  <th>Order Count</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {stats.map(
                  (
                    s: StatsProps,
                    index
                  ) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{constant.CHECKOUT_URL + s.code}</td>
                        <td>{s.count}</td>
                        <td>{s.revenue}</td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Stats;
