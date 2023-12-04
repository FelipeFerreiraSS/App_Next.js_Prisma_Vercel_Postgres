// pages/index.tsx

import { useEffect, useState } from 'react';
import ItemForm from '../components/ItemForm';

interface Item {
  id: number;
  name: string;
  description: string;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [editItem, setEditItem] = useState<Item | null>(null);

  useEffect(() => {
    fetch('/api/items')
      .then((res) => res.json())
      .then((data: Item[]) => setItems(data));
  }, []);

  const handleAddItem = (item: { name: string; description: string }) => {
    fetch('/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
      .then((res) => res.json())
      .then((newItem: Item) => setItems([...items, newItem]));
  };

  const handleEditItem = (id: number) => {
    const itemToEdit = items.find((item) => item.id === id);
    setEditItem(itemToEdit || null);
  };

  const handleUpdateItem = (item: { id: number; name: string; description: string }) => {
    fetch('/api/items', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
      .then((res) => res.json())
      .then((updatedItem: Item) => {
        setItems(items.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
        setEditItem(null);
      });
  };

  const handleDeleteItem = (id: number) => {
    fetch('/api/items', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((deletedItem: Item) => {
        setItems(items.filter((item) => item.id !== deletedItem.id));
        setEditItem(null);
      });
  };

  return (
    <div>
      <h1 className="text-sky-500" >Item List</h1>
      <ItemForm onSubmit={editItem ? handleUpdateItem : handleAddItem} editItem={editItem} />
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong> - {item.description}
            <button onClick={() => handleEditItem(item.id)}>Edit</button>
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
