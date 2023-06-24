export function Item({
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
