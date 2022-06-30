import axios from "axios";
import React, { useEffect, useState } from "react";
import { ProductProps } from "../classes/product";
import Header from "../components/Header";
import Wrapper from "./Wrapper";

const Main = () => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    (async () => {
      const response = await axios.get(`products?s=${searchText}`);
      setProducts(response.data.data);
    })();
  }, [searchText]);

  return (
    <Wrapper>
      <Header />

      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search Products"
                onKeyUp={(e) =>
                  setSearchText((e.target as HTMLInputElement).value)
                }
              />
            </div>
            {products.map((product: ProductProps) => {
              return (
                <div className="col-md-4" key={product.id}>
                  <div className="card mb-4 box-shadow">
                    <img
                      className="card-img-top"
                      src={product.imageUrl}
                      alt={product.imageUrl}
                      height="400"
                    />
                    <div className="card-body">
                      <p className="card-title">{product.title}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">{product.price}</small>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Main;
