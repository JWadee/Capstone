import React from 'react'


const Navbar = () => {

    return (
            <FullCalendar defaultView="dayGridMonth" height={600} plugins={[ dayGridPlugin ]} dateClick={(e)=> alert(e.target.value)} />
    )

}

export default Navbar