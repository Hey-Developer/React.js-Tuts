/* 
? What is React.createElement.
 React.createElement(type,props,children):
 -> It create a react element with given arguments.
 > type: Type of the html element or component (ex-h1,h2,p,button)
 > props: The properties of object (ex- {style:{color:"blue";}}) or className or event handlers etc.
 > children's: anything you need to pass between the dom elements.

 ? render().
  The render method is the only required methods in a class component. It examines this.props and this.state
  > It returns the react element made via (createElement) or (JSX).
  > To return multiple element from render method we use Arrays and Fragments as render() method alone cannot return multiple methods.
*/

class App extends React.Component {
  render() {
    return React.createElement("div", null, "Hello World");
  }
}

// Don;t be Surprised I know Hello World is not displaying on webpage bcoz there is one more step left- ReactDOM.render()-->
/* 
? ReactDOM.render(element,DOMnode)
  It takes a react component or element and render it to a dom node
  > The first element is which component or element needs to be render the dom.
  > The second arg is where to render in the dom.
*/

ReactDOM.render(
  // We can directly write here <App> but for this we need to use JSX and babel.
  React.createElement(App, null),
  document.querySelector("#react-container")
);

// For Nested Elements in Component:
class Content extends React.Component {
  render() {
    return React.createElement(
      "div",
      null,
      React.createElement("h1", null, "Hello React")
    );
  }
}

ReactDOM.render(
  React.createElement(Content, null),
  document.querySelector("#react-container-2")
);

// ->> To shorten the code: Instead of using React.createComponent method again and again we can make a variable of it and use it then like->
const e = React.createElement;

class App2 extends React.Component {
  render() {
    return e("div", null, e("h3", null, "Hello Cnu"));
  }
}

ReactDOM.render(e(App2, null), document.querySelector("#react-container-3"));
