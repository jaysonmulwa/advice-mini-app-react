export default function Stats({ items }) {
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
