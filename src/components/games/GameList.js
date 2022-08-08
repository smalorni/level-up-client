import React, { useEffect } from "react"
import { deleteGame, getGames } from "../../managers/GameManager.js"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const GameList = (props) => {
    const [ games, setGames ] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    return (
        <article className="games">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/games/new" })
                }}
                >Register New Game</button>
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title} by {game.maker}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        <button onClick={() => navigate(`/games/update/${game.id}`)}>✏️</button>
                        <button onClick={() => {deleteGame(game.id)
                            .then(()=>getGames())
                            .then(setGames)}}>❌</button>
                    </section>
                })
            }
        </article>
    )
}