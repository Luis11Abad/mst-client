/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuth } from './useAuth'
import { ServiceProvider } from '@/services'
import {
    CalendarLoadingState,
    CalendarView,
    type CreateEventRequest,
    type EventItem,
} from '@/types/calendar'
import { useUI } from './useUI'
import { AlertType } from '@/types/ui'

const currentDate = ref(new Date())
const view = ref<CalendarView>(CalendarView.Weekly)
const loading = ref<CalendarLoadingState>(CalendarLoadingState.None)
const events = ref<EventItem[]>([])
export function useCalendar() {
    const { t } = useI18n()
    const { user } = useAuth()
    const { closeModal, handleError, setAlert } = useUI()
    const { event } = ServiceProvider

    const isMonthlyView = () => view.value === CalendarView.Monthly
    const currentDateYear = () => currentDate.value.getFullYear()
    const currentDateMonth = () => currentDate.value.getMonth()
    const currentDateTime = () => currentDate.value.getTime()

    function changeView(newView: CalendarView) {
        view.value = newView
    }

    async function createEvent(form: CreateEventRequest) {
        loading.value = CalendarLoadingState.Create
        try {
            const data = await event.create(form, user.value!)
            events.value.push(data as unknown as EventItem)
            closeModal('add-event-modal')
            setAlert(AlertType.Success, t('create-event-success'))
        } catch (err: Error | any) {
            handleError(err.message || 'create-event-generic-error')
        }
        loading.value = CalendarLoadingState.None
    }

    async function getEvents() {
        loading.value = CalendarLoadingState.Get
        try {
            events.value = await event.get()
        } catch (err: Error | any) {
            handleError(err.message || 'get-events-generic-error')
        }
        loading.value = CalendarLoadingState.None
    }

    async function getEventContacts(searchQuery: string) {
        try {
            return await event.getContacts(searchQuery, user.value!)
        } catch (err: Error | any) {
            handleError(err.message || 'get-event-contacts-generic-error')
            return []
        }
    }

    function next() {
        currentDate.value = isMonthlyView()
            ? new Date(currentDateYear(), currentDateMonth() + 1, 1)
            : new Date(currentDateTime() + 7 * 24 * 60 * 60 * 1000)
    }

    function prev() {
        currentDate.value = isMonthlyView()
            ? new Date(currentDateYear(), currentDateMonth() - 1, 1)
            : new Date(currentDateTime() - 7 * 24 * 60 * 60 * 1000)
    }

    return {
        currentDate,
        events,
        view,
        changeView,
        createEvent,
        getEventContacts,
        getEvents,
        next,
        prev,
    }
}
