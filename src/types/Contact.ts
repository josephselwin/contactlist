export interface Contact {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    avatarUrl?: string; // Optional URL for profile picture
}

// Helper for initial mock data
export const INITIAL_CONTACTS: Contact[] = [
    {
        id: '1',
        firstName: 'Jane',
        lastName: 'Cooper',
        email: 'jane.cooper@example.com',
        phone: '(555) 123-4567',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
        id: '2',
        firstName: 'Cody',
        lastName: 'Fisher',
        email: 'cody.fisher@example.com',
        phone: '(555) 987-6543',
        avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
        id: '3',
        firstName: 'Esther',
        lastName: 'Howard',
        email: 'esther.howard@example.com',
        phone: '(555) 345-6789',
        avatarUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a37b1a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
];
