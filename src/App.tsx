import { useState, useEffect, useCallback } from 'react';
import './index.css';
import { Layout } from './components/Layout';
import { ContactList } from './components/ContactList';
import { SearchBar } from './components/SearchBar';
import { Button } from './components/Button';
import { Modal } from './components/Modal';
import { ContactForm } from './components/ContactForm';
import { mockApi } from './api/mockContactsApi';
import type { Contact } from './types/Contact';

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchContacts = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = searchQuery
        ? await mockApi.searchContacts(searchQuery)
        : await mockApi.fetchContacts();
      setContacts(data);
    } catch (error) {
      console.error('Failed to fetch contacts', error);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchContacts();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchContacts]);

  const handleAddClick = () => {
    setEditingContact(undefined);
    setIsModalOpen(true);
  };

  const handleEditClick = (contact: Contact) => {
    setEditingContact(contact);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await mockApi.deleteContact(id);
        // Optimistic update or refetch
        setContacts(prev => prev.filter(c => c.id !== id));
      } catch (error) {
        console.error('Failed to delete contact', error);
      }
    }
  };

  const handleFormSubmit = async (data: Omit<Contact, 'id'>) => {
    setIsSubmitting(true);
    try {
      if (editingContact) {
        const updated = await mockApi.updateContact({ ...data, id: editingContact.id });
        setContacts(prev => prev.map(c => c.id === updated.id ? updated : c));
      } else {
        const created = await mockApi.addContact(data);
        setContacts(prev => [created, ...prev]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save contact', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <Button onClick={handleAddClick} className="w-full md:w-auto">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
          Add Contact
        </Button>
      </div>

      <ContactList
        contacts={contacts}
        isLoading={isLoading}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingContact ? 'Edit Contact' : 'Add New Contact'}
      >
        <ContactForm
          initialData={editingContact}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsModalOpen(false)}
          isLoading={isSubmitting}
        />
      </Modal>
    </Layout>
  );
}

export default App;
