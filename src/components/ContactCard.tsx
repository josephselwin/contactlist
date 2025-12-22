import React from 'react';
import type { Contact } from '../types/Contact';


interface ContactCardProps {
    contact: Contact;
    onEdit: (contact: Contact) => void;
    onDelete: (id: string) => void;
}

export const ContactCard: React.FC<ContactCardProps> = ({ contact, onEdit, onDelete }) => {
    return (
        <div className="group relative bg-white/5 hover:bg-white/10 border border-white/5 hover:border-indigo-500/30 rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col gap-4">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <img
                        src={contact.avatarUrl}
                        alt={`${contact.firstName} ${contact.lastName}`}
                        className="w-12 h-12 rounded-full ring-2 ring-white/10 group-hover:ring-indigo-500/50 transition-all object-cover"
                    />
                    <div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-indigo-200 transition-colors">
                            {contact.firstName} {contact.lastName}
                        </h3>
                        <p className="text-sm text-indigo-300/60 font-medium">{contact.email}</p>
                    </div>
                </div>

                {/* Actions Menu or Buttons (visible on hover or always for simplicity) */}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity focus-within:opacity-100">
                    <button
                        onClick={() => onEdit(contact)}
                        className="p-1.5 rounded-lg text-indigo-300 hover:bg-indigo-500/20 hover:text-indigo-100 transition-colors"
                        title="Edit"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                    </button>
                    <button
                        onClick={() => onDelete(contact.id)}
                        className="p-1.5 rounded-lg text-red-300 hover:bg-red-500/20 hover:text-red-100 transition-colors"
                        title="Delete"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="border-t border-white/5 pt-3 mt-1 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-indigo-200/50 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0121 15.352V16.5a1.5 1.5 0 01-1.5 1.5H18a15 15 0 01-15-15V3.5z" clipRule="evenodd" />
                    </svg>
                    <a href={`sms:${contact.phone}`} className="hover:text-indigo-200 hover:underline transition-colors">
                        {contact.phone}
                    </a>
                </div>
            </div>
        </div>
    );
};
