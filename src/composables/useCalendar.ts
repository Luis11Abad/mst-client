import { ref } from 'vue'
import { supabase } from '@/lib/supabase'
import { CalendarLoadingState, CalendarView, EventType, ParticipantType, type CreateEventRequest, type EventResponse } from '@/types/calendar'
import { useAuth } from './useAuth'
import { RequestProvider } from '@/services'

const currentDate = ref(new Date())
const view = ref<CalendarView>(CalendarView.Weekly)
const loading = ref<CalendarLoadingState>(CalendarLoadingState.None)
const events = ref<EventResponse[]>([])
export function useCalendar() {
    const { user } = useAuth()
    const { event } = RequestProvider

    const isMonthlyView = () => view.value === CalendarView.Monthly
    const currentDateYear = () => currentDate.value.getFullYear()
    const currentDateMonth = () => currentDate.value.getMonth()
    const currentDateTime = () => currentDate.value.getTime()

    function changeView(newView: CalendarView) {
        view.value = newView
    }

    async function createEvent(form: CreateEventRequest) {
        loading.value = CalendarLoadingState.Create
        const data = await event.create(form, user.value!)
        console.log(data)
        loading.value = CalendarLoadingState.None
    }

    async function getEvents() {
        loading.value = CalendarLoadingState.Get
        const data = await event.get()
        events.value = data
        loading.value = CalendarLoadingState.None
    }

    async function getEventContacts(searchQuery: string) {
        return await event.getContacts(searchQuery, user.value!)
    }

    function next() {
        if (isMonthlyView()) {
            currentDate.value = new Date(currentDateYear(), currentDateMonth() + 1, 1)
        } else {
            currentDate.value = new Date(currentDateTime() + 7 * 24 * 60 * 60 * 1000)
        }
    }

    function prev() {
        if (isMonthlyView()) {
            currentDate.value = new Date(currentDateYear(), currentDateMonth() - 1, 1)
        } else {
            currentDate.value = new Date(currentDateTime() - 7 * 24 * 60 * 60 * 1000)
        }
    }

    return {
        currentDate,
        view,
        changeView,
        createEvent,
        getEventContacts,
        getEvents,
        next,
        prev,
    }
}
