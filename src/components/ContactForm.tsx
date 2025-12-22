import React, { useState, useEffect } from 'react';
import type { Contact } from '../types/Contact';
import { Button } from './Button';

interface ContactFormProps {
    initialData?: Contact;
    onSubmit: (data: Omit<Contact, 'id'>) => Promise<void>;
    onCancel: () => void;
    isLoading?: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({ initialData, onSubmit, onCancel, isLoading }) => {
    const [formData, setFormData] = useState<Omit<Contact, 'id'>>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        avatarUrl: ''
    });
    const [error, setError] = useState<string>('');

    // US Phone Regex: Supports (123) 456-7890, 123-456-7890, 123 456 7890, 1234567890
    const phoneRegex = /^(\+?1[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;
    useEffect(() => {
        if (initialData) {
            setFormData({
                firstName: initialData.firstName,
                lastName: initialData.lastName,
                email: initialData.email,
                phone: initialData.phone,
                avatarUrl: initialData.avatarUrl
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (name === 'phone') setError(''); // Clear error on change
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!phoneRegex.test(formData.phone)) {
            setError('Please enter a valid US phone number (e.g., (555) 123-4567)');
            return;
        }

        await onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label htmlFor="firstName" className="text-sm font-medium text-gray-300">First Name</label>
                    <input
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        placeholder="Jane"
                    />
                </div>
                <div className="space-y-1">
                    <label htmlFor="lastName" className="text-sm font-medium text-gray-300">Last Name</label>
                    <input
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        placeholder="Doe"
                    />
                </div>
            </div>

            <div className="space-y-1">
                <label htmlFor="email" className="text-sm font-medium text-gray-300">Email Address</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    placeholder="jane@example.com"
                />
            </div>

            <div className="space-y-1">
                <label htmlFor="phone" className="text-sm font-medium text-gray-300">Phone Number</label>
                <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                    className={`w-full bg-white/5 border ${error ? 'border-red-500' : 'border-white/10'} rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 ${error ? 'focus:ring-red-500/50' : 'focus:ring-indigo-500/50'}`}
                />
                {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
            </div>

            <div className="space-y-1">
                <label htmlFor="avatarUrl" className="text-sm font-medium text-gray-300">Avatar URL (Optional)</label>
                <input
                    id="avatarUrl"
                    name="avatarUrl"
                    value={formData.avatarUrl || ''}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    placeholder="https://..."
                />
            </div>

            <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
                <Button type="submit" isLoading={isLoading}>{initialData ? 'Update Contact' : 'Add Contact'}</Button>
            </div>
        </form>
    );
};
