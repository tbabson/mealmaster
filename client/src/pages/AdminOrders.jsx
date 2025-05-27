import { useState, useEffect } from "react";
import { useLoaderData, useNavigate, useLocation } from "react-router-dom";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaList, FaTimes } from "react-icons/fa";
import { FormRow, FormRowSelect } from "../components";
import Wrapper from "../assets/wrappers/AdminOrders";
import { ORDERS, DELIVERY } from "../../../utils/constants";
import customFetch from "../utils/customFetch";

const AdminOrders = () => {
  const queryClient = useQueryClient();
  const { searchValues } = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // State for filters
  const [filters, setFilters] = useState({
    search: queryParams.get("search") || "",
    status: queryParams.get("status") || "all",
    delivery: queryParams.get("delivery") || "all",
    sort: queryParams.get("sort") || "latest",
    page: Number(queryParams.get("page")) || 1,
  });

  const [selectedOrder, setSelectedOrder] = useState(null);
  // Fetch orders with filters
  const { data: ordersData, isLoading } = useQuery({
    queryKey: ["adminOrders", filters],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "all") {
          searchParams.append(key, value);
        }
      });
      const { data } = await customFetch.get(
        `/orders?${searchParams.toString()}`
      );
      return data;
    },
  });

  const { orders = [], totalOrders = 0, numOfPages = 1 } = ordersData || {};

  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    if (field !== "page") {
      newFilters.page = 1;
    }
    setFilters(newFilters);

    // Update URL
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value !== "all") {
        params.append(key, value);
      }
    });
    navigate(`?${params.toString()}`);
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await customFetch.patch(`/orders/${orderId}/status`, { status });
      queryClient.invalidateQueries(["adminOrders"]);
      toast.success("Order status updated successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update order status"
      );
    }
  };

  const handleUpdateDeliveryStatus = async (orderId, deliveryStatus) => {
    try {
      await customFetch.patch(`/orders/${orderId}/delivery`, {
        deliveryStatus,
      });
      queryClient.invalidateQueries(["adminOrders"]);
      toast.success("Delivery status updated successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update delivery status"
      );
    }
  };

  const handleUpdatePayment = async (orderId, isPaid) => {
    try {
      await customFetch.patch(`/orders/${orderId}/payment`, { isPaid });
      queryClient.invalidateQueries(["adminOrders"]);
      toast.success("Payment status updated successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update payment status"
      );
    }
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      status: "all",
      delivery: "all",
      sort: "latest",
      page: 1,
    });
    navigate("?");
  };

  return (
    <Wrapper>
      <div className="admin-content">
        <div className="header">
          <h2>Order Management</h2>
        </div>

        <div className="filters-container">
          <FormRow
            type="text"
            name="search"
            value={filters.search}
            handleChange={(e) => handleFilterChange("search", e.target.value)}
            labelText="Search Orders"
            placeholder="Search by name or tracking number"
          />
          <FormRowSelect
            labelText="Order Status"
            name="status"
            value={filters.status}
            handleChange={(e) => handleFilterChange("status", e.target.value)}
            list={["all", ...Object.values(ORDERS)]}
          />
          <FormRowSelect
            labelText="Delivery Status"
            name="delivery"
            value={filters.delivery}
            handleChange={(e) => handleFilterChange("delivery", e.target.value)}
            list={["all", ...Object.values(DELIVERY)]}
          />
          <FormRowSelect
            labelText="Sort By"
            name="sort"
            value={filters.sort}
            handleChange={(e) => handleFilterChange("sort", e.target.value)}
            list={["latest", "oldest", "amount-highest", "amount-lowest"]}
          />
          <button className="btn clear-btn" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="orders-grid">
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="card-header">
                  <span>Order #{order._id.slice(-6)}</span>
                  <span className="tracking">
                    Tracking: {order.trackingNumber}
                  </span>
                </div>
                <div className="card-details">
                  <p>
                    <span className="label">Customer:</span>
                    <span className="value">
                      {order.shippingAddress.fullName}
                    </span>
                  </p>
                  <div className="meals-list">
                    {order.cartItems.map((item) => (
                      <p key={item.mealID}>
                        <span className="label meal-name">{item.name}</span>
                        <span className="value">
                          ₦
                          {item.ingredients
                            .reduce(
                              (sum, ing) => sum + ing.price * ing.quantity,
                              0
                            )
                            .toFixed(2)}
                        </span>
                      </p>
                    ))}
                  </div>
                  <p>
                    <span className="label">Total Amount:</span>
                    <span className="value">
                      ₦{order.totalAmount.toFixed(2)}
                    </span>
                  </p>
                  <p>
                    <span className="label">Date:</span>
                    <span className="value">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </p>
                </div>
                <div className="status-container">
                  <div className="select-group">
                    <label>Delivery Status</label>
                    <select
                      value={order.deliveryStatus}
                      onChange={(e) =>
                        handleUpdateDeliveryStatus(order._id, e.target.value)
                      }
                    >
                      {Object.values(DELIVERY).map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="select-group">
                    <label>Order Status</label>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleUpdateOrderStatus(order._id, e.target.value)
                      }
                    >
                      {Object.values(ORDERS).map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  className={`payment-btn ${order.isPaid ? "paid" : "unpaid"}`}
                  onClick={() => handleUpdatePayment(order._id, !order.isPaid)}
                >
                  {order.isPaid
                    ? "Payment Received"
                    : "Mark Payment as Received"}
                </button>
                <button
                  className="view-details"
                  onClick={() => setSelectedOrder(order)}
                >
                  View Order Details <FaList />
                </button>
              </div>
            ))}
          </div>
        )}

        {selectedOrder && (
          <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button
                className="close-modal"
                onClick={() => setSelectedOrder(null)}
              >
                <FaTimes />
              </button>

              <h2>Order Details</h2>
              <div className="card-header">
                <span>Order #{selectedOrder._id.slice(-6)}</span>
                <span className="tracking">
                  Tracking: {selectedOrder.trackingNumber}
                </span>
              </div>

              <div className="order-items">
                <h3>Ordered Items</h3>
                {selectedOrder.cartItems.map((item) => (
                  <div key={item.mealID} className="order-item">
                    <img
                      src={item.image || "/placeholder-meal.jpg"}
                      alt={item.name}
                    />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <div className="ingredients">
                        {item.ingredients.map((ing, index) => (
                          <div key={index}>
                            {ing.name}: {ing.quantity} {ing.unit} (₦{ing.price})
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="address-details">
                <h3>Shipping Information</h3>
                <p>
                  <strong>Name:</strong>{" "}
                  {selectedOrder.shippingAddress.fullName}
                </p>
                <p>
                  <strong>Address:</strong>{" "}
                  {selectedOrder.shippingAddress.address}
                </p>
                <p>
                  <strong>City:</strong> {selectedOrder.shippingAddress.city}
                </p>
                <p>
                  <strong>Postal Code:</strong>{" "}
                  {selectedOrder.shippingAddress.postalCode}
                </p>
                <p>
                  <strong>Country:</strong>{" "}
                  {selectedOrder.shippingAddress.country}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedOrder.shippingAddress.phone}
                </p>
              </div>

              <div className="order-summary">
                <h3>Order Summary</h3>
                <div className="summary-item">
                  <span>Items Total:</span>
                  <span>
                    ₦
                    {(
                      selectedOrder.totalAmount -
                      selectedOrder.taxPrice -
                      selectedOrder.shippingPrice
                    ).toFixed(2)}
                  </span>
                </div>
                <div className="summary-item">
                  <span>Tax:</span>
                  <span>₦{selectedOrder.taxPrice.toFixed(2)}</span>
                </div>
                <div className="summary-item">
                  <span>Shipping:</span>
                  <span>₦{selectedOrder.shippingPrice.toFixed(2)}</span>
                </div>
                <div className="summary-item">
                  <strong>Total:</strong>
                  <strong>₦{selectedOrder.totalAmount.toFixed(2)}</strong>
                </div>
                <div className="summary-item">
                  <span>Payment Method:</span>
                  <span>{selectedOrder.paymentMethod}</span>
                </div>
                <div className="summary-item">
                  <span>Payment Status:</span>
                  <span className={selectedOrder.isPaid ? "paid" : "unpaid"}>
                    {selectedOrder.isPaid
                      ? `Paid (${new Date(
                          selectedOrder.paidAt
                        ).toLocaleDateString()})`
                      : "Not Paid"}
                  </span>
                </div>
                <div className="summary-item">
                  <span>Order Date:</span>
                  <span>
                    {new Date(selectedOrder.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
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

export default AdminOrders;
