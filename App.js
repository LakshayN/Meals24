import React from "react";
import ReactDOM from "react-dom";

// <div id="parent">
//     <div id="child">
//         <h1>im h1 tag</h1>
//         <h2>im h2 tag</h2>
//     </div>

//     <div id="child2">
//         <h1>im h1 tag</h1>
//         <h2>im h2 tag</h2>
//     </div>
// </div>

const parent = React.createElement("div", { id: "parent" }, [
  React.createElement("div", { id: "child1" }, [
    React.createElement("h1", {}, "I'm h1 tag"),
    React.createElement("h2", {}, "im h2 tag"),
  ]),
  React.createElement("div", { id: "child2" }, [
    React.createElement("h1", {}, "I'm h1 tag"),
    React.createElement("h2", {}, "im h2 tag"),
  ]),
]);

//react element is an object
console.log(parent);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(parent); //replaces the root html, does not add it below

//we can inject react using cdn and can use it in small section of the page
