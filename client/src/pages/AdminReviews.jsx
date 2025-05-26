import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/AdminReviews";
import { FormRow, FormRowSelect, Loading } from "../components";
import {
  deleteReview,
  getAllReviews,
  updateReview,
} from "../Features/Review/reviewSlice";
import { FaEdit, FaTrash, FaStar, FaSave, FaTimes } from "react-icons/fa";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { formatDate } from "../utils/formatDate";

const AdminReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    isLoading,
    reviews = [],
    totalReviews = 0,
    numOfPages = 1,
    error,
  } = useSelector((store) => store.review);

  const [searchParams, setSearchParams] = useState({
    search: "",
    rating: "all",
    sort: "latest",
    page: 1,
  });

  // State for inline editing
  const [editingReview, setEditingReview] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    comment: "",
    rating: 1,
  });

  // Get search params from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search") || "";
    const rating = params.get("rating") || "all";
    const sort = params.get("sort") || "latest";
    const page = parseInt(params.get("page")) || 1;

    setSearchParams({ search, rating, sort, page });
    dispatch(getAllReviews({ search, rating, sort, page }));
  }, [location.search, dispatch]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value && value !== "all") {
        params.set(key, value);
      }
    });
    navigate(`?${params.toString()}`);
  }, [searchParams, navigate]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setSearchParams((prev) => {
      const newParams = {
        ...prev,
        [name]: value,
        // Reset page to 1 when changing any filter except page
        page: name === "page" ? Number(value) : 1,
      };

      // Update URL parameters
      const params = new URLSearchParams();
      Object.entries(newParams).forEach(([key, val]) => {
        if (val && val !== "all") {
          params.set(key, val);
        }
      });
      navigate(`?${params.toString()}`);

      // Dispatch the action with new filters
      dispatch(getAllReviews(newParams));

      return newParams;
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await dispatch(deleteReview(id)).unwrap();
        toast.success("Review deleted successfully");
      } catch (error) {
        toast.error(error || "Something went wrong");
      }
    }
  };

  // Start editing a review
  const handleEditStart = (review) => {
    setEditingReview(review._id);
    setEditForm({
      title: review.title,
      comment: review.comment,
      rating: review.rating,
    });
  };

  // Cancel editing
  const handleEditCancel = () => {
    setEditingReview(null);
    setEditForm({
      title: "",
      comment: "",
      rating: 1,
    });
  };

  // Handle form input changes during editing
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value,
    }));
  };

  // Save edited review
  const handleEditSave = async (reviewId) => {
    try {
      await dispatch(
        updateReview({
          id: reviewId,
          reviewData: editForm,
        })
      ).unwrap();

      toast.success("Review updated successfully");
      setEditingReview(null);
      setEditForm({
        title: "",
        comment: "",
        rating: 1,
      });

      // Refresh reviews to show updated data
      dispatch(getAllReviews(searchParams));
    } catch (error) {
      toast.error(error || "Failed to update review");
    }
  };

  // Navigate to detailed edit page (alternative action)
  // const handleNavigateToEdit = (reviewId) => {
  //   navigate(`/admin/reviews/${reviewId}/edit`);
  // };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar key={index} color={index < rating ? "#f4ce14" : "#e4e5e9"} />
    ));
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Wrapper>
        <div className="error-container">
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      </Wrapper>
    );
  }

  const clearFilters = () => {
    const defaultParams = {
      search: "",
      rating: "all",
      sort: "latest",
      page: 1,
    };
    setSearchParams(defaultParams);
    navigate("");
    dispatch(getAllReviews(defaultParams));
  };

  // Shared Header and Filter UI
  const renderHeaderAndFilters = () => (
    <>
      <div className="header">
        <h2>Manage Reviews</h2>
        <p>Total Reviews: {totalReviews}</p>
      </div>
      <div className="filter-container">
        <div className="search-container">
          <FormRow
            type="text"
            name="search"
            value={searchParams.search}
            handleChange={handleFilterChange}
            placeholder="Search reviews..."
          />

          <FormRowSelect
            name="rating"
            value={searchParams.rating}
            handleChange={handleFilterChange}
            list={["all", "1", "2", "3", "4", "5"]}
            labelText="Filter by rating"
          />

          <FormRowSelect
            name="sort"
            value={searchParams.sort}
            handleChange={handleFilterChange}
            list={["latest", "oldest", "highest rating", "lowest rating"]}
            labelText="Sort by"
          />

          <button className="btn clear-btn" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      </div>
    </>
  );

  if (!reviews?.length) {
    return (
      <Wrapper>
        <div className="reviews-container">
          {renderHeaderAndFilters()}
          <div className="empty-reviews">
            <h3>No reviews found</h3>
            <p>Try adjusting your search criteria or clearing filters</p>
          </div>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="reviews-container">
        {renderHeaderAndFilters()}
        <div className="reviews">
          {reviews.map((review) => (
            <div key={review._id} className="review-card">
              <div className="review-header">
                <div className="review-info">
                  {editingReview === review._id ? (
                    // Edit mode
                    <div className="edit-form">
                      <FormRow
                        type="text"
                        name="title"
                        value={editForm.title}
                        handleChange={handleEditFormChange}
                        labelText="Review Title"
                      />
                      <FormRowSelect
                        name="rating"
                        value={editForm.rating.toString()}
                        handleChange={handleEditFormChange}
                        list={["1", "2", "3", "4", "5"]}
                        labelText="Rating"
                      />
                    </div>
                  ) : (
                    // Display mode
                    <>
                      <h4 className="review-title">{review.title}</h4>
                      <div className="review-rating">
                        {renderStars(review.rating)}
                      </div>
                    </>
                  )}
                </div>
                <div className="review-actions">
                  {editingReview === review._id ? (
                    // Edit mode actions
                    <>
                      <button
                        className="btn btn-success"
                        onClick={() => handleEditSave(review._id)}
                        title="Save changes"
                      >
                        <FaSave />
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={handleEditCancel}
                        title="Cancel editing"
                      >
                        <FaTimes />
                      </button>
                    </>
                  ) : (
                    // Normal mode actions
                    <>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(review._id)}
                        title="Delete review"
                      >
                        <FaTrash />
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEditStart(review)}
                        title="Edit inline"
                      >
                        <FaEdit />
                      </button>
                      {/* <button
                        className="btn btn-info"
                        onClick={() => handleNavigateToEdit(review._id)}
                        title="Edit in detail page"
                      >
                        Edit Page
                      </button> */}
                    </>
                  )}
                </div>
              </div>

              {editingReview === review._id ? (
                // Edit mode content
                <div className="edit-form">
                  <label className="form-label">Comment</label>
                  <textarea
                    name="comment"
                    value={editForm.comment}
                    onChange={handleEditFormChange}
                    className="form-textarea"
                    rows="4"
                    placeholder="Review comment..."
                  />
                </div>
              ) : (
                // Display mode content
                <p className="review-content">{review.comment}</p>
              )}

              <div className="review-meta">
                <span>Meal: {review.meal?.name || "N/A"}</span>
                <span>By: {review.user?.fullName || "Anonymous"}</span>
                <span>{formatDate(review.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>

        {totalReviews > 0 && (
          <div className="pagination-container">
            <button
              className="btn prev-btn"
              onClick={() => {
                const prevPage = Math.max(1, searchParams.page - 1);
                const event = { target: { name: "page", value: prevPage } };
                handleFilterChange(event);
              }}
              disabled={searchParams.page === 1}
            >
              <HiChevronDoubleLeft />
              prev
            </button>

            <div className="btn-container">
              {Array.from({ length: numOfPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    className={`btn page-btn ${
                      pageNumber === searchParams.page ? "active" : ""
                    }`}
                    onClick={() => {
                      const event = {
                        target: { name: "page", value: pageNumber },
                      };
                      handleFilterChange(event);
                    }}
                  >
                    {pageNumber}
                  </button>
                )
              )}
            </div>

            <button
              className="btn next-btn"
              onClick={() => {
                const nextPage = Math.min(numOfPages, searchParams.page + 1);
                const event = { target: { name: "page", value: nextPage } };
                handleFilterChange(event);
              }}
              disabled={searchParams.page === numOfPages}
            >
              next
              <HiChevronDoubleRight />
            </button>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default AdminReviews;
