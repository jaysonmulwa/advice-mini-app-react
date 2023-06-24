import "../App.css";
import { useState } from "react";
import Logo from "./Logo";
import PackagingList from "./PackagingList";
import Stats from "./Stats";
import Form from "./Form";

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

export default App;
