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

// Async thunk for fetching the reminders
export const fetchSingleUserReminders = createAsyncThunk(
    'reminders/fetchSingleUserReminders',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await customFetch.get(`reminders/user`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you're using token-based auth
                },
            });
            return response.data.reminders;

        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const fetchUserReminders = createAsyncThunk(
    'reminders/fetchUserReminders',
    async (_, { rejectWithValue }) => {
        try {
            const response = await customFetch.get('/reminders');

            // Fetch user details for each reminder
            const remindersWithUsers = await Promise.all(
                response.data.reminders.map(async (reminder) => {
                    try {
                        if (!reminder.user) {
                            console.warn('No user ID found for reminder:', reminder._id);
                            return {
                                ...reminder,
                                userDetails: {
                                    email: 'No email',
                                    fullName: 'Unknown User'
                                }
                            };
                        }

                        // Use the getUser endpoint to fetch user details
                        const userResponse = await customFetch.get(`/users/${reminder.user}`);
                        if (!userResponse.data || !userResponse.data.user) {
                            throw new Error('Invalid user data received');
                        }

                        return {
                            ...reminder,
                            userDetails: {
                                email: userResponse.data.user.email,
                                fullName: userResponse.data.user.name || userResponse.data.user.fullName
                            }
                        };
                    } catch (error) {
                        console.error(`Error fetching user details for reminder ${reminder._id}:`, error);
                        return {
                            ...reminder,
                            userDetails: {
                                email: 'No email',
                                fullName: 'Unknown User'
                            }
                        };
                    }
                })
            );

            return { reminders: remindersWithUsers };
        } catch (error) {
            console.error('Error fetching reminders:', error);
            return rejectWithValue(error.response?.data || { message: 'Failed to fetch reminders' });
        }
    }
);

export const updateReminder = createAsyncThunk(
    'reminders/updateReminder',
    async ({ id, reminderData }, { rejectWithValue }) => {
        try {
            const response = await customFetch.patch(`/reminders/${id}`, reminderData);
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
            await customFetch.delete(`/reminders/${id}`);
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
            const response = await customFetch.post(`reminders/send-push/${id}`);
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
            const response = await customFetch.post('/reminders/subscribe', subscriptionData);
            return response.data;
        } catch (error) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);

export const syncWithCalendar = createAsyncThunk(
    'reminders/syncWithCalendar',
    async (id, { rejectWithValue }) => {
        try {
            const response = await customFetch.post(`/reminders/calendar-sync/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const checkCalendarAuthStatus = createAsyncThunk(
    'reminders/checkCalendarAuthStatus',
    async (_, { rejectWithValue }) => {
        try {
            const response = await customFetch.get('/users/current-user');
            return response.data.user.googleCalendarSyncEnabled;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const revokeCalendarAccess = createAsyncThunk(
    'reminders/revokeCalendarAccess',
    async (_, { rejectWithValue }) => {
        try {
            await customFetch.post('/api/auth/google/revoke');
            return true;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// Initial State
const initialState = {
    reminders: [],
    currentReminder: null,
    isLoading: false,
    error: null,
    pushSubscription: null,
    calendarAuthStatus: {
        isAuthorized: false,
        isChecking: true,
        error: null
    }
};

// Create Slice
const reminderSlice = createSlice({
    name: 'reminders',
    initialState,
    reducers: {
        // Any synchronous reducers can be added here
        clearCurrentReminder: (state) => {
            state.currentReminder = null;
        },
        clearCalendarError: (state) => {
            state.calendarAuthStatus.error = null;
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

        // Fetch Single User Reminders
        builder
            .addCase(fetchSingleUserReminders.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchSingleUserReminders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reminders = action.payload.map((reminder) => ({
                    ...reminder,
                    time: reminder.reminderTime, // alias it as `time`
                }));
            })
            .addCase(fetchSingleUserReminders.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });        // Fetch User Reminders
        builder.addCase(fetchUserReminders.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchUserReminders.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            // Ensure we're getting an array and properly format the data
            if (action.payload?.reminders && Array.isArray(action.payload.reminders)) {
                state.reminders = action.payload.reminders;
            } else {
                console.error('Invalid reminders data structure:', action.payload);
                state.reminders = [];
            }
        });
        builder.addCase(fetchUserReminders.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.message || 'Failed to fetch reminders';
            state.reminders = []; // Reset to empty array on error
            console.error('Failed to fetch reminders:', action.payload);
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
            state.pushSubscription = action.payload.subscription; // Store only the subscription object
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
            // Update reminder with calendar event details if needed
            if (state.currentReminder?._id === action.payload.reminder._id) {
                state.currentReminder = action.payload.reminder;
            }
            const index = state.reminders.findIndex(r => r._id === action.payload.reminder._id);
            if (index !== -1) {
                state.reminders[index] = action.payload.reminder;
            }
        });
        builder.addCase(syncWithCalendar.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        // Check Calendar Auth Status
        builder
            .addCase(checkCalendarAuthStatus.pending, (state) => {
                state.calendarAuthStatus.isChecking = true;
                state.calendarAuthStatus.error = null;
            })
            .addCase(checkCalendarAuthStatus.fulfilled, (state, action) => {
                state.calendarAuthStatus.isChecking = false;
                state.calendarAuthStatus.isAuthorized = action.payload;
            })
            .addCase(checkCalendarAuthStatus.rejected, (state, action) => {
                state.calendarAuthStatus.isChecking = false;
                state.calendarAuthStatus.error = action.payload;
            });

        // Revoke Calendar Access
        builder
            .addCase(revokeCalendarAccess.pending, (state) => {
                state.calendarAuthStatus.isChecking = true;
                state.calendarAuthStatus.error = null;
            })
            .addCase(revokeCalendarAccess.fulfilled, (state) => {
                state.calendarAuthStatus.isChecking = false;
                state.calendarAuthStatus.isAuthorized = false;
            })
            .addCase(revokeCalendarAccess.rejected, (state, action) => {
                state.calendarAuthStatus.isChecking = false;
                state.calendarAuthStatus.error = action.payload;
            });
    }
});

// Export actions and reducer
export const { clearCurrentReminder, clearCalendarError } = reminderSlice.actions;
export default reminderSlice.reducer;