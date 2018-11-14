"use strict"
let notes = getSavedNotes()


const filters = {
    searchText: "",
    sortby: "byEdited"
}

renderNotes(notes,filters)

document.querySelector("#create-note").addEventListener("click", (e) =>{
    const id = uuidv4()
    const timestamp = moment().valueOf()
    notes.push({
        id: id,
        title: "",
        body: "",
        createdAt: timestamp,
        updatedAt: timestamp
    })
    saveNotes(notes)
    location.assign(`/edit.html#${id}`)

})

document.querySelector("#search-text").addEventListener("input", (e) =>{
    filters.searchText = e.target.value
    renderNotes(notes,filters)
})
document.querySelector('#filter-by').addEventListener("change", (e) =>{
    filters.sortBy = e.target.value
    renderNotes(notes,filters)
})
//listen if there was any change to storage. allows multiple tabs and changes
window.addEventListener("storage", (e) =>{
    if (e.key ==="notes"){
        notes=JSON.parse(e.newValue)
        renderNotes(notes,filters)
    }
})

