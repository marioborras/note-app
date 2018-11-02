const titleElement =document.querySelector("#note-title")
const bodyElement =document.querySelector("#note-body")
const dateElement =document.querySelector("#last-edit")
const noteID = location.hash.substring(1)
let notes = getSavedNotes()
let note = notes.find(function(note){
    return note.id === noteID
})

if (note === undefined) {
    location.assign('/index.html')
} 

titleElement.value = note.title
bodyElement.value = note.body
dateElement.textContent = generateLastEdited(note.updatedAt)  

titleElement.addEventListener("input", function(e){
note.title = e.target.value
note.updatedAt = moment().valueOf()
dateElement.textContent = generateLastEdited(note.updatedAt)
saveNotes(notes)

})

bodyElement.addEventListener("input", function(e){
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    dateElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

document.querySelector("#remove-note").addEventListener("click", function(){
    removeNote(note.id)
    saveNotes(notes)
    location.assign("/index.html")
})

window.addEventListener('storage', function(e){
    if(e.key === "notes"){
        notes=JSON.parse(e.newValue)
        note = notes.find(function(note){
            return note.id === noteID
        })
        
        if (note === undefined) {
            location.assign('/index.html')
        }   
        titleElement.value = note.title
        bodyElement.value = note.body
        dateElement.textContent = generateLastEdited(note.updatedAt) 

    }
})
