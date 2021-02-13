class User{
    constructor(clicks){
        this.clicks = clicks;
    }
}

var currentUser;

fetchUser();

document.getElementById("clickButton").addEventListener("click", addClick);

function addClick() {
    currentUser.clicks++;
    updateUI();
    saveUser();
}

function saveUser(){
    window.localStorage.setItem('user', JSON.stringify(currentUser));
}

function fetchUser(){
    var temp = JSON.parse(window.localStorage.getItem('user'));
    if(temp == null){
        currentUser= new User(0);
    }
    else{
        currentUser = new User(temp.clicks);
        updateUI();
    }
}

function updateUI(){
    document.getElementById("clickNbText").innerHTML = currentUser.clicks;
}

//modal behavior 

var modal = document.getElementById("mainModal");
var closemodalbtn = document.getElementById("closemodalbutton");
var okButton = document.getElementById("okmodalbutton");
var cancelButton = document.getElementById("cancelmodalbutton");

closemodalbtn.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

okButton.onclick = function() {
    if(okButton.innerHTML=="delete it"){
        deleteUser();
    }
}

cancelButton.onclick = function() {
    modal.style.display = "none";
}

//delete user

var deleteinfobutton = document.getElementById("deleteinfobutton");

deleteinfobutton.onclick = function() {
    document.getElementById("modal-text").innerHTML= "are you sure you want to delete your information?<br>this will reset all of your data, including your clicks";
    modal.style.display = "block";
    okButton.innerHTML= "delete it";
    cancelButton.innerHTML="no what the fuck";
}

function deleteUser(){
    window.localStorage.removeItem('user');    
}