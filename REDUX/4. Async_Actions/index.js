const redux = require("redux");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");

/* 
We are creating a App in which we fetch a list of users from an API End point nad stores it in the redux store..
 our 
 ? State= {
    loading: true,
    data: [], // an array of object each object represents a user
    error: '', any error from the API
 }
 >loading: displays a loading spinner in our component.
 >data: list of users
 >error: displays error message to user.

 ? Actions: 
  FETCH_USERS_REQUEST- fetch list of users..
  FETCH_USERS_SUCCESS- fetched successfully
  FETCH_USERS_FAILURE- Error fetching the data

 ? Reducers:
 case: FETCH_USERS_REQUEST
 loading: true

 case: FETCH_USERS_SUCCESS
 loading: false,
 data: user (from API)

 case: FETCH_USERS_FAILURE
 loading: false,
 error: error (from API)
*/

//$ LEt;s code

//Application State:
const initialState = {
  loading: false,
  users: [],
  error: "",
};

//Actions:
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

//Actions Creators:
const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payLoad: users,
  };
};

const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payLoad: error,
  };
};

//Reducers Functions
const reducers = (prevState = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...prevState,
        loading: true,
      };
      break;

    case FETCH_USERS_SUCCESS:
      return {
        ...prevState,
        loading: false,
        data: action.payLoad,
      };
      break;

    case FETCH_USERS_FAILURE:
      return {
        ...prevState,
        loading: false,
        data: [],
        error: action.payLoad,
      };
    default:
      return prevState;
      break;
  }
};

//Redux Store
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

/* 
Now we have to do is a fetch call for that we will be require axios and the most important redux-thunk
$ redux-thunk is middleware for handling the async actions in-between the actions and the reducers
-- Redux Thunk middleware allows you to write action creators that return a function instead of an action. 
We know that the action creators return only actions but thunk Middleware allow us to return a function..using the action creator
these function inside it can perform the async call as it is not mandatory to be a pure function
-- The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. 
-- The inner function receives the store methods dispatch and getState as parameters.

 Now since redux thunk is a middle ware we need to use applyMiddleware() from the redux module so lets import it..
 */
//$ NOW let us define the async actions creator,
const fetchUsers = () => {
  return function (dispatch) {
    // here we will be start our fetch user request so we have to call FETCH_USERS_REQUEST action here
    dispatch(fetchUsersRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        // response.data is an array of the users
        const users = response.data.map((user) => user.id);
        // now since we get our result from the API we have to call FETCH_USERS_SUCCESS action
        dispatch(fetchUsersSuccess(users));
      })
      .catch((error) => {
        //error.message will give the error
        dispatch(fetchUsersFailure(error.message));
      });
  };
};

//our async action creator function is ready..

const unsubscribe = store.subscribe(() => {
  console.log("Update States:", store.getState());
});

// Now let's dispatch action..
store.dispatch(fetchUsers());
