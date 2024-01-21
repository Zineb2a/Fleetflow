


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


let todayDate = new Date("2022-10-20 9:01"); // Example: 22 November 2022, 5PM

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
        case 'compact car': return 30 * 60 * 1000; // 30 minutes
        case 'medium car': return 45 * 60 * 1000; // 45 minutes
        case 'full-size car': return 30 * 60 * 1000; // 30 minutes
        case 'class 1 truck': return 60 * 60 * 1000; // 60 minutes
        case 'class 2 truck': return 120 * 60 * 1000; // 120 minutes
        default: return 0;
    }
}
function updateIconBasedOnType(vehicleType) {
    let iconId="";

    switch (vehicleType.toLowerCase()) {
        case 'compact':
            iconId=checkicon(vehicleType.toLowerCase());
            if (!iconId) {
                iconId = 'compactCarIcon';
                compactCars=true;
            }
            break;
        case 'medium':
            iconId=checkicon(vehicleType.toLowerCase());
            if (!iconId) {
                iconId = 'mediumCarIcon';
                compactCars=true;
            }
            break;
        case 'full-size':
            iconId=checkicon(vehicleType.toLowerCase());
            if (!iconId) {
                iconId = 'fullSizeCarIcon';
                compactCars=true;
            }
            break;
        case 'class 1 truck':
            iconId=checkicon(vehicleType.toLowerCase());
            if (!iconId) {
                iconId = 'class1TruckIcon';
                compactCars=true;
            }
            break;
        case 'class 2 truck':
            iconId=checkicon(vehicleType.toLowerCase());
            if (!iconId) {
                iconId = 'class2TruckIcon';
                compactCars=true;
            }
            break;
        default:
            return; // Do nothing if vehicle type doesn't match
    }

    if (iconId) {
        document.getElementById(iconId).style.color = "red"; // Example: Change the color of the icon
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
onload = loadCSV()