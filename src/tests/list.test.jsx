import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"

import List from "../components/list/list"

it("should render the loading spinner", () => {
    render(<BrowserRouter>
        <List isLoading={true}/>
    </BrowserRouter>)
    expect(screen.getByTestId("loading")).toBeInTheDocument()
})

it("should render a placeholder if the given people array is empty", () => {
    render(<BrowserRouter>
        <List isLoading={false} people={[]}/>
    </BrowserRouter>)
    expect(screen.getByTestId("loading")).toHaveTextContent("No people matching the given filter 🙈")
})

it("should render a list of people", () => {
    const  people = [
        {
            name: "Luke",
            url: "luke.url"
        },
        {
            name: "Leia",
            url: "leia.url"
        },
        {
            name: "Chewbacca",
            url: "chewbacca.url"
        }
    ]
    render(<BrowserRouter>
        <List isLoading={false} people={people}/>
    </BrowserRouter>)
    const htmlList = `
    <ul
  class="list"
  data-testid="list"
>
  <li
    class="item"
  >
    Luke
  </li>
  <li
    class="item"
  >
    Leia
  </li>
  <li
    class="item"
  >
    Chewbacca
  </li>
</ul>
    `
    expect(screen.getByTestId("list")).toMatchInlineSnapshot(htmlList)
})