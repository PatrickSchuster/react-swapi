import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { getPersonIdFromUrl } from '../../utils/url'

export default function Details() {
    const [isLoading, selected, people, filmsMap, speciesMap, starshipsMap] = useOutletContext()

    const navigate = useNavigate()
    const [state, setState] = useState({
        selected: {}
    })

    useEffect(() => {
        const selectedId = getPersonIdFromUrl(window.location.href)
        const found = findPersonIdInPeople(selectedId, people)
        if (found) {
            setState(() => {
                return {
                    selected: found
                }
            })
        }
    }, [people])

    function findPersonIdInPeople(id, people) {
        return people.find(p => getPersonIdFromUrl(p.url) === id)
    }

    function mapToSpeciesNames(species) {
        if (!species) {
            return
        }
        if (species.length === 0) {
            return "No data 🙈"
        }
        return species
            .map(sp => speciesMap.get(sp).name)
            .join(", ")
    }

    function mapToFilmTitles(films) {
        if(!films) {
            return
        }
        if (films.length === 0) {
            return "No data 🙈"
        }
        return films
            .map(f => filmsMap.get(f).title)
            .join(", ")
    }

    function mapToStarshipNames(starships) {
        if (!starships) {
            return
        }
        if (starships.length === 0) {
            return "No data 🙈"
        }
        return starships
            .map(s => starshipsMap.get(s).name)
            .join(", ")
    }

    if (isLoading) {
        return <summary className="person-details"><h1>Loading person details ... 🐌</h1></summary>
    }

    // in case of deep linking, I have to make sure that the person details are retrieved from the state (not passed in via the outlet)
    const personDetails = selected !== null ? selected : state.selected
    return (
        <summary className="person-details">
            <button className="close" onClick={() => navigate("/")}>X</button>
            <h1>{ personDetails.name}</h1>
            <span>👽<strong> Species: </strong>{ mapToSpeciesNames(personDetails.species) }</span>
            <span>🎬<strong> Films: </strong>{ mapToFilmTitles(personDetails.films) }</span>
            <span>🚀<strong> Starships: </strong>{ mapToStarshipNames(personDetails.starships) }</span>
        </summary>
    )
}