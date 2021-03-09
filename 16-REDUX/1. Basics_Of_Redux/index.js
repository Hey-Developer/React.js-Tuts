const redux = require("redux");
const createStore = redux.createStore; //? predefined function to create Store
/* 
Here we will learn only redux..

$ Three Core principle of redux:
->1 Store
->2 Actions
->3 Reducers

On the basis of these 3 concept the whole concept of redux will be implemented..
The store acts a data center or we can say a central data center where a global state is stored of the application..
Any Component of the app who needs the data will subscribe to the store to get the data..
IF any component want to change the data then they have to call a action which gives the description fo the change
this action will go the reducer.. who guards the store.. the reducer are the one who can interact with the store
not that the global state inside the store is immutable that is we can change it..
Every time a action is called then reducer will give it a new State according to the change..

In terms of JS:
-> the store is Global Object
-> a action is object that describes the change
-> a reducer is pure function who returns the new state according to the change

Let us use a scenario of a cake shop
There is Cake shop
There is shopkeeper in the shop to interact with the customers
The cake shop shelf have all the cake it it..
Now your the consumer who go into the shop.. to buy a cake..

In this scenario, our cake Shop is Redux Store
 the shop keeper is the reducer
 consumer our the components
 and the action is the consumer task that is to buy the cake..
*/

//$ Let us Create action first,
//? A action is nothing but a javascript object..

const action = {
  type: "BUY_CAKE", // common approach to write description of the action
  text: "First Redux Action", // option payload of action to give further information of action
};

// Now to say that you want to buy a cake you will speak similarly component will say all its action using a function so lets us create a function which act as mouth of the component
const buyCake = () => {
  return action;
};

//$ Now let us create a ShopKeeper between shop and consumers i.e our Reducers Function.
// Normally what shop keeper do is he keep all the record of the cakes in his shope and each time a action comes or a consumer comers he will return new calculation for the remaining cakes.
// i.e our state in this store would be a object which contains noOfCakes as property..
// the shop keeper or our reducer will have this object known as initialState and also have action listeners that do the task according to the action and return a new state
// a reducer function will see like this: (prevState, action) => {newState}

//Our initialState (Global State)
const initState = {
  noOfCakes: 10,
};

//Reducer or ShopKeeper
const reducer = (prevState = initState, action) => {
  switch (action.type) {
    case "BUY_CAKE":
      return {
        ...prevState, // these will allow us to create a copy of our state by copying all the prev property and only adding the noOfCakes property
        noOfCakes: prevState.noOfCakes - 1,
      };
      break;
    default:
      return prevState;
      break;
  }
};

//$ Now its time to build shop for or our Redux Store.. which contains all the data as shop stores all the cakes..
// TO create a store we use Redux library a predefined method to initialize the store..
// for that first import redux..|^ see on the top of page

// The Store has a few responsibilities:
//--1: To hold the application state. (this is done by create our store and assigning the application state in it by passing the reducer function in it..)
const store = createStore(reducer);

//--2: Allow access to state via getState(). {Using this method we can access the current application state of our redux store}
console.log("Initial State", store.getState());

//--4: Register listeners via subscribe(listener) here we will attach our listener to the store using subscribe() so that each time the state changes our listener will execute..
// The subscribe method take a parameter which is a listener which calls each time when there is change in the state
const unsubscribe = store.subscribe(() => {
  console.log("Updated State", store.getState());
});

//--3: Allow state to be updated via Dispatch action:
// We don't need to call the reducer function manually we need just to say the action using this method store.dispatch() inside this we can either a pass our action object or pass a saying function..
// Now here component done his work he call the action to buy a cake now this internally go to reducer function where this action is passed
// And in the reducer function according to the action.type the new State has send to the store..
//As we register our listeners to the store, so now there is a change in the state i.e the new state which is returned by the reducer function to the store.
// store got that the new state and now it will fire our listeners because we have registered our listeners..
// inside our listeners we get the new state using getState() method..
// So thats how all it works..
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());

//--5: Unsubscribe from the store  by the calling the unsubscribe() method which is return by the store.subscribe()
unsubscribe();

// Now since we unsubscribe from store if we call any further action, then undoubtedly that action will do the same thing that is call the reducer and then return return the new state to the store..
// But this time we will not get notified..
store.dispatch(buyCake()); // you can see there is no notification..

// But u can check the updated state manually..
console.log("Manually check updated state", store.getState());
