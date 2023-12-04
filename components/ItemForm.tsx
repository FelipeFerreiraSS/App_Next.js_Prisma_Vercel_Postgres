import { useState, useEffect } from 'react';

interface ItemFormProps {
  onSubmit: (item: { id?: number; name: string; description: string }) => void;
  editItem?: { id: number; name: string; description: string };
}

export default function ItemForm({ onSubmit, editItem }: ItemFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editItem) {
      setName(editItem.name || '');
      setDescription(editItem.description || '');
    }
  }, [editItem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editItem) {
      onSubmit({ id: editItem.id, name, description });
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
      <button type="submit">{editItem ? 'Update Item' : 'Add Item'}</button>
    </form>
  );
}
