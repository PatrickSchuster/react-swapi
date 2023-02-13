import { render, screen } from "@testing-library/react"
import Counter from "../components/counter/counter"

it("should render the matchCount prop", () => {
    render(<Counter matchCount="123"/>)
    expect(screen.getByTestId("counter")).toHaveTextContent("123")
})