import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/customFetch';

const initialFiltersState = {
    search: '',
    searchStatus: 'all',
    searchCategory: 'all',
    sort: 'newest',
};

const initialState = {
    isLoading: false,
    blogs: [],
    blog: null,
    totalBlogs: 0,
    numOfPages: 1,
    page: 1,
    ...initialFiltersState,
};

export const getAllBlogs = createAsyncThunk(
    'blog/getAllBlogs',
    async (_, thunkAPI) => {
        const { search, searchStatus, searchCategory, sort, page } = thunkAPI.getState().blog;
        let url = `/api/v1/blogs?page=${page}&status=${searchStatus}&category=${searchCategory}&sort=${sort}`;
        if (search) {
            url = url + `&search=${search}`;
        }
        try {
            const resp = await customFetch.get(url);
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('There was an error fetching blogs');
        }
    }
);

export const getSingleBlog = createAsyncThunk(
    'blog/getSingleBlog',
    async (id, thunkAPI) => {
        try {
            const resp = await customFetch.get(`/api/v1/blogs/${id}`);
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
);

export const createBlog = createAsyncThunk(
    'blog/createBlog',
    async (blog, thunkAPI) => {
        try {
            const resp = await customFetch.post('/api/v1/blogs', blog);
            toast.success('Blog Created Successfully');
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
);

export const updateBlog = createAsyncThunk(
    'blog/updateBlog',
    async ({ blogId, blog }, thunkAPI) => {
        try {
            const resp = await customFetch.patch(`/api/v1/blogs/${blogId}`, blog);
            toast.success('Blog Updated Successfully');
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
);

export const deleteBlog = createAsyncThunk(
    'blog/deleteBlog',
    async (blogId, thunkAPI) => {
        try {
            const resp = await customFetch.delete(`/api/v1/blogs/${blogId}`);
            thunkAPI.dispatch(getAllBlogs());
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
);

export const addComment = createAsyncThunk(
    'blog/addComment',
    async ({ blogId, comment }, thunkAPI) => {
        try {
            const resp = await customFetch.post(`/api/v1/blogs/${blogId}/comments`, comment);
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
);

export const deleteComment = createAsyncThunk(
    'blog/deleteComment',
    async ({ blogId, commentId }, thunkAPI) => {
        try {
            const resp = await customFetch.delete(`/api/v1/blogs/${blogId}/comments/${commentId}`);
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
);

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        handleChange: (state, { payload: { name, value } }) => {
            state[name] = value;
        },
        clearFilters: (state) => {
            return { ...state, ...initialFiltersState };
        },
        changePage: (state, { payload }) => {
            state.page = payload;
        },
        clearBlogState: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllBlogs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllBlogs.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.blogs = payload.blogs;
                state.totalBlogs = payload.totalBlogs;
                state.numOfPages = payload.numOfPages;
            })
            .addCase(getAllBlogs.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload);
            })
            .addCase(getSingleBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSingleBlog.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.blog = payload.blog;
            })
            .addCase(getSingleBlog.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload);
            })
            .addCase(createBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBlog.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(createBlog.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload);
            })
            .addCase(updateBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateBlog.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.blog = payload.blog;
            })
            .addCase(updateBlog.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload);
            })
            .addCase(deleteBlog.rejected, (state, { payload }) => {
                toast.error(payload);
            })
            .addCase(addComment.fulfilled, (state, { payload }) => {
                state.blog.comments = payload.comments;
            })
            .addCase(addComment.rejected, (state, { payload }) => {
                toast.error(payload);
            })
            .addCase(deleteComment.fulfilled, (state, { payload }) => {
                state.blog.comments = payload.comments;
            })
            .addCase(deleteComment.rejected, (state, { payload }) => {
                toast.error(payload);
            });
    },
});

export const { handleChange, clearFilters, changePage, clearBlogState } = blogSlice.actions;

export default blogSlice.reducer;