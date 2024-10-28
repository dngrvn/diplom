import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

// Создание поста
export const createPost = createAsyncThunk('post/createPost', async (params, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/posts', params)
            return data
        } catch (error) {
            console.error(error);
            return rejectWithValue({
                message: error.response?.data?.message || 'Возникла ошибка при создании поста',
            });
        }
    });

    // Получение всех постов
export const getAllPosts = createAsyncThunk('post/getAllPosts', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get('/posts')
        return data
    } catch (error) {
        console.error(error);
        return rejectWithValue({
            message: error.response?.data?.message || 'Неизвестная ошибка',
        });
    }
})

// Удаление поста
export const removePost = createAsyncThunk('post/removePost', async (id, { rejectWithValue }) => {
    try {
        const { data } = await axios.delete(`/posts/${id}`, id)
        return data
    } catch (error) {
        console.error(error);
        return rejectWithValue({
            message: error.response?.data?.message || 'Неизвестная ошибка',
        });
    }
})

// Обновление поста
export const updatePost = createAsyncThunk('post/updatePost', async (updatedPost, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(
                `/posts/${updatedPost.id}`,
                updatedPost,
            )
            return data
        } catch (error) {
            console.error(error);
            return rejectWithValue({
                message: error.response?.data?.message || 'Неизвестная ошибка',
            });
        }
    })

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        popularPosts: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        // Создание поста
        builder
            .addCase(createPost.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createPost.fulfilled, (state, action) => {
                console.log("Пост добавлен", action.payload)
                state.loading = false
                state.posts.push(action.payload)
            })
            .addCase(createPost.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
            })
        // Получаение всех постов
        builder
            .addCase(getAllPosts.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.loading = false
                state.posts = action.payload.posts
                state.popularPosts = action.payload.popularPosts
            })
            .addCase(getAllPosts.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
            })
        // Удаление поста
        builder
            .addCase(removePost.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(removePost.fulfilled, (state, action) => {
                state.loading = false
                state.posts = state.posts.filter(
                    (post) => post._id !== action.payload
                )
            })
            .addCase(removePost.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
            })
        // Обновление поста
        builder
            .addCase(updatePost.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.loading = false
                const index = state.posts.findIndex(
                    (post) => post._id === action.payload._id)
                if (index !== -1) {
                    state.posts[index] = action.payload
                }
            })
            .addCase(updatePost.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
            })
    },
})

export default postSlice.reducer