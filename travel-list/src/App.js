import "./App.css";
import { useState } from "react";

let initialItems = [
  { id: "1", description: "Passport", quantity: 2, packed: false },
  { id: "2", description: "Underwear", quantity: 21, packed: true },
  { id: "3", description: "Socks", quantity: 12, packed: false },
  { id: "4", description: "Cufflinks", quantity: 3, packed: false },
];

function App() {
  return (
    <div className='app'>
      <Logo />
      <Form />
      <PackagingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>Travel List</h1>;
}

function Form() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    initialItems = [...initialItems, newItem];

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <h3>What do you need for your trip</h3>
      <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type='text'
        placeholder='Item...'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add Item</button>
    </form>
  );
}

function PackagingList() {
  return (
    <div className='list'>
      <ul>
        {initialItems.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item: { id, description, quantity, packed } }) {
  return (
    <li key={id}>
      <span style={packed ? { textDecoration: "line-through" } : {}}>
        {quantity} {description}
      </span>
      <button className='remove'>Remove</button>
    </li>
  );
}

function Stats() {
  return (
    <footer>
      <em>You have X items in your list</em>
    </footer>
  );
}

export default App;
