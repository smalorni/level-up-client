import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { GameList } from "../components/games/GameList"
import { EventList } from "../components/events/EventList"
import { GameForm } from "../components/games/GameForm"
import { EventForm } from "../components/events/EventForm"
import React from "react"

export const ApplicationViews = () => {
    return <>
    <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
    </main>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                {/* Add Routes here */}
                <Route path="/games" element={<GameList />} />
                <Route path="/events" element={<EventList />} />
                <Route path="/games/new" element={<GameForm />} />
                <Route path="/events/new" element={<EventForm />} />
            </Route>
        </Routes>
    </>
}
