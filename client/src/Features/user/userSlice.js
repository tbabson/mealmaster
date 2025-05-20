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
            const { data } = await customFetch.get("/users/current-user");
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

// Thunk to get all users
export const getAllUsers = createAsyncThunk(
    "user/getAllUsers",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await customFetch.get("/users");
            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Failed to fetch users");
        }
    }
);

// Thunk to get single user
export const getUser = createAsyncThunk(
    "user/getUser",
    async (userId, { rejectWithValue }) => {
        try {
            const { data } = await customFetch.get(`/users/${userId}`);

            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Failed to fetch user");
        }
    }
);

// Thunk to update user
export const updateUser = createAsyncThunk(
    "user/updateUser",
    async ({ userData, image }, { rejectWithValue }) => {
        try {
            let formData;
            if (image) {
                formData = new FormData();
                // Add all user data to formData
                Object.keys(userData).forEach(key => {
                    formData.append(key, userData[key]);
                });
                formData.append('profileImage', image);
            }

            const { data } = await customFetch.patch(
                "/users/update-user",
                formData || userData,
                formData ? {
                    headers: { 'Content-Type': 'multipart/form-data' }
                } : {}
            );
            return data.user;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Failed to update user");
        }
    }
);

// Thunk to delete user
export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (userId, { rejectWithValue }) => {
        try {
            const { data } = await customFetch.delete(`/users/${userId}`);
            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Failed to delete user");
        }
    }
);

// Thunk to change password
export const changePassword = createAsyncThunk(
    "user/changePassword",
    async ({ oldPassword, newPassword }, { rejectWithValue }) => {
        try {
            const { data } = await customFetch.patch("/users/update-password", {
                oldPassword,
                newPassword,
            });
            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.msg || "Failed to change password");
        }
    }
);

// Redux Slice
const userSlice = createSlice({
    name: "user",
    initialState: {
        user: getUserFromStorage(),
        users: [],
        selectedUser: null,
        totalUsers: 0,
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
            })

            // Get all users cases
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.users;
                state.totalUsers = action.payload.count;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })

            // Get single user cases
            .addCase(getUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedUser = action.payload.user;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })

            // Update user cases
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                if (state.user?._id === action.payload._id) {
                    state.user = action.payload;
                    localStorage.setItem("user", JSON.stringify(action.payload));
                }
                toast.success("Profile updated successfully");
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })

            // Delete user cases
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter(user => user._id !== action.payload.user._id);
                state.totalUsers--;
                toast.success("User deleted successfully");
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })

            // Change password cases
            .addCase(changePassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.loading = false;
                toast.success("Password updated successfully");
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            });
    },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;