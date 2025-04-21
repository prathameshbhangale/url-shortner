import { createSlice } from '@reduxjs/toolkit';

// [{
//     id: 4,
//     originalUrl: "https://apna.com",
//     shortUrl: "Tfjwg89K",
//     clickCount: 0,
//     createdDate: "2025-04-16T14:41:06.103494",
//     username: "SAi",
//     name: "testing",
// }]

const initialState = {
    urls:[]
  };


const urlsSlice = createSlice({
    name: 'urls',
    initialState,
    reducers: {
        setUrls:(state,action)=>{
            state.urls=action.payload;
        }
    },
});

export const { setUrls } = urlsSlice.actions;
const urlsReducer = urlsSlice.reducer;
export default urlsReducer;
