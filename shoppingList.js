import{initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import{getDatabase, push, ref, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings= {
     databaseURL: "https://playground2-71a4a-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

let addToCartEl = document.getElementById("add-button")
let inputFieldEl = document.getElementById("input-field")
const ulEl= document.getElementById("shopping-list")


addToCartEl.addEventListener("click", function() {
     let inputValue = inputFieldEl.value
     push(shoppingListInDB, inputValue)
     clearInputField ()
})

onValue (shoppingListInDB, function(snapshot) {
     if (snapshot.exists()) {
          let itemsArray = Object.entries(snapshot.val())
     
          clearShoppingListEl ()
     
     for (let i=0; i<itemsArray.length; i++) {
         
          let currentItem = itemsArray[i]
          let currentItemID = currentItem[0]
          let currentItemValue = currentItem[1]
    
          appendItemToShoppingListEl(currentItem)
     
     }

     } else {
          ulEl.innerHTML="No items here...yet"
     }
     
})


function clearShoppingListEl () {
     ulEl.innerHTML= " "
}

function clearInputField () {
     inputFieldEl.value=" "
}

function appendItemToShoppingListEl (item) {
     let itemID=item[0]
     let itemValue=item[1]


let newEl=document.createElement("li")
newEl.textContent = itemValue

newEl.addEventListener("click", function() {
     let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
     remove(exactLocationOfItemInDB)
})
     ulEl.append(newEl)
}