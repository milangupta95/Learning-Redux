const redux = require('redux');
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();

//Create Actions Here
const BUY_CAKE = 'BUY_CAKE'
const BUY_ICE_CREAM = 'BUY_ICE_CREAM'
function buyCake() {
    return {
        type: BUY_CAKE,
        info: 'This action for buying Cake'
    }
}

function buyIceCream() {
    return {
        type: BUY_ICE_CREAM,
        info: 'This is for buying ICE-Cream'
    }
}
// Define the reducer function here 
const cakeIntialState = {
    noOfCakes: 10
}

const iceCreamIntialState = {
    noOfIceCream: 10
}

const cakeReducer = ((state = cakeIntialState,action) => {
    switch(action.type) {
        case 'BUY_CAKE': return {
            ...state, // creating a deep copy of the previous object
            noOfCakes: state.noOfCakes - 1,
        }

        default: return state
    }
})

const IceCreamReducer = ((state = iceCreamIntialState,action) => {
    switch(action.type) {
        case 'BUY_ICE_CREAM': return {
            ...state,
            noOfIceCream: state.noOfIceCream - 1
        }

        default: return state
    }
});

// Here we are combining two stores
const rootReducers = combineReducers({
    cake: cakeReducer,
    iceCream: IceCreamReducer
})
// now defining our store and applyMiddleWare 

const store = createStore(rootReducers,applyMiddleware(logger));
// now we would call our different functions on the store
console.log('Intial State',store.getState());
const unsubscribe = store.subscribe(() => console.log('Updated State',store.getState()));

store.dispatch(buyCake()); // if we would haven't bind the action into a function then we have to pass the action object each time
store.dispatch(buyCake());
store.dispatch(buyCake());

store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
unsubscribe();
// after unsubscrbing the subscribe would not be called 
