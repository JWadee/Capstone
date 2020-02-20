import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import '../App.css' // webpack must be configured to do this
import { Calendar } from '@fullcalendar/core'

const CalendarComponent = () => {

    return (
            <FullCalendar defaultView="dayGridMonth" height={600} plugins={[ dayGridPlugin ]} dateClick={(e)=> alert(e.target.value)} />
    )

}

export default CalendarComponent