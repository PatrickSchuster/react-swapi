import React from "react"

export default class RangeSelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            start: "100",
            startMarker: "BBY",
            end: "100",
            endMarker: "ABY"
        }
    }

    render() {
        return (
            <div className="range">
                <label htmlFor="yearContainer">Range:</label>
                <div className="yearContainer">
                    <input id="start" type="number" min="0" max="1000" disabled={this.props.disabled} onChange={e => {
                        this.setState({
                            start: e.target.value
                        }, () => this.props.onChange(this.state))
                    }} />
                    <select id="startMarker" disabled={this.props.disabled} onChange={e => {
                        this.setState({
                            startMarker: e.target.options[e.target.options.selectedIndex].getAttribute("data-key")
                        }, () => this.props.onChange(this.state))
                    }}>
                        <option data-key="BBY">BBY</option>
                        <option data-key="ABY">ABY</option>
                    </select>
                </div>
                <span>↔</span>
                <div className="yearContainer">
                    <input id="end" type="number" min="0" max="1000" disabled={this.props.disabled} onChange={e => {
                        this.setState({
                            end: e.target.value
                        }, () => this.props.onChange(this.state))
                    }}/>
                    <select id="endMarker" disabled={this.props.disabled} onChange={ e => {
                        this.setState({
                            endMarker: e.target.options[e.target.options.selectedIndex].getAttribute("data-key")
                        }, () => this.props.onChange(this.state))
                    }}>
                        <option data-key="ABY">ABY</option>
                        <option data-key="BBY">BBY</option>
                    </select>
                </div>
            </div>
        )
    }
}