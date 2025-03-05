import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";

// Thunk to fetch the current user
export const fetchCurrentUser = createAsyncThunk(
    "user/fetchCurrentUser",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await customFetch.get("/users/currentuser");
            // console.log("API Response:", data); // Debugging
            return data.user; // ✅ Ensure we're returning `data.user`
        } catch (error) {
            // console.error("Fetch user error:", error);
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
            toast.success("Logged out successfully");
            return null; // Reset user state
        } catch (error) {
            return rejectWithValue(error?.response?.data?.msg || "Logout failed");
        }
    }
);

// Redux Slice
const userSlice = createSlice({
    name: "user",
    initialState: {
        user: JSON.parse(localStorage.getItem("user")) || null, // ✅ Persist user state
        loading: false,
        error: null,
    },
    reducers: {
        logout(state) {
            state.user = null;
            localStorage.removeItem("user"); // ✅ Clear user on logout
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
                localStorage.setItem("user", JSON.stringify(action.payload)); // ✅ Store user in localStorage
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.user = null;
                // toast.error(action.payload);
            })

            // Logout cases
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                localStorage.removeItem("user");
                toast.success("Logged out successfully");
            })
            .addCase(logoutUser.rejected, (state, action) => {
                // toast.error(action.payload);
            });
    },
});


export default userSlice.reducer;
