// userSlice.js - Fixed state management and token handling
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";

// Parse user from localStorage with error handling
const getUserFromStorage = () => {
    try {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    } catch (error) {
        localStorage.removeItem("user"); // Clean up invalid JSON
        return null;
    }
};

// Thunk to fetch the current user
export const fetchCurrentUser = createAsyncThunk(
    "user/fetchCurrentUser",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await customFetch.get("/users/currentuser");
            return data.user;

        } catch (error) {
            return rejectWithValue(error?.response?.data?.msg || "Failed to fetch user");
        }
    }
);

// Thunk to handle logout
export const logoutUser = createAsyncThunk(
    "user/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            await customFetch.get("/auth/logout");
            localStorage.removeItem("user");
            return null;
        } catch (error) {
            // Still remove the user from localStorage even if the API call fails
            localStorage.removeItem("user");
            return rejectWithValue(error?.response?.data?.msg || "Logout failed");
        }
    }
);

// Redux Slice
const userSlice = createSlice({
    name: "user",
    initialState: {
        user: getUserFromStorage(),
        loading: false,
        error: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            if (action.payload) {
                localStorage.setItem("user", JSON.stringify(action.payload));
            }
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("user");
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch user cases
            .addCase(fetchCurrentUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                // Only store in localStorage if we have meaningful data
                if (action.payload) {
                    localStorage.setItem("user", JSON.stringify(action.payload));
                }
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.user = null;
            })

            // Logout cases
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.error = null;
                toast.success("Logged out successfully");
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null; // Still clear the user even if API call fails
                state.error = action.payload;
                toast.error(action.payload || "Error during logout");
            });
    },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;