import axios from "axios";
import React, { useEffect, useState } from "react";
import Wrapper from "./Wrapper";

interface rank {
  user: string;
  revenue: number;
}

const Rankings = () => {
  const [ranking, setRanking] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await axios.get("rankings");
      setRanking(response.data);
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
                  <th>Revebue</th>
                </tr>
              </thead>
              <tbody>
                {ranking.map((r: rank, index) => {
                  return (
                    <tr key={index}>
                      <td>{index}</td>
                      <td>{r.user}</td>
                      <td>{r.revenue}</td>
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
