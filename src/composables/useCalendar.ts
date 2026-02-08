/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuth } from './useAuth'
import { RequestProvider } from '@/services'
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
    const { closeModal, setAlert } = useUI()
    const { event } = RequestProvider

    const isMonthlyView = () => view.value === CalendarView.Monthly
    const currentDateYear = () => currentDate.value.getFullYear()
    const currentDateMonth = () => currentDate.value.getMonth()
    const currentDateTime = () => currentDate.value.getTime()

    function changeView(newView: CalendarView) {
        view.value = newView
    }

    async function createEvent(form: CreateEventRequest) {
        try {
            loading.value = CalendarLoadingState.Create
            const data = await event.create(form, user.value!)
            events.value.push(data as unknown as EventItem)
            loading.value = CalendarLoadingState.None
            closeModal('add-event-modal')
            setAlert(AlertType.Success, t('create-event-success'))
        } catch (error: Error | any) {
            const message = error?.message || t('create-event-generic-error')
            setAlert(AlertType.Error, message)
        }
    }

    async function getEvents() {
        try {
            loading.value = CalendarLoadingState.Get
            const data = await event.get()
            events.value = data
            loading.value = CalendarLoadingState.None
        } catch (error: Error | any) {
            const message = error?.message || t('get-events-generic-error')
            setAlert(AlertType.Error, message)
        }
    }

    async function getEventContacts(searchQuery: string) {
        try {
            return await event.getContacts(searchQuery, user.value!)
        } catch (error: Error | any) {
            const message = error?.message || t('get-event-contacts-generic-error')
            setAlert(AlertType.Error, message)
            return []
        }
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
