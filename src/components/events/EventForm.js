import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createEvent } from "../../managers/EventManager"
import { getGames } from "../../managers/GameManager"


export const EventForm = () => {
    const navigate = useNavigate()
    const [games, setGames] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentEvent, setCurrentEvent] = useState({
        description:"",
        date: "",
        time: "",
        gameId: 0
    })

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getGames().then(data => setGames(data))
    }, [])

    const changeEventState = (domEvent) => {
        // TODO: Complete the onChange function
        const copyNewEvent = {...currentEvent}
        copyNewEvent[domEvent.target.name] = domEvent.target.value
        setCurrentEvent(copyNewEvent)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Event Description:</label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date of Event:</label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time:</label>
                    <input type="time" name="time"
                        value={currentEvent.time}
                        onChange={changeEventState} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Choose a Game:</label>
                    <select className="form-control" name="game" value={currentEvent.game} required onChange={changeEventState} >
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

                    const event = {
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        game: parseInt(currentEvent.game)
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}