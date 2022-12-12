const redux = require('redux');
const createStore = redux.createStore;
const applyMiddleWare = redux.applyMiddleware;
const axios = require('axios');
const thunkMiddleWare = require('redux-thunk').default;

const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

const fetchReq = () => {
    return {
        type: FETCH_USER_REQUEST,
        payload: 'Action for fetching the data'
    }    
}

const fetchSuccess = (user) => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: user
    }
}

const fetchFailure = (error) => {
    return {
        type: FETCH_USER_FAILURE,
        payload: error
    }
}

const intialState = {
    loading: false,
    data: [],
    error: ''
}

const reducer = (state = intialState,action) => {
    switch(action.type) {
        case 'FETCH_USER_REQUEST': return {
            ...state,
            loading:true,
            data: action.payload
        }
        case 'FETCH_USER_SUCCESS': return {
            loading: false,
            data: action.payload,
            error: ''
        }
        case 'FETCH_USER_FAILURE': return {
            laoding: false,
            data: [],
            error: action.payload
        }
    }
}
const fetchUsers = () => {
    return function(dispatch) {
        dispatch(fetchReq());
        axios.get("https://jsonplaceholder.typicode.com/users", { 
            headers: { "Accept-Encoding": "gzip,deflate,compress" } 
        }).then(res => {
            const users = res.data;
            dispatch(fetchSuccess(users));
        }).catch(error => {
            dispatch(fetchFailure(error.message));
        })
    }
}
const store = createStore(reducer,applyMiddleWare(thunkMiddleWare));
const unsub = store.subscribe(() => {
    console.log(store.getState());
})
store.dispatch(fetchUsers());

