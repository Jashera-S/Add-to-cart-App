import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase , ref , push,onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL : "https://playground-11c58-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database=getDatabase(app);
const shoppingListInDb= ref(database,"shoppingListInDb");


const inputFieldEl = document.getElementById("input-field");
const addbuttonEL = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");


 addbuttonEL.addEventListener("click",function() {
    let inputvalue = inputFieldEl.value;
    console.log(inputvalue);
    push(shoppingListInDb,inputvalue)
    
    clearInputField()
    
   

 })
  onValue ( shoppingListInDb,function(snapshot){
    
    if (snapshot.exists(true)){

        let shoppingarray= Object.entries(snapshot.val());
    
    clearShoppingList();
    
     for( let i = 0; i < shoppingarray.length;i++){
        let itemarray = shoppingarray[i];

        console.log(itemarray)
        addItemInList(itemarray);

     } 
    }
    else{
        shoppingListEl.innerHTML="No items here...  yet" 
    }
  })

function clearShoppingList(){
    shoppingListEl.innerHTML=""
}

function clearInputField(){
     inputFieldEl.value = ""
}
  
function addItemInList(item){
//     shoppingListEl.innerHTML += `<li>${itemvalue}</li>`
let itemId = item[0];
let itemvalue= item[1];
let newEl = document.createElement("li");
newEl.textContent= itemvalue;
shoppingListEl.append(newEl)
 
newEl.addEventListener("dblclick", function(){
    let exactlocationoftheitem = ref(database,`shoppingListInDb/${itemId}`)
  remove (exactlocationoftheitem);

})

}
