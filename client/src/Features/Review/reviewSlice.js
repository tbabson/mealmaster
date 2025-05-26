import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import customFetch from '../../utils/customFetch';
import { toast } from 'react-toastify';

const initialState = {
    reviews: [],
    isLoading: false,
    totalReviews: 0,
    numOfPages: 1,
    singleReview: null,
    mealReviews: [],
    error: null,
    page: 1,
    search: '',
    rating: 'all',
    sort: 'latest'
};

// Create Review
export const createReview = createAsyncThunk(
    'review/createReview',
    async (reviewData, thunkAPI) => {
        try {
            const response = await customFetch.post('/reviews', reviewData);
            toast.success('Review submitted successfully');
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.msg || 'Something went wrong');
            return thunkAPI.rejectWithValue(error?.response?.data?.msg);
        }
    }
);

// Get All Reviews
export const getAllReviews = createAsyncThunk(
    'review/getAllReviews',
    async ({ search, rating, sort, page }, thunkAPI) => {
        try {
            let url = `/reviews?page=${page}`;
            if (search) {
                url += `&search=${search}`;
            }
            if (rating && rating !== 'all') {
                url += `&rating=${rating}`;
            }
            if (sort) {
                url += `&sort=${sort}`;
            }
            const response = await customFetch.get(url);

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.msg || 'Error fetching reviews');
        }
    }
);

// Get Single Review
export const getSingleReview = createAsyncThunk(
    'review/getSingleReview',
    async (reviewId, thunkAPI) => {
        try {
            const response = await customFetch.get(`/reviews/${reviewId}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.msg);
        }
    }
);

// Update Review
export const updateReview = createAsyncThunk(
    'review/updateReview',
    async ({ reviewId, reviewData }, thunkAPI) => {
        try {
            const response = await customFetch.patch(`/reviews/${reviewId}`, reviewData);
            toast.success('Review updated successfully');
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.msg || 'Something went wrong');
            return thunkAPI.rejectWithValue(error?.response?.data?.msg);
        }
    }
);

// Delete Review
export const deleteReview = createAsyncThunk(
    'review/deleteReview',
    async (reviewId, thunkAPI) => {
        try {
            const response = await customFetch.delete(`/reviews/${reviewId}`);
            toast.success('Review deleted successfully');
            return { reviewId, message: response.data.msg };
        } catch (error) {
            toast.error(error?.response?.data?.msg || 'Something went wrong');
            return thunkAPI.rejectWithValue(error?.response?.data?.msg);
        }
    }
);

// Get Meal Reviews
export const getMealReviews = createAsyncThunk(
    'review/getMealReviews',
    async (mealId, thunkAPI) => {
        try {
            const response = await customFetch.get(`/meals/${mealId}/reviews`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.msg);
        }
    }
);

const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        clearReviewState: (state) => {
            state.reviews = [];
            state.isLoading = false;
            state.error = null;
            state.singleReview = null;
            state.mealReviews = [];
        },
    }, extraReducers: (builder) => {
        builder
            // Get All Reviews
            .addCase(getAllReviews.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllReviews.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.reviews = payload.reviews;
                state.totalReviews = payload.count;
                state.numOfPages = Math.ceil(payload.count / 10); // Assuming 10 reviews per page
                state.error = null;
            })
            .addCase(getAllReviews.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
                state.reviews = [];
            })
            // Create Review
            .addCase(createReview.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createReview.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.reviews = [...state.reviews, payload.review];
                state.totalReviews += 1;
                state.numOfPages = Math.ceil((state.totalReviews) / 10);
                state.error = null;
                toast.success('Review created successfully');
            })
            .addCase(createReview.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            // Get Single Review
            .addCase(getSingleReview.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSingleReview.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.singleReview = payload.review;
                state.error = null;
            })
            .addCase(getSingleReview.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            // Update Review
            .addCase(updateReview.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateReview.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.reviews = state.reviews.map(review =>
                    review._id === payload.review._id ? payload.review : review
                );
                state.singleReview = payload.review;
                state.error = null;
            })
            .addCase(updateReview.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            // Delete Review
            .addCase(deleteReview.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteReview.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.reviews = state.reviews.filter(review => review._id !== payload.reviewId);
                state.error = null;
            })
            .addCase(deleteReview.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            // Get Meal Reviews
            .addCase(getMealReviews.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMealReviews.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.mealReviews = payload.reviews;
                state.error = null;
            })
            .addCase(getMealReviews.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            });
    },
});

export const { clearReviewState } = reviewSlice.actions;
export default reviewSlice.reducer;