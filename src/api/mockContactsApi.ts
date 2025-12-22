import { type Contact, INITIAL_CONTACTS } from '../types/Contact';

const STORAGE_KEY = 'contact_list_app_db';
const DELAY_MS = 800; // Simulated network delay

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getContactsFromStorage = (): Contact[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CONTACTS));
        return INITIAL_CONTACTS;
    }
    return JSON.parse(stored);
};

const saveContactsToStorage = (contacts: Contact[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
};

export const mockApi = {
    fetchContacts: async (): Promise<Contact[]> => {
        await delay(DELAY_MS);
        return getContactsFromStorage();
    },

    searchContacts: async (query: string): Promise<Contact[]> => {
        await delay(DELAY_MS / 2); // Faster than full fetch
        const contacts = getContactsFromStorage();
        const lowerQuery = query.toLowerCase();
        return contacts.filter(
            (c) =>
                c.firstName.toLowerCase().includes(lowerQuery) ||
                c.lastName.toLowerCase().includes(lowerQuery) ||
                c.email.toLowerCase().includes(lowerQuery) ||
                c.phone.includes(query)
        );
    },

    addContact: async (contact: Omit<Contact, 'id'>): Promise<Contact> => {
        await delay(DELAY_MS);
        const contacts = getContactsFromStorage();
        const newContact: Contact = {
            ...contact,
            id: crypto.randomUUID(), // Use built-in randomUUID
            avatarUrl: contact.avatarUrl || `https://ui-avatars.com/api/?name=${contact.firstName}+${contact.lastName}&background=random`
        };
        saveContactsToStorage([newContact, ...contacts]);
        return newContact;
    },

    updateContact: async (updatedContact: Contact): Promise<Contact> => {
        await delay(DELAY_MS);
        const contacts = getContactsFromStorage();
        const index = contacts.findIndex((c) => c.id === updatedContact.id);
        if (index === -1) throw new Error('Contact not found');

        contacts[index] = updatedContact;
        saveContactsToStorage(contacts);
        return updatedContact;
    },

    deleteContact: async (id: string): Promise<void> => {
        await delay(DELAY_MS);
        const contacts = getContactsFromStorage();
        const newContacts = contacts.filter((c) => c.id !== id);
        saveContactsToStorage(newContacts);
    }
};
