import React, { useEffect} from "react"
import { getEvents } from "../../managers/EventManager.js"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/events/new" })
                }}
                >Register New Event</button>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__game">{event.game}</div>
                        <div className="game__description">Description:</div> 
                        <div>{event.description}</div>
                        <div className="game__date">The game will be on {event.date} at {event.time}.</div>
                    </section>
                })
            }
        </article>
    )
}