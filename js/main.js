class User{
    constructor(clicks){
        this.clicks = clicks;
    }
}

var currentUser;

fetchUser();

document.getElementById("clickBtn").addEventListener("click", addClick);

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
var closeModalBtn = document.getElementById("closeModalBtn");
var okBtnModal = document.getElementById("okModalBtn");
var cancelBtnModal = document.getElementById("cancelModalBtn");
var modalText = document.getElementById("textModal");

closeModalBtn.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

okBtnModal.onclick = function() {
    if(okBtnModal.innerHTML=="delete it"){
        deleteUser();
    }
}

cancelBtnModal.onclick = function() {
    modal.style.display = "none";
}

//delete user

var deleteinfobtn = document.getElementById("deleteInfoBtn");

deleteinfobtn.onclick = function() {
    modalText.innerHTML= "are you sure you want to delete your information?<br>this will reset all of your data, including your clicks";
    modal.style.display = "block";
    okBtnModal.innerHTML= "delete it";
    cancelBtnModal.innerHTML="no what the fuck";
}

function deleteUser(){
    window.localStorage.removeItem('user');  
    location.reload();  
}