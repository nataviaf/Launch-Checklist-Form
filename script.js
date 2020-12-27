// Write your JavaScript code here!
window.addEventListener("load", function() {
   let form = document.querySelector("form");   

   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then(function(json){
         let count = Object.keys(json).length; 
         let ranNum = Math.floor(Math.random() * count);
         const div = document.getElementById("missionTarget");
         div.innerHTML = `<h2>Mission Destination</h2>
         <ol>
            <li>Name: ${json[ranNum].name}</li>
            <li>Diameter: ${json[ranNum].diameter}</li>
            <li>Star: ${json[ranNum].star}</li>
            <li>Distance from Earth: ${json[ranNum].distance}</li>
            <li>Number of Moons: ${json[ranNum].moons}</li>
         </ol>
         <img src="${json[ranNum].image}"> `
         //console.log(json);
      })              
   } );

   form.addEventListener("submit", function(event) {

      let pilotNameInput = document.querySelector("input[name=pilotName]");
      let copilotNameInput = document.querySelector("input[name=copilotName]");
      let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
      let cargoMassInput = document.querySelector("input[name=cargoMass]");

      if(pilotNameInput.value === '' || copilotNameInput.value === '' || fuelLevelInput.value === '' || cargoMassInput.value === ''){
         alert("All fields are required!");
         document.getElementById("faultyItems").style.visibility = "hidden";
         let launchStatusText = document.getElementById("launchStatus");
         launchStatusText.innerHTML = "Awaiting Information Before Launch";
         launchStatusText.style.color = "black"; 
      }  
      else { 
         if(isNaN(Number(pilotNameInput.value)) === false || isNaN(Number(copilotNameInput.value)) === false|| isNaN(Number(fuelLevelInput.value)) || isNaN(Number(cargoMassInput.value))) {
            alert("Make sure to enter valid information for each");
            document.getElementById("faultyItems").style.visibility = "hidden";
            let launchStatusText = document.getElementById("launchStatus");
            launchStatusText.innerHTML = "Awaiting Information Before Launch";
            launchStatusText.style.color = "black";            
         } else {
            document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotNameInput.value} is ready for launch`;
            document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilotNameInput.value} is ready for launch`;  
         
            if(Number(fuelLevelInput.value) < 10000 || Number(fuelLevelInput.value) === 890){         
               document.getElementById("faultyItems").style.visibility = "visible";
               document.getElementById("fuelStatus").innerHTML = "Fuel level too low for launch"
               let launchStatusText = document.getElementById("launchStatus");
               launchStatusText.innerHTML = "Shuttle not ready for launch!";
               launchStatusText.style.color = "red";            
            }
            else{
               document.getElementById("fuelStatus").innerHTML = "Fuel level high enough for launch"
            }
            
            if(Number(cargoMassInput.value) >= 10000){         
               document.getElementById("faultyItems").style.visibility = "visible";
               document.getElementById("cargoStatus").innerHTML = "There is too much mass for the shuttle to take off"
               let launchStatusText = document.getElementById("launchStatus");
               launchStatusText.innerHTML = "Shuttle not ready for launch";
               launchStatusText.style.color = "red";            
            } else{
               document.getElementById("cargoStatus").innerHTML = "Cargo mass low enough for launch"
            }
   
            if(Number(cargoMassInput.value) < 10000 && Number(fuelLevelInput.value) >= 10000){
               let launchStatusText = document.getElementById("launchStatus");
               launchStatusText.innerHTML = "Shuttle is ready for launch";
               launchStatusText.style.color = "green";              
            } 
         }
      }   
      event.preventDefault();   
   });    
});