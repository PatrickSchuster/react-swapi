export function filterPeople(list, filter) {
    if (!filter) {
        return list
    }

    let filtered = list
    if (filter.has("filmUrl") && filter.get("filmUrl") !== "all") {
        filtered = filtered.filter(p => p.films.includes(filter.get("filmUrl")))
    }
    if (filter.has("speciesUrl") && filter.get("speciesUrl") !== "all") {
        filtered = filtered.filter(p => p.species.includes(filter.get("speciesUrl")))
    }
    if (filter.has("startYear") && filter.get("startYear").endsWith("BY") && filter.get("startYear").length > 3) {
        filtered = filtered.filter(p => !isBefore(p.birth_year, filter.get("startYear")))
    }
    if (filter.has("endYear") && filter.get("endYear").endsWith("BY") && filter.get("endYear").length > 3) {
        filtered = filtered.filter(p => isBefore(p.birth_year, filter.get("endYear")))
    }

    return filtered
}

export function isBefore(year1, year2) {
    const year1Number = Number(year1.substring(0, year1.length-3))
    const year1Marker = year1.substring(year1.length-3)
    const year2Number = Number(year2.substring(0, year2.length-3))
    const year2Marker = year2.substring(year2.length-3)

    if (year1Marker === "BBY" && year2Marker === "ABY") {
       return true
    }
    if (year1Marker === "ABY" && year2Marker === "BBY") {
        return false
    }
    if (year1Marker === "BBY" && year2Marker === "BBY") {
        return year1Number > year2Number
    }
    if (year1Marker === "ABY" && year2Marker === "ABY") {
        return year1Number < year2Number
    }
    return false
}