module.exports = (people, places, things) => {
    return `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>People, Places, Things</title>
        </head>
        <body>
            <form method="POST" action="/purchase?_method=PUT">
                <select name="person">
                    <option>-person-</option>
                    ${people.map((person) => {
                        return `<option value=${person.id}>${person.name}</option>`
                    })}
                </select>
                <select name="place">
                    <option>-place-</option>
                    ${places.map((place) => {
                        return `<option value=${place.id}>${place.name}</option>`
                    })}
                </select>
                <select name="thing">
                    <option>-thing-</option>
                    ${things.map((thing) => {
                        return `<option value=${thing.id}>${thing.name}</option>`
                    })}
                </select>
                <input type="number" autocomplete="off" name="count" />
                <input type="date" autocomplete="off" name="count" />
                <button type="submit">Create Purchase</button>
            </form>
            <h3>People (${people.length})</h3>
            <ul>
                ${people.map((person) => {
                    return `<li>${person.name}</li>`
                }).join("")}
            </ul>
            <h3>Places (${places.length})</h3>
            <ul>
                ${places.map((place) => {
                    return `<li>${place.name}</li>`
                }).join("")}
            </ul>
            <h3>Things (${things.length})</h3>
            <ul>
                ${things.map((thing) => {
                    return `<li>${thing.name}</li>`
                }).join("")}
            </ul>
        </body>
        </html>
    `
}