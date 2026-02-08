import type { Tables } from './db'

export enum CalendarLoadingState {
    None,
    Get,
    Create,
}

export enum CalendarView {
    Monthly,
    Weekly,
}

export enum EventType {
    Meet = 'Meet',
    Show = 'Show',
    Contract = 'Contract',
    Delivery = 'Delivery',
}

export enum ParticipantType {
    Contact = 'Contact',
    Profile = 'Profile',
}

export interface SelectableEventParticipant {
    id: string
    name: string
    email: string
    phone: string | null
    type: ParticipantType
    avatar: string | null
}

export interface EventItem {
    id: string
    description: string
    type: EventType
    date: Date
    startTime: string
    endTime: string
    participants: {
        id: string
        contact: Tables<'contacts'> | null
        profile: Tables<'profiles'> | null
    }[]
}

export interface CreateEventRequest {
    description: string
    date: Date
    endTime: string
    startTime: string
    type: EventType
    participants: SelectableEventParticipant[]
}
