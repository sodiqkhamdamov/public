import React, { useEffect, useState } from "react";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../../service";

const Interview = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hideMore, setHideMore] = useState(false);
  const [value, setValue] = useState({
    name_uz: "",
    address: "",
    cost: "",
    product_type_id: 0,
    created_date: "",
    id: 0,
  });

  useEffect(() => {
    fetchInitialProducts();
  }, []);

  const fetchInitialProducts = async () => {
    setLoading(true);
    const data = await fetchProducts(1);
    setProducts(data);
    setLoading(false);
  };

  const fetchMoreProducts = async (p) => {
    const data = await fetchProducts(p);
    if (data.length) {
      setProducts([...products, ...data]);
    } else {
      setHideMore(true);
    }
    setPage(p);
  };
  if (loading) {
    return <h1>Loading...</h1>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (value.id > 0) {
      const res = await updateProduct(value);
      const changed = products.map((item) => (item.id === res.id ? res : item));
      setProducts(changed);
    } else {
      const res = await createProduct(value);
      setProducts([...products, res]);
    }
    setValue({
      name_uz: "",
      address: "",
      cost: "",
      product_type_id: 0,
      created_date: "",
    });
  };

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const deleteExistingProduct = async (id) => {
    const res = await deleteProduct(id);
    if (res.status === 200) {
      setProducts([...products.filter((item) => item.id !== id)]);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {products?.map((item, index) => (
          <div
            style={{
              border: "1px solid red",
              margin: "10px",
              padding: "10px",
              textAlign: "center",
              width: "250px",
            }}
            key={index}
          >
            <h4>{item.name_uz}</h4>
            <p>{item.cost}</p>
            <p>{item.address}</p>
            <div
              style={{
                display: "flex",
              }}
            >
              <div
                style={{
                  flex: 1,
                  textAlign: "center",
                  background: "green",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setValue(item);
                }}
              >
                Edit
              </div>
              <div
                style={{
                  flex: 1,
                  textAlign: "center",
                  background: "red",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => {
                  deleteExistingProduct(item.id);
                }}
              >
                Delete
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>{page}</div>
      {page > 1 && (
        <button
          onClick={() => {
            setPage(1);
            fetchInitialProducts();
            setHideMore(false);
          }}
        >
          Reset
        </button>
      )}
      {!hideMore ? (
        <button onClick={() => fetchMoreProducts(page + 1)}>Fetch More</button>
      ) : null}

      <form onSubmit={handleSubmit}>
        <input
          value={value.name_uz}
          required
          type="text"
          name="name_uz"
          onChange={handleChange}
        />
        <input
          value={value.address}
          required
          type="text"
          name="address"
          onChange={handleChange}
        />
        <input
          value={value.cost}
          required
          type="number"
          name="cost"
          onChange={handleChange}
        />
        <input
          type="submit"
          value={`${value.id ? "Update" : "Create"} Product`}
        />
      </form>
    </div>
  );
};

export default Interview;
