import React, { useState, useEffect } from 'react';
import './App.css'

export default function App() {
    const [repositories, setRepositories] = useState([])
    const [username, setUsername] = useState('nemo-mobile')

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`https://api.github.com/users/${username}/repos`)
            const data = await response.json()

            setRepositories(data)
        }

        fetchData()
    }, [username])

    useEffect(() => {
        const filteredFavorites = repositories.filter(repo => repo.favorite)

        document.title = `Favoritos ${filteredFavorites.length}`
    }, [repositories])

    function newFavorite(id) {
        const newRepositories = repositories.map(repo => {
            return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo
        })

        setRepositories(newRepositories)
    }

    function changeUsername() {
        const newUsername = document.getElementById('Username').value
        setUsername(newUsername)
    }

    function changeFavoriteColor(repo) {
        const element = document.getElementById(`${repo.id}`)
        element.style.backgroundColor === 'goldenrod' ? element.style.backgroundColor = 'RGB(15, 76, 117)' : element.style.backgroundColor = 'goldenrod'
    }

    return (
        <div>
            <div className="username-input">
                <input id="Username" type="text" placeholder="GitHub Username..."></input>
                <button className="button" onClick={() => changeUsername()}>Send</button>
            </div>

            <div className="container">
                {repositories.map(repo => (
                    <div id={repo.id} key={repo.id} className="repositories">
                        {repo.name}
                        <button className="favorite" onClick={() => {
                            newFavorite(repo.id)
                            changeFavoriteColor(repo)
                        }}>Favorite</button>
                    </div>
                ))}
            </div>
        </div>
    );
}