import axios from "axios";
import React, { useEffect, useState } from "react";
import { ProductProps } from "../classes/product";
import Header from "../components/Header";
import Wrapper from "./Wrapper";

import "./styles/Main.css";

const Main = () => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selected, setSelected] = useState([]);

  // Check if te item is selected
  const isSelected = (id: number) =>
    selected.filter((s) => s === id).length > 0;

  const select = (id: number) => {
    if (isSelected(id)) {
      // If click again if already selected then unselect it
      setSelected(selected.filter((s) => s !== id));
      return;
    }
    // @ts-ignore
    setSelected([...selected, id]);
    console.info(selected);
  };

  useEffect(() => {
    (async () => {
      const response = await axios.get(`products?s=${searchText}`);
      setProducts(response.data.data);
    })();
  }, [searchText]);

  let button, info;

  if (selected) {
    button = (
      <div className="input-group-append">
        <button className="btn btn-info">Generate Link</button>
      </div>
    );
  }

  return (
    <Wrapper>
      <Header />

      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-4">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Products"
                  onKeyUp={(e) =>
                    setSearchText((e.target as HTMLInputElement).value)
                  }
                />
                {button}
              </div>
            </div>
            {products.map((product: ProductProps) => {
              return (
                <div className="col-md-4" key={product.id}>
                  <div
                    onClick={() => select(product.id)}
                    className={
                      isSelected(product.id)
                        ? "card mb-4 box-shadow selected"
                        : "card mb-4 box-shadow"
                    }
                  >
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
