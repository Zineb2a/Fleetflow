


let csvData = []; // Global variable to store CSV data


let compactCars = false;
let meduimcars = false;
let fullsizecars =false;
let class1=false;
let class2=false;
let openforall1 = false;
let openforall2 = false;
let openforall3 = false
let openforall4 = false;
let openforall5 = false 






let compactCarsarray=[];
let meduimcarsarray=[];
let fullsizecarsarray=[]
let class1array=[]
let class2array=[]
let openforall1array=[];
let openforall2array=[];
let openforall3array=[]
let openforall4array=[];
let openforall5array=[] 


let todayDate = new Date("2022-10-17 7:12"); // Example: 22 November 2022, 5PM

function loadCSV() {
    let todayDate = new Date("2022-10-20T09:01:00");

    $.ajax({
        type: 'GET',
        url: "http://localhost:8080/api/v1/user/csv",
        success: function (data) {
            // Assuming the data is an array of objects and each object has a property 'registrationTime'
            // Sort the data based on 'registrationTime'
            csvData = data.sort((a, b) => new Date(a["2022-11-27 07:16"]) - new Date(b["2022-11-27 07:16"]));

            for (let i in csvData) {
                let registrationTime = new Date(csvData[i]["2022-11-27 07:16"]);
                let vehicleType = csvData[i].vehicleType; // Replace with the actual key for vehicle type
                let timeLimit = getTimeLimitForType(vehicleType);

                if (registrationTime.toDateString() === todayDate.toDateString()) {
                    let timeDifference = todayDate - registrationTime;

                    if (timeDifference >= 0 && timeDifference <= timeLimit) {
                        console.log(csvData[i]["2022-11-27 07:16"]);
                        updateIconBasedOnType(vehicleType);
                    }
                }
            }
        }
    });
}




function loadCSV() {
    $.ajax({
        type: 'GET',
        url: "http://localhost:8080/api/v1/user/csv",
        success: function (data) {
            csvData = data;

            
            for (let i in data) {
                if(new Date(data[i]["2022-11-27 07:16"]).getDate() ===todayDate.getDate())
                {
                

                let registrationTime = new Date(data[i]["2022-11-27 07:16"]); // Assuming this is the key in your CSV
                let vehicleType = data[i].compact; // Assuming this is the key in your CSV
                let timeLimit = getTimeLimitForType(vehicleType);

                let timeDifference = todayDate - registrationTime;
                
                // Check if the registration time is within the time limit
                if (timeDifference >= 0 && timeDifference <= timeLimit) {
                    console.log(data[i]["2022-11-27 07:16"]);
                    updateIconBasedOnType(vehicleType);
                }
            }
        }
        }
    });
}

function getTimeLimitForType(vehicleType) {
    switch (vehicleType.toLowerCase()) {
        case 'compact': return 30 * 60 * 1000; // 30 minutes
        case 'medium': return 30 * 60 * 1000; // 30 minutes
        case 'full-size': return 30 * 60 * 1000; // 30 minutes
        case 'class 1 truck': return 60 * 60 * 1000; // 60 minutes
        case 'class 2 truck': return 120 * 60 * 1000; // 120 minutes
        default: return 0;
    }
}
function updateIconBasedOnType(vehicleType) {
    let iconId="";

    switch (vehicleType.toLowerCase()) {
        case 'compact':
            console.log("something");
            iconId=checkicon(vehicleType.toLowerCase());
            if (!iconId) {
                iconId = 'compactCarIcon';
                compactCars=true;
            }
             settimelimit("compact",iconId,30*60*1000); 
                break;

        case 'medium':
            iconId=checkicon(vehicleType.toLowerCase());
            console.log("something");
            if (!iconId) {
                iconId = 'mediumCarIcon';
                meduimcars=true;
            }
                settimelimit("medium",iconId,30*60*1000); 
                break;
        case 'full-size':
            iconId=checkicon(vehicleType.toLowerCase());
            if (!iconId) {
                iconId = 'fullSizeCarIcon';
                fullsizecars=true;
            }
            settimelimit("full",iconId,2*60*60*1000); 
                break;
        case 'class 1 truck':
            iconId=checkicon(vehicleType.toLowerCase());
            if (!iconId) {
                
                iconId = 'class1TruckIcon';
                class1=true;
                
            }
            settimelimit("class1",iconId,60*60*1000); 
            
                break;
        case 'class 2 truck':
            iconId=checkicon(vehicleType.toLowerCase());
            if (!iconId) {
                if (!class2){
                console.log("yess")
                iconId = 'class2TruckIcon';
                class2=true;}
            }
            
            settimelimit("class2",iconId,120*60*1000); 
                break;
            
            
        default:
            return; // Do nothing if vehicle type doesn't match
    }

    if (iconId) {
        document.getElementById(iconId).style.color = "red"; 
        iconId=true;;
        // Example: Change the color of the icon
        // You can add more styling changes or swap the icon image here
    }
}


