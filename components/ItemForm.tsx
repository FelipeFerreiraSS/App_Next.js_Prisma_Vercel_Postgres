import { useState, useEffect } from 'react';

interface ItemFormProps {
  onSubmit: (item: { id?: number; name: string; description: string }) => void;
  initialItem?: { id: number; name: string; description: string } | null;
}

export default function ItemForm({ onSubmit, initialItem }: ItemFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initialItem) {
      setName(initialItem.name || '');
      setDescription(initialItem.description || '');
    }
  }, [initialItem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialItem) {
      onSubmit({ id: initialItem.id, name, description });
    } else {
      onSubmit({ name, description });
    }
    setName('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Description:
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <button type="submit">{initialItem ? 'Update Item' : 'Add Item'}</button>
    </form>
  );
}
