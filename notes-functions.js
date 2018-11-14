"use strict"

//read existing notes from localStorage
const getSavedNotes = ()=> {
    //check for existing saved data
    const notesJSON = localStorage.getItem("notes")
    try {
            // if noteJSON !== null rewritten with falsy
        return  notesJSON  ? JSON.parse(notesJSON) : []
    } catch (e) {
        return []
    }

    
}


//remove a note from the list 
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) =>  note.id === id)
    if (noteIndex > -1) {
        notes.splice(noteIndex,1)
    }
}
//save the notes to local storage

const saveNotes = (notes) => {
    localStorage.setItem("notes", JSON.stringify(notes))
}
//Generate the DOM Structure for a note

const generateNoteDOM = (note) => {
    
    const noteEl = document.createElement("div")
    const textEl = document.createElement("a")
    const button = document.createElement("button")
    //setup the remove note button
    button.textContent = "x"
    noteEl.appendChild(button)
    button.addEventListener('click',() => {
        removeNote(note.id)
        saveNotes(notes)
        renderNotes(notes,filters)
    })

    //setup the note title text
    note.title.length > 0 ? textEl.textContent = note.title : textEl.textContent = "unnamed note"
    
    textEl.setAttribute("href",`/edit.html#${note.id}`)
    noteEl.appendChild(textEl)
    return noteEl
}

//sort your notes by one of three ways
const sortNotes = (notes, sortBy) => {
    if(sortBy === "byEdited") {
        return notes.sort((a,b) => {
            if(a.updatedAt > b.updatedAt){
                return -1
            }else if (a.updatedAt < b.updatedAt) {
                return 1
            }else {
                return 0
            }
        })
    } else if (sortBy === "byCreated"){
        return notes.sort((a,b) => {
            if(a.createdAt > b.createdAt){
                return -1
            }else if (a.createdAt < b.createdAt) {
                return 1
            }else {
                return 0
            }
        })
    } else if (sortBy ==="alphabetical"){
        return notes.sort((a,b) => {
            if(a.title.toLowerCase() < b.title.toLowerCase()){
                return -1
            }else if(a.title.toLowerCase() > b.title.toLowerCase()){
                return 1
            }else {
                return 0
            }
        })
    }else{
        return notes
    }
}


//Render application notes

const renderNotes = (notes,filters)=>{
    const notesEl = document.querySelector("#notes")
    notes = sortNotes(notes,filters.sortBy)
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    notesEl.innerHTML =""
    if (filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            const noteEl = generateNoteDOM(note)
            notesEl.appendChild(noteEl)
          })
    }else {
        const emptyMessage = document.createElement ('p')
        emptyMessage.textContent = "No notes to show"
        notesEl.appendChild(emptyMessage)
    }
    
}

//generate time stamp 
const generateLastEdited = (timestamp) => `Last Updated: ${moment(timestamp).fromNow()}`
