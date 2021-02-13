class User{
    constructor(clicks){
        this.clicks = clicks;
    }
}

var temp;
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
    temp = JSON.parse(window.localStorage.getItem('user'));
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