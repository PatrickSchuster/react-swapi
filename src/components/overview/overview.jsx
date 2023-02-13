import React from 'react';
import { Outlet } from 'react-router-dom';

import Filter from "../filter/filter"
import List from "../list/list"
import Counter from "../counter/counter"
import { filterPeople } from '../../utils/filterPeople';

export default class Overview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            people: [],
            filteredPeople: [],
            films: new Map(),
            species: new Map(),
            starships: new Map(),
            selected: null,
            peopleLoading: false,
            filmsLoading: false,
            speciesLoading: false,
            starshipsLoading: false,
        }
    }

    BASE_URL = new URL("https://swapi.dev/api")

    componentDidMount() {
        Promise.all([this.fetchAllPeople(), this.fetchAllFilms(), this.fetchAllSpecies(), this.fetchAllStarships()])
    }

    async fetchAllPeople() {
        try {
            this.setState({
                peopleLoading: true
            })
            let fetched = await (await fetch(`${this.BASE_URL}/people`)).json()
            let allPeople = [...fetched.results]
            while (fetched.next !== null) {
                fetched = await (await fetch(fetched.next)).json()
                allPeople = allPeople.concat(fetched.results)
            }
            this.setState({
                people: allPeople,
                filteredPeople: allPeople
            })
        } catch (err) {
            console.error(err)
        } finally {
            this.setState({
                peopleLoading: false
            })
        }
    }

    async fetchAllFilms() {
        try {
            this.setState({
                filmsLoading: true
            })
            const fetched = await (await fetch(`${this.BASE_URL}/films`)).json()
            const filmsMap = new Map()
            fetched.results.forEach(f => filmsMap.set(f.url, f))
            this.setState({
                films: filmsMap
            })
        } catch (err) {
            console.error(err)
        } finally {
            this.setState({
                filmsLoading: false
            })
        }
    }

    async fetchAllSpecies() {
        try {
            this.setState({
                speciesLoading: true
            })
            let fetched = await (await fetch(`${this.BASE_URL}/species`)).json()
            const firstBatch = [...fetched.results]
            const species = new Map()
            firstBatch.forEach(sp => {
                species.set(sp.url, sp)
            })
            while (fetched.next !== null) {
                fetched = await (await fetch(fetched.next)).json()
                fetched.results.forEach(sp => {
                    species.set(sp.url, sp)
                })
            }
            this.setState({
                species
            })
        } catch (err) {
            console.error(err)
        } finally {
            this.setState({
                speciesLoading: false
            })
        }
    }

    async fetchAllStarships() {
        try {
            this.setState({
                starshipsLoading: true
            })
            let fetched = await (await fetch(`${this.BASE_URL}/starships`)).json()
            const firstBatch = [...fetched.results]
            const starships = new Map()
            firstBatch.forEach(s => {
                starships.set(s.url, s)
            })
            while (fetched.next !== null) {
                fetched = await (await fetch(fetched.next)).json()
                fetched.results.forEach(s => {
                    starships.set(s.url, s)
                })
            }
            this.setState({
                starships
            })
        } catch(err) {
            console.error(err)
        } finally {
            this.setState({
                starshipsLoading: false
            })
        }
    }

    onFilterChange(filter){
        const filteredPeople = filterPeople(this.state.people, filter)
        this.setState({
            filteredPeople
        })
    }

    isLoading() {
        return this.state.filmsLoading || this.state.speciesLoading || this.state.peopleLoading || this.state.starshipsLoading
    }

    render() {
        return (
            <div className="overview" data-testid="overview">
                <Filter
                    data-testid="filter"
                    films={ this.state.films }
                    species={ this.state.species}
                    disabled={ this.isLoading() }
                    onFilterChange={ filter => this.onFilterChange(filter) }/>
                <Counter
                    matchCount={ this.state.filteredPeople.length }/>
                <Outlet
                    context={[this.isLoading(), this.state.selected, this.state.people, this.state.films, this.state.species, this.state.starships]}/>
                <List
                    isLoading={ this.isLoading() }
                    people={this.state.filteredPeople}
                    species={this.state.species}
                    films={this.state.films}
                    onClick={(selected) => {
                        this.setState({
                            selected
                        })
                    }}
                />
            </div>
        )
    }
}