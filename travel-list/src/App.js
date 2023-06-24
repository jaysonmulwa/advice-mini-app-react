import "./App.css";
import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(newItem) {
    setItems((items) => [...items, newItem]);
  }

  function handleRemoveItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItems(id) {
    setItems((items) =>
      items.map((item) => {
        if (item.id !== id) return item;
        return { ...item, packed: !item.packed };
      })
    );
  }

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to clear the list?"
    );
    if (!confirmed) return;
    setItems([]);
  }

  return (
    <div className='app'>
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackagingList
        items={items}
        onRemoveItems={handleRemoveItems}
        onToggleItems={handleToggleItems}
        clearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>Travel List</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };

    onAddItems(newItem);

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

function PackagingList({ items, onRemoveItems, onToggleItems, clearList }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;

  if (sortBy === "input") {
    sortedItems = items;
  }

  if (sortBy === "description") {
    sortedItems = items.sort((a, b) =>
      a.description.localeCompare(b.description)
    );
  }

  if (sortBy === "packed") {
    sortedItems = items.sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className='list'>
      <ul>
        {sortedItems?.map((item) => (
          <Item
            key={item.id}
            item={item}
            onRemoveItems={onRemoveItems}
            onToggleItems={onToggleItems}
          />
        ))}
      </ul>

      <div className='actions'>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value='input'>Sort by input order</option>
          <option value='description'>Sort by description</option>
          <option value='packed'>Sort by packed status</option>
        </select>

        <button onClick={clearList}>Clear list</button>
      </div>
    </div>
  );
}

function Item({
  item: { id, description, quantity, packed },
  onRemoveItems,
  onToggleItems,
}) {
  return (
    <li key={id}>
      <input
        type='checkbox'
        checked={packed}
        onChange={() => onToggleItems(id)}
      />
      <span style={packed ? { textDecoration: "line-through" } : {}}>
        {quantity} {description}
      </span>
      <button onClick={() => onRemoveItems(id)} className='remove'>
        Remove
      </button>
    </li>
  );
}

function Stats({ items }) {
  const numItems = items.length || 0;
  const numPackedItems = items.filter((item) => item.packed).length;
  const percentage = numItems ? (numPackedItems / numItems) * 100 : 0;
  return (
    <footer className='stats'>
      <em>
        You have {numItems} items in your list and you have already packed{" "}
        {numPackedItems} items {percentage} %.
      </em>
    </footer>
  );
}

export default App;
