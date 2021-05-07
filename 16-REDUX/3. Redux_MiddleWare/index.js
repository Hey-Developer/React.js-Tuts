/* 
Redux itself is synchronous, so how the async operations like network request work with Redux? Here middlewares come handy
$ Redux MiddleWare:  It provides a third-party extension point between dispatching an action, and the moment it reaches the reducer.
 As discussed earlier, reducers are the place where all the execution logic is written. 
 Reducer has nothing to do with who performs it, how much time it is taking or logging the state of the app before and after the action is dispatched.
 In this case, Redux middleware function provides a medium to interact with dispatched action before they reach the reducer.

 --> So we can say that a middleWare is  a function that fires just before the our action reaches the reducer.
 Customized middleware functions can be created by writing high order functions (a function that returns another function), which wraps around some logic.
 Multiple middlewares can be combined together to add new functionality, 
 and each middleware requires no knowledge of what came before and after. 
 You can imagine middlewares somewhere between action dispatched and reducer.

 -> How to use this middleware..
    Commonly, middlewares are used to deal with asynchronous actions in your app. 
$ Redux provides with API called applyMiddleware which allows us to use custom middleware as well as Redux middlewares like redux-thunk and redux-promise.
 It applies middlewares to store. The syntax of using applyMiddleware API is −
 -- applyMiddleware(...middleware)
 we can provide more than one middleware..
 A custom one or a preDefined one..

 ? A middleware can be used for  logging, crash reporting, talking to an asynchronous API, routing, and more.

 Let us see a example of Logging

 So basically logging means to track every activity of our reDux code.. i.e from dispatching an action to getting a new state from the reducer and to pass that new state to the store..

 A most popular logger is "redux-logger"
 we can download it using npm 
 > npm i --save redux-logger
 todo https://www.npmjs.com/package/redux-logger

*/

const redux = require("redux");
const reduxLogger = require("redux-logger"); // for creating a logging object

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
// Let's extend redux with additional functionality..
const logger = reduxLogger.createLogger();
// to use this logger with the middle ware we use applyMiddleware() api of redux module..
const applyMiddleware = redux.applyMiddleware;

const actionBuyCake = {
  type: "BUY_CAKE",
  text: "First Redux Action",
};
const actionBuyIceCream = {
  type: "BUY_ICECREAM",
  text: "Second Redux Action",
};

const buyCake = () => {
  return actionBuyCake;
};
const buyIcecream = () => {
  return actionBuyIceCream;
};

const initCakesState = {
  noOfCakes: 10,
};
const initIceCreamsState = {
  noOfIceCreams: 10,
};

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

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: IceCreamReducer,
});

// To use the middleware we provide that middleware in the store using the applyMiddleware method
// here we will pass logger as a middle ware because we are now using middleware for logging using redux-logger
const store = createStore(rootReducer, applyMiddleware(logger));

console.log("Initial State", store.getState());

const unsubscribe = store.subscribe(() => {
  // console.log("Updated State", store.getState()); //? Now we don't need to console.log("") this because the logger will give us every information about the activities
});

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIcecream());
store.dispatch(buyIcecream());
unsubscribe();
