import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getSingleEvent, updateEvent } from "../../managers/EventManager"
import { getGames } from "../../managers/GameManager"


export const EditEvent = () => {
    const navigate = useNavigate()
    const [games, setGames] = useState([])
    const { eventId } = useParams()

   
    const [event, setEvent] = useState({
        description:"",
        date: "",
        time: "",
        gameId: 0
    })

    /* UseEffect for single event by id */
    useEffect(() => {
        getSingleEvent(eventId).then(data => setEvent(data))
    },
        [eventId]
    )

    useEffect(() => {
        // TODO: Get games, then set the state
        getGames().then(data => setGames(data))
    }, [])

    const changeEventState = (domEvent) => {
        // TODO: Complete the onChange function
        const copyEditEvent = {...event}
        copyEditEvent[domEvent.target.name] = domEvent.target.value
        setEvent(copyEditEvent)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Edit New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={event.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date of Event:</label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={event.date}
                        onChange={changeEventState} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time:</label>
                    <input type="time" name="time"
                        value={event.time}
                        onChange={changeEventState} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Choose a Game:</label>
                    <select className="form-control" name="game" value={event.game} required 
                    onChange={changeEventState} >
                            <option value="0"></option>
                            {
                                games.map(game => {
                                return <option value={game.id} key={`game--${game.id}`}>{game.title}
                                </option> 
                                })
                            }
                    </select>
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const currentEvent = {
                        description: event.description,
                        date: event.date,
                        time: event.time,
                        game: parseInt(event.game)
                    }

                    // Send POST request to your API
                    updateEvent(currentEvent, eventId)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Edit Event </button>
        </form>
    )
}