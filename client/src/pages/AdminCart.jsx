import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { FormRow, FormRowSelect } from "../components";
import Wrapper from "../assets/wrappers/AdminCart";
import {
  fetchAllCarts,
  updateCartStatus,
  deleteCart,
} from "../Features/Cart/cartSlice";
import { formatPrice } from "../utils/formatPrice";

const AdminCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    carts,
    totalCarts,
    numOfPages,
    page,
    search,
    searchStatus,
    sort,
    isLoading,
  } = useSelector((store) => store.cart);

  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    sort: "latest",
    page: 1,
  });
  // Get search params from URL and fetch carts
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlFilters = {
      search: params.get("search") || "",
      status: params.get("status") || "all",
      sort: params.get("sort") || "latest",
      page: Number(params.get("page")) || 1,
    };
    setFilters(urlFilters);

    // Dispatch the action with userId population requirement
    dispatch(
      fetchAllCarts({
        ...urlFilters,
        populate: true, // This will tell the backend to populate user details
      })
    );
  }, [location.search, dispatch]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "all") {
        params.append(key, value);
      }
    });
    navigate(`?${params.toString()}`);
  }, [filters, navigate]);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [name]: value };
      if (name !== "page") {
        newFilters.page = 1;
      }
      return newFilters;
    });
  };

  const handleDelete = async (cartId) => {
    if (window.confirm("Are you sure you want to delete this cart?")) {
      try {
        await dispatch(deleteCart(cartId)).unwrap();
        toast.success("Cart deleted successfully");
        dispatch(fetchAllCarts(filters));
      } catch (error) {
        toast.error(error?.message || "Failed to delete cart");
      }
    }
  };

  const handleStatusUpdate = async (cartId, status) => {
    try {
      await dispatch(updateCartStatus({ cartId, status })).unwrap();
      toast.success("Cart status updated successfully");
      dispatch(fetchAllCarts(filters));
    } catch (error) {
      toast.error(error?.message || "Failed to update cart status");
    }
  };

  return (
    <Wrapper>
      <div className="admin-content">
        <div className="header">
          <h2>Cart Management</h2>
        </div>{" "}
        <div className="filters-container">
          <div className="form-row">
            <FormRow
              type="text"
              name="search"
              value={filters.search}
              handleChange={(e) => handleFilterChange("search", e.target.value)}
              labelText="Search Carts"
              placeholder="Search by user or item"
            />
          </div>

          <div className="form-row">
            <FormRowSelect
              labelText="Cart Status"
              name="status"
              value={filters.status}
              handleChange={(e) => handleFilterChange("status", e.target.value)}
              list={["all", "active", "abandoned", "completed"]}
            />
          </div>

          <div className="form-row">
            <FormRowSelect
              labelText="Sort By"
              name="sort"
              value={filters.sort}
              handleChange={(e) => handleFilterChange("sort", e.target.value)}
              list={["latest", "oldest", "total-highest", "total-lowest"]}
            />
          </div>

          <button
            className="clear-btn"
            onClick={() => {
              setFilters({
                search: "",
                status: "all",
                sort: "latest",
                page: 1,
              });
              navigate("?");
            }}
          >
            Clear Filters
          </button>
        </div>
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="carts-grid">
            {carts.map((cart) => (
              <div key={cart._id} className="cart-card">
                {" "}
                <div className="card-header">
                  <span>Cart ID: {cart._id}</span>
                  <span className="date">
                    Created: {new Date(cart.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="cart-details">
                  <div className="user-info">
                    <p>
                      <span className="label">User ID:</span>
                      <span className="value">{cart.userId._id}</span>
                    </p>
                    <p>
                      <span className="label">Name:</span>
                      <span className="value">
                        {cart.userId?.name || "N/A"}
                      </span>
                    </p>
                    <p>
                      <span className="label">Email:</span>
                      <span className="value">
                        {cart.userId?.email || "N/A"}
                      </span>
                    </p>
                    <p>
                      <span className="label">Last Updated:</span>
                      <span className="value">
                        {new Date(cart.updatedAt).toLocaleString()}
                      </span>
                    </p>
                  </div>

                  <div className="cart-summary">
                    {" "}
                    <div className="meals-list">
                      <h4>Cart Items</h4>
                      {cart.cartItems.map((item, index) => (
                        <div key={item.mealID || index} className="meal-item">
                          <span className="meal-name">{item.name}</span>
                          <span className="meal-total">
                            {formatPrice(
                              item.ingredients.reduce(
                                (sum, ing) => sum + ing.price * ing.quantity,
                                0
                              )
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="totals">
                      <p>
                        <span className="label">Number of Meals:</span>
                        <span className="value">{cart.cartItems.length}</span>
                      </p>
                      <p>
                        <span className="label">Total Items:</span>
                        <span className="value">
                          {cart.cartItems.reduce(
                            (total, meal) => total + meal.ingredients.length,
                            0
                          )}
                        </span>
                      </p>
                      <p>
                        <span className="label">Cart Total:</span>
                        <span className="value highlight">
                          {formatPrice(
                            cart.cartItems.reduce(
                              (total, meal) =>
                                total +
                                meal.ingredients.reduce(
                                  (sum, ing) => sum + ing.price * ing.quantity,
                                  0
                                ),
                              0
                            )
                          )}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>{" "}
                <div className="action-buttons">
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(cart._id)}
                  >
                    Delete Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {numOfPages > 1 && (
          <div className="pagination">
            <button
              className="btn btn-prev"
              onClick={() =>
                handleFilterChange("page", Math.max(1, filters.page - 1))
              }
              disabled={filters.page === 1}
            >
              Prev
            </button>
            <span className="page-info">
              Page {filters.page} of {numOfPages}
            </span>
            <button
              className="btn btn-next"
              onClick={() =>
                handleFilterChange(
                  "page",
                  Math.min(numOfPages, filters.page + 1)
                )
              }
              disabled={filters.page === numOfPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default AdminCart;