function checkicon(vehicleType) {
if (!openforall1){
    openforall1=true;
    return "open1"
}
else if (!openforall2){
    openforall2=true;
    return "open2"
}else if (!openforall3){
    openforall3=true;
    return "open3"
}else if (!openforall4){
    openforall4=true;
    return "open4"
}else if(!openforall5){
    openforall5=true;
    return "open5"
} else{
    return false
}
}
// window.onload = loadCSV();


// function loadCSV() {
//     $.ajax({
//         type: 'GET',
//         url: "http://localhost:8080/api/v1/user/csv",
    
//         success: function (data) {
//            csvData = data
           
//        
  
//           }  



//     })
// }
// console.log(csvData)



function settimelimit(type,iconId,duration){
    setTimeout(function()   {           
    if(iconId==="compactCarIcon"){ 
        compactCars=false;
        compactCarsarray=[]
        document.getElementById(iconId).style.color = "green"; // Example: Change the color of the icon
    }if(iconId==="mediumCarIcon"){ 
        meduimcars=false;
        meduimcarsarray=[]
        document.getElementById(iconId).style.color = "green"; // Example: Change the color of the icon
    }if(iconId==="fullSizeCarIcon"){ 
        fullsizecars=false;
        fullsizecarsarray=[]
        document.getElementById(iconId).style.color = "green"; // Example: Change the color of the icon
    }if(iconId==="class1TruckIcon"){  
        class1=false;
        class1array=[]
        document.getElementById(iconId).style.color = "green"; // Example: Change the color of the icon
    }if(iconId==="class2TruckIcon"){ 
        class2=false;
        class2array=[]
        document.getElementById(iconId).style.color = "green"; // Example: Change the color of the icon
    }
    
    
    
    else if(iconId==="open1"){
        openforall1=false;
        openforall1array=[]
        document.getElementById(iconId).style.color = "green"; // Example: Change the color of the icon
    }else if(iconId==="open2"){
        openforall2false;
        openforall2array=[]
        document.getElementById(iconId).style.color = "green"; // Example: Change the color of the icon
    }else if(iconId==="open3"){
        openforall3=false;
        openforall3array=[]
        document.getElementById(iconId).style.color = "green"; // Example: Change the color of the icon
    }else if(iconId==="open4"){
        openforall4=false;
        openforall4array=[]
        document.getElementById(iconId).style.color = "green"; // Example: Change the color of the icon
    }else if(iconId==="open5"){
        openforall5=false;
        openforall5array=[]
        document.getElementById(iconId).style.color = "green"; // Example: Change the color of the icon
    }else{
    }   
    loadCSV()
    },duration)

    
}



onload = loadCSV()
function incrementDate() {
    if (todayDate.getTime() ==="") //
    todayDate = new Date(todayDate.getTime() + 1000); // Add 1000 milliseconds (1 second)
    console.log(todayDate); // For demonstration, you can remove this line or update the DOM instead
}

setInterval(incrementDate, 1000); // Call incrementDate every 1000 milliseconds (1 second)
console.log(compactCars); 
console.log(meduimcars); 
console.log(fullsizecars); 
console.log(class1); 
console.log(class2);

