import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../../services/urls";
import { deleteData, getData } from "../../../api/api";
import { toast } from "react-toastify";

// Thunk to fetch data
export const fetchUser = createAsyncThunk("fetchUser", async () => {
  return await getData(`${BASE_URL}/user/getAllUser`);
});

// Thunk to delete data
export const deleteUser = createAsyncThunk("deleteUser", async (id) => {
  try {
    await deleteData(`${BASE_URL}/user/delete/${id}`);
    toast.success("User Deleted");
    return id;
  } catch (Error) {
    toast.error(Error);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isError = true;
    });

    // Delete User
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.data = state.data.filter((user) => user.userId !== action.payload);
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      toast.error(action.payload);
    });
  },
});

export default userSlice.reducer;
