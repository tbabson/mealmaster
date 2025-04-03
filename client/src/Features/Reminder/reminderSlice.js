import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import customFetch from '../../utils/customFetch';
import { toast } from 'react-toastify';

// Async Thunks for API Calls
export const createReminder = createAsyncThunk(
    'reminders/createReminder',
    async (reminderData, thunkAPI) => {
        try {
            const response = await customFetch.post('/reminders', reminderData);
            return response.data;
        } catch (error) {
            // Properly handle and return errors
            const message =
                error.response?.data?.message ||
                error.message ||
                'Failed to create reminder';

            return thunkAPI.rejectWithValue({ message });
        }
    }
);

export const fetchUserReminders = createAsyncThunk(
    'reminders/fetchUserReminders',
    async (_, { rejectWithValue }) => {
        try {
            const response = await customFetch.get('/reminders');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateReminder = createAsyncThunk(
    'reminders/updateReminder',
    async ({ id, reminderData }, { rejectWithValue }) => {
        try {
            const response = await customFetch.patch(`/api/reminders/${id}`, reminderData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteReminder = createAsyncThunk(
    'reminders/deleteReminder',
    async (id, { rejectWithValue }) => {
        try {
            await customFetch.delete(`/api/reminders/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const sendPushNotification = createAsyncThunk(
    'reminders/sendPushNotification',
    async (id, { rejectWithValue }) => {
        try {
            const response = await customFetch.post(`/api/reminders/send-push/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const subscribeToPushNotifications = createAsyncThunk(
    'reminders/subscribeToPushNotifications',
    async (subscriptionData, { rejectWithValue }) => {
        try {
            const response = await customFetch.post('/api/reminders/subscribe', subscriptionData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const syncWithCalendar = createAsyncThunk(
    'reminders/syncWithCalendar',
    async (id, { rejectWithValue }) => {
        try {
            const response = await customFetch.post(`/api/reminders/calendar-sync/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Initial State
const initialState = {
    reminders: [],
    currentReminder: null,
    isLoading: false,
    error: null,
    pushSubscription: null
};

// Create Slice
const reminderSlice = createSlice({
    name: 'reminders',
    initialState,
    reducers: {
        // Any synchronous reducers can be added here
        clearCurrentReminder: (state) => {
            state.currentReminder = null;
        }
    },
    extraReducers: (builder) => {
        // Create Reminder
        builder.addCase(createReminder.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(createReminder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.reminders.push(action.payload);
            state.currentReminder = action.payload;
        });
        builder.addCase(createReminder.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        // Fetch User Reminders
        builder.addCase(fetchUserReminders.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchUserReminders.fulfilled, (state, action) => {
            state.isLoading = false;
            state.reminders = action.payload;
        });
        builder.addCase(fetchUserReminders.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        // Update Reminder
        builder.addCase(updateReminder.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(updateReminder.fulfilled, (state, action) => {
            state.isLoading = false;
            const index = state.reminders.findIndex(
                (reminder) => reminder._id === action.payload._id
            );
            if (index !== -1) {
                state.reminders[index] = action.payload;
            }
            state.currentReminder = action.payload;
        });
        builder.addCase(updateReminder.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        // Delete Reminder
        builder.addCase(deleteReminder.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(deleteReminder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.reminders = state.reminders.filter(
                (reminder) => reminder._id !== action.payload
            );
            state.currentReminder = null;
        });
        builder.addCase(deleteReminder.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        // Push Notification Subscription
        builder.addCase(subscribeToPushNotifications.fulfilled, (state, action) => {
            state.pushSubscription = action.payload;
        });

        // Send Push Notification
        builder.addCase(sendPushNotification.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(sendPushNotification.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(sendPushNotification.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        // Calendar Sync
        builder.addCase(syncWithCalendar.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(syncWithCalendar.fulfilled, (state, action) => {
            state.isLoading = false;
            // Optionally update the reminder with calendar sync details
            const index = state.reminders.findIndex(
                (reminder) => reminder._id === action.payload._id
            );
            if (index !== -1) {
                state.reminders[index] = action.payload;
            }
        });
        builder.addCase(syncWithCalendar.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    }
});

// Export actions and reducer
export const { clearCurrentReminder } = reminderSlice.actions;
export default reminderSlice.reducer;