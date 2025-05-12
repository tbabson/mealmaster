import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { FaPlus, FaList, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Wrapper from "../assets/wrappers/AdminBlog";
import { FormRow, FormRowSelect } from "../components";
import {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  handleChange,
  clearFilters,
  changePage,
} from "../Features/Blog/blogSlice";

const AdminBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    isLoading,
    blogs,
    totalBlogs,
    numOfPages,
    page,
    search,
    searchStatus,
    searchCategory,
    sort,
  } = useSelector((store) => store.blog);

  const [showForm, setShowForm] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [blogForm, setBlogForm] = useState({
    title: "",
    content: "",
    category: "General",
    status: "draft",
    featuredImage: null,
    metaTitle: "",
    metaDescription: "",
    keywords: [],
    featuredImageAlt: "",
    slug: "",
  });

  // Quill editor modules configuration
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "blockquote",
    "code-block",
    "link",
  ];

  // Get search params from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParams = {
      search: params.get("search") || "",
      searchStatus: params.get("status") || "all",
      searchCategory: params.get("category") || "all",
      sort: params.get("sort") || "newest",
      page: Number(params.get("page")) || 1,
    };

    // Update redux state with URL params
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) {
        dispatch(handleChange({ name: key, value }));
      }
    });

    // Fetch blogs with current filters
    dispatch(getAllBlogs());
  }, [location.search, dispatch]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (searchStatus !== "all") params.append("status", searchStatus);
    if (searchCategory !== "all") params.append("category", searchCategory);
    if (sort !== "newest") params.append("sort", sort);
    if (page !== 1) params.append("page", page);

    navigate(`?${params.toString()}`);
  }, [search, searchStatus, searchCategory, sort, page, navigate]);

  const handleFilterChange = (name, value) => {
    dispatch(handleChange({ name, value }));
    if (name !== "page") {
      dispatch(changePage(1));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!blogForm.title.trim()) {
      toast.error("Blog title is required");
      return;
    }

    if (!blogForm.content.trim()) {
      toast.error("Blog content is required");
      return;
    }

    if (!isEditing && !blogForm.featuredImage) {
      toast.error("Featured image is required");
      return;
    }

    if (!blogForm.featuredImageAlt) {
      toast.error(
        "Featured image alt text is required for accessibility and SEO"
      );
      return;
    }

    // Generate slug if not provided
    const finalSlug =
      blogForm.slug || blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    try {
      const formData = new FormData();
      formData.append("title", blogForm.title);
      formData.append("content", blogForm.content);
      formData.append("category", blogForm.category);
      formData.append("status", blogForm.status);
      formData.append("metaTitle", blogForm.metaTitle || blogForm.title);
      formData.append("metaDescription", blogForm.metaDescription);
      formData.append("keywords", JSON.stringify(blogForm.keywords));
      formData.append("featuredImageAlt", blogForm.featuredImageAlt);
      formData.append("slug", finalSlug);
      if (blogForm.featuredImage) {
        formData.append("featuredImage", blogForm.featuredImage);
      }

      if (isEditing) {
        await dispatch(
          updateBlog({ blogId: selectedBlog._id, blog: formData })
        ).unwrap();
        toast.success("Blog updated successfully");
      } else {
        await dispatch(createBlog(formData)).unwrap();
        toast.success("Blog created successfully");
      }

      resetForm();
      setShowForm(false);
      dispatch(getAllBlogs());
    } catch (error) {
      toast.error(error || "Something went wrong");
    }
  };

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setBlogForm({
      title: blog.title,
      content: blog.content,
      category: blog.category,
      status: blog.status,
      featuredImage: null,
      metaTitle: blog.metaTitle || "",
      metaDescription: blog.metaDescription || "",
      keywords: blog.keywords || [],
      featuredImageAlt: blog.featuredImageAlt || "",
      slug: blog.slug || "",
    });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await dispatch(deleteBlog(id)).unwrap();
        toast.success("Blog deleted successfully");
      } catch (error) {
        toast.error(error);
      }
    }
  };

  const resetForm = () => {
    setBlogForm({
      title: "",
      content: "",
      category: "General",
      status: "draft",
      featuredImage: null,
      metaTitle: "",
      metaDescription: "",
      keywords: [],
      featuredImageAlt: "",
      slug: "",
    });
    setSelectedBlog(null);
    setIsEditing(false);
  };

  return (
    <Wrapper>
      <div className="admin-content">
        <div className="header">
          <h2>
            {showForm
              ? isEditing
                ? "Edit Blog"
                : "Create New Blog"
              : "All Blogs"}
          </h2>
          <button
            className="btn create-btn"
            onClick={() => {
              setShowForm(!showForm);
              if (!showForm) resetForm();
            }}
          >
            {showForm ? <FaList /> : <FaPlus />}
            {showForm ? "View Blogs" : "Create Blog"}
          </button>
        </div>

        {showForm ? (
          <div className="blog-form">
            <form onSubmit={handleSubmit}>
              <FormRow
                type="text"
                name="title"
                value={blogForm.title}
                handleChange={(e) =>
                  setBlogForm({ ...blogForm, title: e.target.value })
                }
                labelText="Blog Title"
              />

              <div className="form-row">
                <label htmlFor="content">Content</label>
                <ReactQuill
                  value={blogForm.content}
                  onChange={(content) => setBlogForm({ ...blogForm, content })}
                  modules={modules}
                  formats={formats}
                  placeholder="Write your blog content here..."
                  theme="snow"
                />
              </div>

              <FormRowSelect
                labelText="Category"
                name="category"
                value={blogForm.category}
                list={[
                  "General",
                  "Recipes",
                  "Nutrition",
                  "Cooking Tips",
                  "Health",
                  "Other",
                ]}
                handleChange={(e) =>
                  setBlogForm({ ...blogForm, category: e.target.value })
                }
              />

              <FormRowSelect
                labelText="Status"
                name="status"
                value={blogForm.status}
                list={["draft", "published"]}
                handleChange={(e) =>
                  setBlogForm({ ...blogForm, status: e.target.value })
                }
              />

              <div className="seo-section">
                <h3>SEO Settings</h3>
                <FormRow
                  type="text"
                  name="metaTitle"
                  value={blogForm.metaTitle}
                  handleChange={(e) =>
                    setBlogForm({ ...blogForm, metaTitle: e.target.value })
                  }
                  labelText="Meta Title (SEO)"
                  placeholder="Enter SEO-optimized title (max 60 characters)"
                />
                <div className="form-row">
                  <label htmlFor="metaDescription">
                    Meta Description (SEO)
                    <small>{blogForm.metaDescription.length}/160</small>
                  </label>
                  <textarea
                    id="metaDescription"
                    name="metaDescription"
                    value={blogForm.metaDescription}
                    onChange={(e) =>
                      setBlogForm({
                        ...blogForm,
                        metaDescription: e.target.value,
                      })
                    }
                    placeholder="Enter SEO-optimized description"
                    maxLength="160"
                    rows="3"
                  />
                </div>
                <FormRow
                  type="text"
                  name="slug"
                  value={blogForm.slug}
                  handleChange={(e) =>
                    setBlogForm({ ...blogForm, slug: e.target.value })
                  }
                  labelText="URL Slug"
                  placeholder="custom-url-slug (leave empty to auto-generate)"
                />
                <div className="form-row">
                  <label htmlFor="keywords">Keywords (SEO)</label>
                  <input
                    type="text"
                    id="keywords"
                    placeholder="Enter keywords separated by commas"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === ",") {
                        e.preventDefault();
                        const value = e.target.value.trim();
                        if (value) {
                          setBlogForm((prev) => ({
                            ...prev,
                            keywords: [...prev.keywords, value],
                          }));
                          e.target.value = "";
                        }
                      }
                    }}
                  />
                  <div className="keywords-list">
                    {blogForm.keywords.map((keyword, index) => (
                      <span key={index} className="keyword-tag">
                        {keyword}
                        <button
                          type="button"
                          onClick={() => {
                            setBlogForm((prev) => ({
                              ...prev,
                              keywords: prev.keywords.filter(
                                (_, i) => i !== index
                              ),
                            }));
                          }}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <FormRow
                type="text"
                name="featuredImageAlt"
                value={blogForm.featuredImageAlt}
                handleChange={(e) =>
                  setBlogForm({ ...blogForm, featuredImageAlt: e.target.value })
                }
                labelText="Image Alt Text"
                placeholder="Describe the featured image for accessibility and SEO"
              />

              <div className="form-row">
                <label htmlFor="featuredImage">Featured Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setBlogForm({
                      ...blogForm,
                      featuredImage: e.target.files[0],
                    })
                  }
                />
              </div>

              <button type="submit" className="btn submit-btn">
                {isEditing ? "Update Blog" : "Create Blog"}
              </button>
            </form>
          </div>
        ) : (
          <div className="blogs-list">
            <div className="filters-container">
              <FormRow
                type="text"
                name="search"
                labelText="Search Blogs"
                value={search}
                handleChange={(e) =>
                  handleFilterChange("search", e.target.value)
                }
              />
              <FormRowSelect
                labelText="Status"
                name="searchStatus"
                value={searchStatus}
                list={["all", "draft", "published"]}
                handleChange={(e) =>
                  handleFilterChange("searchStatus", e.target.value)
                }
              />
              <FormRowSelect
                labelText="Category"
                name="searchCategory"
                value={searchCategory}
                list={[
                  "all",
                  "General",
                  "Recipes",
                  "Nutrition",
                  "Cooking Tips",
                  "Health",
                  "Other",
                ]}
                handleChange={(e) =>
                  handleFilterChange("searchCategory", e.target.value)
                }
              />
              <FormRowSelect
                labelText="Sort"
                name="sort"
                value={sort}
                list={["newest", "oldest", "a-z", "z-a"]}
                handleChange={(e) => handleFilterChange("sort", e.target.value)}
              />
              <button
                className="btn clear-btn"
                onClick={() => dispatch(clearFilters())}
              >
                Clear Filters
              </button>
            </div>

            {isLoading ? (
              <div className="loading-container">Loading blogs...</div>
            ) : (
              <div className="blogs-grid">
                {blogs.map((blog) => (
                  <div key={blog._id} className="blog-card">
                    {blog.featuredImage && (
                      <img src={blog.featuredImage} alt={blog.title} />
                    )}
                    <div className="blog-info">
                      <h3>{blog.title}</h3>
                      <p>Category: {blog.category}</p>
                      <p>Status: {blog.status}</p>
                      <p>
                        Created: {new Date(blog.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="blog-actions">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(blog)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(blog._id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {numOfPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => handleFilterChange("page", 1)}
                  disabled={page === 1}
                  className="btn btn-first"
                >
                  First
                </button>
                <button
                  onClick={() =>
                    handleFilterChange("page", Math.max(1, page - 1))
                  }
                  disabled={page === 1}
                  className="btn btn-prev"
                >
                  Prev
                </button>
                <span className="page-info">
                  Page {page} of {numOfPages}
                </span>
                <button
                  onClick={() =>
                    handleFilterChange("page", Math.min(numOfPages, page + 1))
                  }
                  disabled={page === numOfPages}
                  className="btn btn-next"
                >
                  Next
                </button>
                <button
                  onClick={() => handleFilterChange("page", numOfPages)}
                  disabled={page === numOfPages}
                  className="btn btn-last"
                >
                  Last
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default AdminBlog;
