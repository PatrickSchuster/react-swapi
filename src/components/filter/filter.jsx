import React from 'react';
import RangeSelector from './rangeselector';

export default class Filter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            disabled: false,
            currentFilter: new Map()
        }
    }

    render() {
        const filmsOptions = [<option key="all" data-key="all">All</option>]   
        for (const [key, value] of this.props.films.entries()) {
            filmsOptions.push(<option key={key} data-key={key}>{ value.title }</option>)
        }

        const speciesOptions = [<option key="all" data-key="all">All</option>]
        for (const [key, value] of this.props.species.entries()) {
            speciesOptions.push(<option key={key} data-key={key}>{ value.name }</option>)
        }

        return (
            <nav className="filter" data-testid="filter">
                <label htmlFor="filmsFilter">Film:</label>
                <select
                    id="filmsFilter"
                    name="filmsFilter"
                    disabled={this.props.disabled}
                    onChange={ (event) => {
                        const dataKey = event.target.options[event.target.options.selectedIndex].getAttribute("data-key")
                        this.setState({
                            currentFilter: this.state.currentFilter.set("filmUrl", dataKey)
                        }, () => this.props.onFilterChange(this.state.currentFilter))
                    } }>
                    { filmsOptions }
                </select>
                
                <label htmlFor="speciesFilter">Species:</label>
                <select
                    id="speciesFilter"
                    name="speciesFilter"
                    disabled={this.props.disabled}
                    onChange={ (event) => {
                        const dataKey = event.target.options[event.target.options.selectedIndex].getAttribute("data-key")
                        this.setState({
                            currentFilter: this.state.currentFilter.set("speciesUrl", dataKey)
                        }, () => this.props.onFilterChange(this.state.currentFilter))
                    } }>
                    { speciesOptions }
                </select>

                <RangeSelector
                    disabled={this.props.disabled}
                    onChange={ obj => {
                        const current = this.state.currentFilter
                        current.set("startYear", `${obj.start}${obj.startMarker}`)
                        current.set("endYear", `${obj.end}${obj.endMarker}`)
                        this.setState({
                            currentFilter: current
                        }, () => this.props.onFilterChange(this.state.currentFilter))
                    } }/>
            </nav>
        )
    }
}