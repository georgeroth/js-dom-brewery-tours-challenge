const state = {
    breweries: [],
    currentlyFilteredBreweries: []
}

init()

function init() {
    mainStateSearch()
}

function mainStateSearch(){
    const mainSearchForm = document.querySelector("#select-state-form")
    const mainInputField = document.querySelector("#select-state")
    mainSearchForm.addEventListener("submit", (event) =>{
        event.preventDefault()
        console.log("Form submitted with data", mainInputField.value)
        sendAPICall(mainInputField.value) 
    })
}

function sendAPICall(userInput) {
    fetch(`https://api.openbrewerydb.org/breweries?by_state=${userInput}&?per_page=50`)
        .then((response) =>  {
            return response.json();
        })
        .then((breweries) => {
            state.breweries = breweries
            filterToMicroRegionalBrewpub()
            renderPage()
        })
}

function filterToMicroRegionalBrewpub() {
    console.log("before: ", state)
    state.breweries = state.breweries.filter((brewery) => {
        console.log(brewery.brewery_type)
        if (brewery.brewery_type !== "micro" && brewery.brewery_type && "regional" && brewery.brewery_type !== "brewpub") {
            console.log("This is not any of them!")
            return false
        }
        else {
          return true
        }
    })
}

function renderPage() {
    breweriesUL = document.querySelector("#breweries-list")
    breweriesUL.innerHTML = ''

    state.breweries.forEach((brewery) => {
        renderCards(brewery)
    })
}

function renderCards(brewery) {
    li = document.createElement('li')
    breweriesUL.appendChild(li)

    h2 = document.createElement('h2')
    h2.innerText = brewery.name
    li.appendChild(h2)

    div = document.createElement('div')
    div.setAttribute('class', 'type')
    div.innerText = brewery.brewery_type
    li.appendChild(div)

    section = document.createElement('section')
    section.setAttribute('class', 'address')
    li.appendChild(section)

    h3 = document.createElement('h3')
    h3.innerText = "Address:"
    section.appendChild(h3)

    p1 = document.createElement('p')
    p1.innerText = brewery.street
    section.appendChild(p1)

    p2 = document.createElement('p')
    section.appendChild(p2)

    strong = document.createElement('strong')
    strong.innerText = `${brewery.city}, ${brewery.postal_code}`
    p2.appendChild(strong)

    section2 = document.createElement('section')
    section2.setAttribute('class', 'phone')
    li.appendChild(section2)

    h3Phone = document.createElement('h3')
    h3Phone.innerText = "Phone"
    section2.appendChild(h3Phone)

    pPhone = document.createElement('p')
    pPhone.innerText = brewery.phone || "N/A"
    section2.appendChild(pPhone)

    section3 = document.createElement('section')
    section3.setAttribute('class', 'link')
    li.appendChild(section3)

    a = document.createElement('a')
    a.setAttribute('href', brewery.website_url)
    a.setAttribute('target', '_blank')
    a.innerText = 'Visit Website'
    section3.appendChild(a)
}

function filterListening () {
    const filterForm = document.addEventListener("#filter-by-type-form")
}


// API CALLS 
// https://api.openbrewerydb.org/breweries?by_state=new_york&by_type=micro
// https://api.openbrewerydb.org/breweries?by_state=new_york&by_type=regional
// https://api.openbrewerydb.org/breweries?by_state=new_york&by_type=brewpub

// ACCEPTANCE CRITERIA:
// 1. Connect to Open Brewery DB using Insomnia to figure out how to get the data
// 2. Add an event listener to the search button that:
// 3.  – Calls a function that imports relevant brewery data into local state based on state entered into search
// 4.  – And removes everything other than "Micro", "Regional" or "Brewpub"
// 5.  – Calls another function that renders the page from the local state as found in "standard-list-items.html"
// 6. Add an event listener to the filter dropdown that:
// 7.  – Calls a function that filters the state into another variable accordingly
// 8.  – Calls the render function
// 
// EXTENSION #1:
// 1. Add search section to index.html
// 2. Add event listener to each keyboard stroke in the input field that:
// 3.  – Calls a function that filters the state into another variable accordingly
// 4.  – Calls the render function
//
// EXTENSION #2:
// 1. Add cities outline into index.html
// 2. For each city, create a new tickbox in JS with its own event listener that: 
// 3.  – Calls a function that filters the state into another variable accordingly
// 4.  – Calls the render function
// 5. Add clear all button that re-runs the for each in point #2 (hopefully this will work)
//
// EXTENSION #3:
// 1. No idea about the pagination yet. Maybe filter and display breweries by index?
//
// EXTENSION #4:
// 1. If I ever get here, do something similar to the to-do-list...?