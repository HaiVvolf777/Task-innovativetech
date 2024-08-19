import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import newRequest from "../utils/newRequest";


export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async ({ page, limit }) => {
      const response = await newRequest.get(`/users?page=${page}&limit=${limit}`);
      return response.data;
    }
  );
  

export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData) => {
    const response = await newRequest.post("/users", userData);
    return response.data;
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, updates }) => {
    const response = await newRequest.patch(`/users/${id}`, updates);
    return response.data;
  }
);

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  await newRequest.delete(`/users/${id}`);
  return id;
});

// User slice
const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    formData: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      age: "",
      gender: "",
    },
    status: "idle",
    error: null,
  },
  reducers: {
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetFormData: (state) => {
      state.formData = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        age: "",
        gender: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.status = "succeeded";
        state.formData = {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          age: "",
          gender: "",
        }; 
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user._id === action.payload._id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      });
  },
});

export const { updateFormData, resetFormData } = userSlice.actions;
export default userSlice.reducer;
