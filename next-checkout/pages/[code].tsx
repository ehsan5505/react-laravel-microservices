import { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import config from "../config_const";
import axios from "axios/index";
import { useRouter } from "next/router";

declare var Stripe;

const Home = () => {
  const router = useRouter();
  const { code } = router.query;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail]       = useState("");
  const [address, setAddress]   = useState("");
  const [address2, setAddress2] = useState("");
  const [country, setCountry]   = useState("");
  const [city,setCity]          = useState("");
  const [zip, setZip]           = useState("");

  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState([
    { product_id: 0, quantity: 0 },
  ]);

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
    const q = quantities.find((q) => q?.product_id === id);
    return q ? q?.quantity : 0;
  };

  const changeQty = (id: number, qty: number) => {
    setQuantities(
      quantities.map((q) => {
        if (q?.product_id === id) {
          return {
            product_id: id,
            quantity: qty,
          };
        }

        return q;
      })
    );
  };

  const total = () => {
    let temp = 0;
    quantities.forEach((q) => {
      const product = products.find((p) => p.id === q.product_id);
      temp += q?.quantity * product?.price;
    });
    return temp;
  };


  const submit = async (e) => {
    e.preventDefault();

    const resp = await axios.post(`${config.endpoint}/orders`,{
      first_name:     firstName,
      last_name:      lastName,
      email:          email,
      address:        address,
      address2:       address2,
      city:           city,
      zip:            zip,
      country:        country,
      code:           code,
      items:          quantities
    });
    console.log(resp.data);
    
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
                        min="0"
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
            <form className="needs-validation" onSubmit={submit}>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="firstName">First name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="First Name"
                    onChange={e => setFirstName(e.target.value)}
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
                    onChange={e => setLastName(e.target.value)}
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
                  onChange={e => setEmail(e.target.value)}
                  required
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
                  onChange={e => setAddress(e.target.value)}
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
                  onChange={e => setAddress2(e.target.value)}
                />
              </div>

              <div className="row">
                <div className="col-md-5 mb-3">
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    name="country"
                    className="form-control"
                    placeholder="Country"
                    onChange={e => setCountry(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    placeholder="City"
                    onChange={e => setCity(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-3 mb-3">
                  <label htmlFor="zip">Zip</label>
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
                    placeholder="Zip"
                    onChange={e => setZip(e.target.value)}
                    required
                  />
                </div>
              </div>

              <hr className="mb-4" />
              <input
                type='submit'
                className="btn btn-primary btn-lg btn-block"
                value="Checkout"
                />
            </form>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Home;
