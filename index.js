const redux = require('redux');
const createStore = redux.createStore;
//Create Actions Here
const BUY_CAKE = 'BUY_CAKE'
function buyCake() {
    return {
        type: BUY_CAKE,
        info: 'This action for buying Cake'
    }
}
// Define the reducer function here 
const intialState = {
    noOfCakes: 10
}
const reducer = ((state = intialState,action) => {
    switch(action.type) {
        case 'BUY_CAKE': return {
            ...state, // creating a deep copy of the previous object
            noOfCakes: state.noOfCakes - 1,
        }

        default: return state
    }
})

// now defining our store
const store = createStore(reducer);
// now we would call our different functions on the store
console.log('Intial State',store.getState());
const unsubscribe = store.subscribe(() => console.log('Updated State',store.getState()));

store.dispatch(buyCake()); // if we would haven't bind the action into a function then we have to pass the action object each time
store.dispatch(buyCake());
store.dispatch(buyCake());

unsubscribe();
// after unsubscrbing the subscribe would not be called 
store.dispatch(buyCake());
