import { ref } from 'vue'
import { CalendarView } from '@/types/calendar'

const currentDate = ref(new Date())
const view = ref<CalendarView>(CalendarView.Weekly)
export function useCalendar() {
    const isMonthlyView = () => view.value === CalendarView.Monthly
    const currentDateYear = () => currentDate.value.getFullYear()
    const currentDateMonth = () => currentDate.value.getMonth()
    const currentDateTime = () => currentDate.value.getTime()

    function prev() {
        if (isMonthlyView()) {
            currentDate.value = new Date(currentDateYear(), currentDateMonth() - 1, 1)
        } else {
            currentDate.value = new Date(currentDateTime() - 7 * 24 * 60 * 60 * 1000)
        }
    }

    function next() {
        if (isMonthlyView()) {
            currentDate.value = new Date(currentDateYear(), currentDateMonth() + 1, 1)
        } else {
            currentDate.value = new Date(currentDateTime() + 7 * 24 * 60 * 60 * 1000)
        }
    }

    function changeView(newView: CalendarView) {
        view.value = newView
    }

    return {
        changeView,
        currentDate,
        view,
        next,
        prev,
    }
}
