import { describe, it, expect } from 'vitest'

import { filterPeople, isBefore } from "../utils/filterPeople"

const luke = {
    "name": "Luke Skywalker",
    "species": ["human"],
    "birth_year": "10BBY",
    "films": ["film1", "film2", "film3"],
    "url": "luke"
}

const chewbacca = {
    "name": "Chewbacca",
    "species": ["wookie"],
    "birth_year": "100BBY",
    "films": ["film1", "film3"],
    "url": "chewbacca"
}

const r2d2 = {
    "name": "r2d2",
    "species": ["droid"],
    "birth_year": "100ABY",
    "films": ["film2"],
    "url": "r2d2"
}

const c3po = {
    "name": "c3po",
    "species": ["droid"],
    "birth_year": "10ABY",
    "films": ["film2", "film7"],
    "url": "c3po"
}

const allTestPeople = [luke, chewbacca, r2d2, c3po]

describe("filterPeople", () => {
    it("should return same list if no filter applied", () => {
        expect(filterPeople(allTestPeople)).toEqual(allTestPeople)
    })
    
    it("should return people of droid species", () => {
        const filter = new Map([
            ["speciesUrl", "droid"]
        ])
        const droidsOnly = filterPeople(allTestPeople, filter)
        expect(droidsOnly).toEqual([r2d2, c3po])
    })
    
    it("should return people of film1", () => {
        const filter = new Map([
            ["filmUrl", "film1"]
        ])
        const film1Only = filterPeople(allTestPeople, filter)
        expect(film1Only).toEqual([luke, chewbacca])
    })
    
    it("should return people of droid species AND of film7", () => {
        const filter = new Map([
            ["filmUrl", "film7"],
            ["speciesUrl", "droid"]
        ])
        expect(filterPeople(allTestPeople, filter)).toEqual([c3po])
    })
    
    it("should return empty list of unknown species", () => {
        const filter = new Map([
            ["speciesUrl", "unknown123"]
        ])
        expect(filterPeople(allTestPeople, filter)).toEqual([])
    })

    it("should return people with birth_year after 1BBY", () => {
        const filter = new Map([
            ["startYear", "1BBY"]
        ])
        expect(filterPeople(allTestPeople, filter)).toEqual([r2d2, c3po])
    })

    it("should return people with birth_year before 200ABY", () => {
        const filter = new Map([
            ["endYear", "200ABY"]
        ])
        expect(filterPeople(allTestPeople, filter)).toEqual(allTestPeople)
    })

    it("should return people with birth_year within 30BBY and 30ABY", () => {
        const filter = new Map([
            ["startYear", "30BBY"],
            ["endYear", "30ABY"]
        ])
        expect(filterPeople(allTestPeople, filter)).toEqual([luke, c3po])
    })
})

describe("isBefore", () => {
    it("should compare dates correctly", () => {
        expect(isBefore("1BBY", "1BBY")).toEqual(false)
        expect(isBefore("100BBY", "99BBY")).toEqual(true)
        expect(isBefore("100BBY", "100BBY")).toEqual(false)
        expect(isBefore("100ABY", "100ABY")).toEqual(false)
        expect(isBefore("99ABY", "100ABY")).toEqual(true)
        expect(isBefore("100BBY", "100ABY")).toEqual(true)
        expect(isBefore("99BBY", "100BBY")).toEqual(false)
    })
})