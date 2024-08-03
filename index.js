const example = document.getElementById("btn1").addEventListener("click", expand);

function expand(){
    //insert a condition to see if the city is valid, if not show an error
    let input = document.getElementById("search");
    if(input.value.trim() === ""){
        return alert("Please enter a city name !");
    }
    return document.getElementById("container").style.height = "400px",
    document.getElementById("container").style.transition = "height 1s"; 
}