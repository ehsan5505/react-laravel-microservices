import axios from "axios";
import React, { useEffect, useState } from "react";
import Wrapper from "./Wrapper";

interface rank {
  user: string;
  revenue: number;
}

const Rankings = () => {
  const [rankings, setRankings] = useState([]);
  useEffect(() => {
    (async () => {
        const response = await axios.get("rankings");
        console.info(response.data);
        setRankings(response.data);
      }
    )();
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
                {rankings.map(
                  (r: { user: string; revenue: number }, index: number) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{r.user}</td>
                        <td>{r.revenue}</td>
                      </tr>
                    );
                  }
                )}
                {/* {rankings.map((r: rank, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{r.user}</td>
                      <td>{r.revenue}</td>
                    </tr>
                  );
                })} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Rankings;
