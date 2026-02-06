import { supabase } from "@/lib/supabase"
import type { User } from "@/types/auth"
import { ParticipantType, type CreateEventRequest, type EventType } from "@/types/calendar"

export class EventService {
    async get() {
        try {
            const { data, error } = await supabase
                .from('events')
                .select(`
                    id,
                    description,
                    date,
                    startTime:start_time,
                    endTime:end_time,
                    type,
                    participants:event_participants (
                    id,
                    contact:contact_id (*),
                    profile:profile_id (*)
                    )
                `)
            
            if (error) throw new Error(error?.message || 'Error getting events')

            return (data || []).map(d => ({
                id: d.id,
                description: d.description,
                date: new Date(d.date),
                startTime: d.startTime,
                endTime: d.endTime,
                type: d.type as EventType,
                participants: d.participants ?? []
            }))
        } catch {
            return []
        }
    }

    async getContacts(searchQuery: string, user: User) {
        try {
            const { data: contacts, error: contactsError } = await supabase
                .from('contacts')
                .select('*')
                .or(
                    `name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%,phone.ilike.%${searchQuery}%`,
                )

            const { data: profiles, error: profilesError } = await supabase
                .from('profiles')
                .select('*')
                .eq('company_id', user.company.id)
                .or(
                    `name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%,phone.ilike.%${searchQuery}%`,
                )

            if (contactsError) throw new Error(contactsError?.message || 'Contacts not found')
            if (profilesError) throw new Error(profilesError?.message || 'Profiles not found')
            
            const contactsAsParticipants = contacts.map(contact => ({
                id: contact.id,
                name: contact.name,
                email: contact.email,
                phone: contact.phone,
                type: ParticipantType.Contact,
                avatar: null,
            }))
                
            const profilesAsParticipants = profiles.map(profile => ({
                id: profile.id,
                name: profile.name,
                email: profile.email,
                phone: profile.phone,
                type: ParticipantType.Profile,
                avatar: profile.avatar,
            }))

            return [...contactsAsParticipants, ...profilesAsParticipants]
        } catch (error) {
            return []
        }
    }

    async create(form: CreateEventRequest, user: User) {
        try {
            const { data, error } = await supabase.rpc('create_event_with_participants', {
                p_description: form.description,
                p_date: form.date.toString(),
                p_start_time: form.startTime,
                p_end_time: form.endTime,
                p_type: form.type,
                p_company_id: user.company.id,
                p_added_by_id: user.id,
                p_participants: form.participants.map(v => ({
                    contact_id: v.type === ParticipantType.Contact ? v.id : null,
                    profile_id: v.type === ParticipantType.Profile ? v.id : null,
                }))
            });
        
            if(error) throw new Error(error.message || 'Error creating event')
                    
            return data
        } catch (error) {
            return []
        }
    }
}

