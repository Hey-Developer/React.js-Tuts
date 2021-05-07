const redux = require("redux");
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
/* 
$ Shop and IceCreams
Now Since our business is growing so we decide to start selling ice-cream in our shop..
to sell both ice-cream and cakes we first have only one shop keeper but than we realize its to complicated for once person to handle all the task alone..
thats why we decide to have two shopKeepers, means two reducer..

Note: If u want to do all this with one reducer then u have to -->just have added one more property in application state. i.e noOfIceCreams
*/

// Now we have two action so-->
const actionBuyCake = {
  type: "BUY_CAKE",
  text: "First Redux Action",
};
const actionBuyIceCream = {
  type: "BUY_ICECREAM",
  text: "First Redux Action",
};

// Two action speaker-->
const buyCake = () => {
  return actionBuyCake;
};
const buyIcecream = () => {
  return actionBuyIceCream;
};

/* 
$ Approach of one Reducer to handle multiple actions
--> Our initialState (Application State) // adding a new property in it..
const initState = {
  noOfCakes: 10,
  noOfIceCreams: 20,
};
--> Reducer or ShopKeeper: One shopKeepers handling both the actions..
const reducer = (prevState = initState, action) => {
  switch (action.type) {
    case "BUY_CAKE":
      return {
        ...prevState,
        noOfCakes: prevState.noOfCakes - 1,
      };
      break;

    case "BUY_ICECREAM":
      return {
        ...prevState,
        noOfIceCreams: prevState.noOfIceCreams - 1,
      };

    default:
      return prevState;
      break;
  }
};

* Now as u can see that this approach also work fines..But this approach sucks when u have  lots of action and then the code becomes two messy to handle also, it becomes more complicated to debug..
So lets create multiple reducer functions for that first create multiple states for each..i.e
 */
const initCakesState = {
  noOfCakes: 10,
};
const initIceCreamsState = {
  noOfIceCreams: 10,
};

// now lets create two reducers function for each or two shopKeepers..>>
const cakeReducer = (prevState = initCakesState, action) => {
  switch (action.type) {
    case "BUY_CAKE":
      return {
        ...prevState,
        noOfCakes: prevState.noOfCakes - 1,
      };
      break;
    default:
      return prevState;
      break;
  }
};

const IceCreamReducer = (prevState = initIceCreamsState, action) => {
  switch (action.type) {
    case "BUY_ICECREAM":
      return {
        ...prevState,
        noOfIceCreams: prevState.noOfIceCreams - 1,
      };
      break;
    default:
      return prevState;
      break;
  }
};

// Now we since we create multiple reducers, let us see how to combine them:
//? for that u have to use a pre defined method from the redux library which is combineReducers (import it from the redux module)
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: IceCreamReducer,
});

// Now this rootReducer will pass in the store
const store = createStore(rootReducer);

console.log("Initial State", store.getState());

const unsubscribe = store.subscribe(() => {
  console.log("Updated State", store.getState());
});

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIcecream());
store.dispatch(buyIcecream());
// When we dispatch an action both reducers receive that action the difference is that one of its ignores it and the other one act on it
unsubscribe();
