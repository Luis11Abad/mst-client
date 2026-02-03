export const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
}

export const startOfWeek = (date: Date) => {
    const d = new Date(date)
    const day = d.getDay()
    const diff = d.getDate() - ((day + 6) % 7)
    return new Date(d.setDate(diff))
}

export const getDaysInMonth = (currentDate: Date) => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)
    const startDate = startOfWeek(firstDayOfMonth)
    const endDate = new Date(startOfWeek(lastDayOfMonth).getTime() + 6 * 24 * 60 * 60 * 1000)
    const days = []
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        days.push({
            date: new Date(d),
            isCurrentMonth: d.getMonth() === month,
        })
    }
    return days
}

export const daysInWeek = (currentDate: Date) => {
    const start = startOfWeek(currentDate)
    const days = []
    for (let i = 0; i < 7; i++) {
        days.push(new Date(start.getFullYear(), start.getMonth(), start.getDate() + i))
    }
    return days
}

export const daysInMonth = (currentDate: Date) => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const firstDayDate = new Date(year, month, 1)
    const startOffset = firstDayDate.getDay() === 0 ? 6 : firstDayDate.getDay() - 1

    const lastDate = new Date(year, month + 1, 0).getDate()
    const days = []

    const prevMonthLastDate = new Date(year, month, 0).getDate()
    for (let i = startOffset; i > 0; i--) {
        days.push({
            date: new Date(year, month - 1, prevMonthLastDate - i + 1),
            isCurrentMonth: false,
        })
    }

    for (let i = 1; i <= lastDate; i++) {
        days.push({
            date: new Date(year, month, i),
            isCurrentMonth: true,
        })
    }

    const totalSlots = days.length > 35 ? 42 : 35
    const remaining = totalSlots - days.length

    for (let i = 1; i <= remaining; i++) {
        days.push({
            date: new Date(year, month + 1, i),
            isCurrentMonth: false,
        })
    }

    return days
}
