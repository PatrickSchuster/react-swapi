import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getPersonIdFromUrl } from '../../utils/url';

export default function List(props) {
    const navigate = useNavigate()
    if (props.isLoading) {
        return <div className="loading-container" data-testid="loading">Loading ...<div className="spinner"/></div>
    }
    const peopleListItems = props.people.map(person =>{
        return (
            <li
                key={person.name}
                className="item"
                onClick={() => {
                    props.onClick(person)
                    navigate(`/details/${getPersonIdFromUrl(person.url)}`, {
                        state: {
                            person,
                            films: props.films,
                            species: props.species,
                        }
                    })
                }}>{ person.name }</li>
        )
    })
    if (peopleListItems.length === 0) {
        return <div className="loading-container" data-testid="loading">No people matching the given filter 🙈</div>
    }
    return (
        <ul className="list" data-testid="list">{ peopleListItems }</ul>
    )
}