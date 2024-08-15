import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js"
import { onValue, getDatabase, ref, push, remove } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js"

const inputEl = document.getElementById("input-el")
const addBtn = document.getElementById("add-btn")
const itemsEl = document.getElementById("items-el")
const appSettings = {
    databaseURL : "https://groceries-app-cad9b-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemsInDB = ref(database,"Groceries")

addBtn.addEventListener("click", function() {
    
    let inputValue = inputEl.value
    push(itemsInDB,inputValue)
    inputEl.value = ""
    
})


onValue( itemsInDB, function(snapshot) {
    
    itemsEl.innerHTML = ""
    if (snapshot.exists()) {
        let valuesFromDB = Object.entries(snapshot.val())
        let groceriesFromDB = Object.values(snapshot.val())
        render(valuesFromDB)
    } else {
        
        itemsEl.innerHTML = "No Items Yet"
    }
    
   
})

function render(allValues) {
    
    for (let i = 0; i < allValues.length; i++) {
        
        let listEl = document.createElement("li")
        listEl.className = "listelements"        
        listEl.textContent = `${allValues[i][1]}`
        itemsEl.append(listEl)  
        listEl.addEventListener("click", function() {
            
            let itemToBeRemoved = ref(database,`Groceries/${allValues[i][0]}`)
            remove( itemToBeRemoved )
        })
    }
} 

 




