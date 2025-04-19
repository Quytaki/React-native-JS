// src/redux/notesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { database } from '../services/firebase';
import {
  ref,
  push,
  update,
  remove,
  onValue,
} from 'firebase/database';

// Lấy danh sách ghi chú
export const fetchNotes = createAsyncThunk(
  'notes/fetchAll',
  async (_, { getState, rejectWithValue }) => {
    try {
      const uid = getState().auth.user.uid;
      const snap = await new Promise((res, rej) => {
        onValue(ref(database, `notes/${uid}`), (s) => res(s), (e) => rej(e), {
          onlyOnce: true,
        });
      });
      const data = snap.val() || {};
      return Object.keys(data).map((key) => ({ id: key, ...data[key] }));
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Thêm ghi chú
export const addNote = createAsyncThunk(
  'notes/add',
  async ({ title, content, imageUrl }, { getState, rejectWithValue }) => {
    try {
      const uid = getState().auth.user.uid;
      const newRef = await push(ref(database, `notes/${uid}`), {
        title,
        content,
        imageUrl,
        createdAt: Date.now(),
      });
      return { id: newRef.key, title, content, imageUrl };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Cập nhật ghi chú
export const updateNote = createAsyncThunk(
  'notes/update',
  async ({ id, updates }, { getState, rejectWithValue }) => {
    try {
      const uid = getState().auth.user.uid;
      await update(ref(database, `notes/${uid}/${id}`), updates);
      return { id, updates };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Xóa ghi chú
export const deleteNote = createAsyncThunk(
  'notes/delete',
  async (id, { getState, rejectWithValue }) => {
    try {
      const uid = getState().auth.user.uid;
      await remove(ref(database, `notes/${uid}/${id}`));
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const notesSlice = createSlice({
  name: 'notes',
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (b) => {
    b
      .addCase(fetchNotes.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchNotes.fulfilled, (s, a) => { s.loading = false; s.list = a.payload; })
      .addCase(fetchNotes.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
      .addCase(addNote.fulfilled, (s, a) => { s.list.push(a.payload); })
      .addCase(updateNote.fulfilled, (s, a) => {
        const idx = s.list.findIndex((n) => n.id === a.payload.id);
        if (idx !== -1) s.list[idx] = { ...s.list[idx], ...a.payload.updates };
      })
      .addCase(deleteNote.fulfilled, (s, a) => {
        s.list = s.list.filter((n) => n.id !== a.payload);
      });
  },
});

export default notesSlice.reducer;