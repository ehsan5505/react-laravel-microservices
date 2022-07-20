import axios from "axios";
import React, { useEffect, useState } from "react";
import { setConstantValue } from "typescript";
import constant from "../config_const";
import Wrapper from "./Wrapper";

interface rank {
  user: string;
  revenue: number;
}

const Rankings = () => {
  const [rankings, setRankings] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await axios.get(`${constant.BASE_URL}/rankings`);
      // setRankings(Object.entries(response.data));
      setRankings(response.data);

      // console.info(rankings);
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
                  <th>Name</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(rankings).map(([user, revenue], index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user}</td>
                      <td>{parseInt(revenue)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Rankings;
