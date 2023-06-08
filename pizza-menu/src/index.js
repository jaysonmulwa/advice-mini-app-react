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
      {pizzaData.length > 0 ? (
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our stone oven, all organic, all delicious.
          </p>

          <ul className='pizzas'>
            {pizzaData.map((pizza) => {
              return (
                <Pizza
                  key={pizza.name}
                  pizzaName={pizza.name}
                  pizzaIngredients={pizza.ingredients}
                  pizzaImg={pizza.photoName}
                  price={pizza.price}
                  soldOut={pizza.soldOut}
                />
              );
            })}
          </ul>
        </>
      ) : (
        "No pizzas available"
      )}
    </main>
  );
};

const Pizza = (props) => {
  const { pizzaName, pizzaIngredients, pizzaImg, price, soldOut } = props;
  return (
    <li className={`pizza ${soldOut ? "sold-out" : ""}`}>
      <img src={pizzaImg} alt={pizzaName} />
      <div>
        <h3>{pizzaName}</h3>
        <p>{pizzaIngredients}</p>
        <span>{soldOut ? "SOLD OUT" : price}</span>
      </div>
    </li>
  );
};

const Footer = () => {
  const hour = new Date().getHours();
  const openHour = 0;
  const closeHour = 20;
  const isOpen = hour >= openHour && hour < closeHour;

  return (
    <footer className='footer'>
      <p>{new Date().toLocaleString()}</p>
      <p>
        {isOpen ? (
          <Order closeHour={closeHour} openHour={openHour} />
        ) : (
          "We are closed"
        )}
      </p>
      <p>© 2023 Jay's Pizzeria</p>
    </footer>
  );
};

const Order = ({ closeHour, openHour }) => {
  return (
    <div className='order'>
      <p>
        We're open from {openHour}:00 to {closeHour}:00. Come visit us or order
        online.
      </p>
      <button className='btn'>Order</button>
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
