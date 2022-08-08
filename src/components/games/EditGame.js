import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getGameTypes, getSingleGame, updateGame } from "../../managers/GameManager"


export const EditGame = () => {
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])
    const { gameId } = useParams()

   
    const [currentGame, setCurrentGame] = useState({
        skillLevel: 0,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    })

    /* UseEffect for single game by id */
    useEffect(() => {
        getSingleGame(gameId).then(data => setCurrentGame(data))
    },
        [gameId]
    )

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getGameTypes().then(data => setGameTypes(data))
    }, [])

    const changeGameState = (domEvent) => {
        // TODO: Complete the onChange function
        const copyEditGame = {...currentGame}
        copyEditGame[domEvent.target.name] = domEvent.target.value
        setCurrentGame(copyEditGame)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Edit New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker:</label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players:</label>
                    <input type="number" name="number_of_players"
                        value={currentGame.number_of_players}
                        onChange={changeGameState} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level:</label>
                    <input type="number" name="skill_level"
                        value={currentGame.skill_level}
                        onChange={changeGameState} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="game_type">Game Type:</label>
                    <select name="game_type"
                        onChange={changeGameState} >
                            <option value="0">Select Game Type:</option>
                            {
                                gameTypes.map(gameType => {
                                return <option value={gameType.id} key={`gameType--${gameType.id}`}>{gameType.label}
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

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        numberOfPlayers: parseInt(currentGame.number_of_players),
                        skillLevel: parseInt(currentGame.skill_level),
                        gameTypeId: parseInt(currentGame.game_type)
                    }

                    // Send POST request to your API
                    updateGame(game, gameId)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Edit Game</button>
        </form>
    )
}