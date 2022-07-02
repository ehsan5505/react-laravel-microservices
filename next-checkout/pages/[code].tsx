import { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import config from "../config_const";
import axios from "axios/index";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  const { code } = router.query;
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState([{ product_id: 0, quantity: 0 }]);

  useEffect(() => {
    if (code !== undefined) {
      (async () => {
        const resp = await axios.get(`${config.endpoint}/links/${code}`);
        const data = resp.data.data;
        setUser(data.user);
        setProducts(data.products);
        setQuantities(
          data.products.map((p) => {
            return {
              product_id: p.id,
              quantity: 0,
            };
          })
        );
      })();
    }
  }, [code]);

  const getQuantity = (id: number) => {
    console.info(`${id} => Quantity = ${quantities}`);
    // const q = quantities.find((q) => q.product_id === id);
    // return q ? q.quantity : 0;
    return 0;
  };

  const changeQty = (id: number, qty: number) => {
    setQuantities(
      quantities.map(q => {
        if(q.product_id === id)
        {
          return {
            product_id: id,
            quantity: qty
          }
        }

        return q;
      })
    );
  };

  const total = () => {
    let temp = 0;
    quantities.forEach((q) => {
      const product = products.find((p) => p.id === q.product_id);
      // console.info(`Price: ${product?.price} | Quantity: ${q?.quantity} | Total: ${product?.price*q?.quantity}`);
      temp += (q?.quantity * product?.price);
    });
    return temp;
  };

  return (
    <Wrapper>
      <div className="container">
        <div className="py-5 text-center">
          <h2>Welcome</h2>
          <p className="lead">
            {user?.first_name} {user?.last_name} has invited you to Buy the
            item(s)!
          </p>
        </div>

        <div className="row">
          <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Products</span>
              <span className="badge badge-secondary badge-pill">3</span>
            </h4>
            <ul className="list-group mb-3">
              {products.map((product) => {
                return (
                  <div key={product.id}>
                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                      <div>
                        <h6 className="my-0">{product.title}</h6>
                        <small className="text-muted">
                          {product.description}
                        </small>
                      </div>
                      <span className="text-muted">${product.price}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                      <div>
                        <h6 className="my-0">Quantity</h6>
                      </div>
                      <input
                        type="number"
                        className="text-muted form-control"
                        style={{ width: "65px" }}
                        defaultValue={getQuantity(product.id)}
                        onChange={(e) =>
                          changeQty(product.id, parseInt(e.target.value))
                        }
                      />
                    </li>
                  </div>
                );
              })}

              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>${total()}</strong>
              </li>
            </ul>
          </div>
          <div className="col-md-8 order-md-1">
            <h4 className="mb-3">Billing address</h4>
            <form className="needs-validation">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="firstName">First name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastName">Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="email">
                  Email <span className="text-muted">(Optional)</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="you@example.com"
                />
                <div className="invalid-feedback">
                  Please enter a valid email address for shipping updates.
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="1234 Main St"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="address2">
                  Address 2 <span className="text-muted">(Optional)</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address2"
                  placeholder="Apartment or suite"
                />
              </div>

              <div className="row">
                <div className="col-md-5 mb-3">
                  <label htmlFor="country">Country</label>
                  <select
                    className="custom-select form-select d-block w-100"
                    id="country"
                    required
                  >
                    <option value="">Choose...</option>
                    <option value="IN">India</option>
                    <option value="PK">Pakistan</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                  </select>
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="state">State</label>
                  <select
                    className="custom-select d-block w-100 form-select"
                    id="state"
                    required
                  >
                    <option value="">Choose...</option>
                    <option value="SI">Sindh</option>
                    <option value="PB">Punjab</option>
                    <option value="BA">Balochistan</option>
                    <option value="KP">Khyber Paktuwan</option>
                    <option value="BL">Balitistan</option>
                  </select>
                </div>

                <div className="col-md-3 mb-3">
                  <label htmlFor="zip">Zip</label>
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
                    placeholder="Zip"
                    required
                  />
                </div>
              </div>

              <hr className="mb-4" />
              <button
                className="btn btn-primary btn-lg btn-block"
                type="submit"
              >
                Continue to checkout
              </button>
            </form>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Home;
