import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className='container'>
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

const Header = () => {
  //const style = { color: "red", fontSize: "24px" };
  const style = {};
  return (
    <header className='header'>
      <h1 style={style}>Jay's Pizzeria</h1>
    </header>
  );
};

const Menu = () => {
  return (
    <main className='menu'>
      <h2>Today's menu</h2>
      <Pizza pizzaName='Focaccia' />
      <Pizza pizzaName='Focaccia' />
      <Pizza pizzaName='Focaccia' />
    </main>
  );
};

const Footer = () => {
  const hour = new Date().getHours();
  const openHour = 8;
  const closeHour = 20;
  const isOpen = hour >= openHour && hour < closeHour;
  return (
    <footer className='footer'>
      <p>{new Date().toLocaleString()}</p>
      <p>{isOpen ? "We are open" : "We are closed"}</p>
      <p>© 2023 Jay's Pizzeria</p>
    </footer>
  );
};

const Pizza = (props) => {
  return (
    <div>
      <img src='pizzas/focaccia.jpg' alt='Focaccia' />
      <h3>{props.pizzaName}</h3>
      <p>Bread with italian olive oil and rosemary</p>
    </div>
  );
};

//React v18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//React before 18
//React.render(<App />), document.getElementById("root"));
