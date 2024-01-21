


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

let compactcarsnos=0;
let mediumcarsnos=0;
let fullsizecarsnos=0;
let class1trucksnos=0;
let class2trucksnos=0

let compactcarsturn=0;
let mediumcarsturn=0;
let fullsizecarsturn=0;
let class1trucksturn=0;
let class2trucksturn=0



let rejectCompactCarsarray=[]
let rejectmeduimcarsarray=[]
let rejectfullsizearray=[]
let rejectClass1array=[]
let rejectClass2array=[]

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


let todayDate = new Date("2022-10-20 18:12"); // Example: 22 November 2022, 5PM
let stardate = new Date(todayDate.setHours(7))



function loadCSV() {
    $.ajax({
        type: 'GET',
        url: "http://localhost:8080/api/v1/user/csv",
        success: function (data) {
            const secondDateKey = "2022-11-27 07:16";

            data.sort((a, b) => {
                let dateA = new Date(a[secondDateKey]);
                let dateB = new Date(b[secondDateKey]);
                return dateA - dateB;

            })
            csvData = data;
            
            for (let i in data) {
                while (new Date(stardate.toISOString).getTime < new Date(todayDate.toISOString).getTime){

                    if(new Date(data[i]["2022-11-27 07:16"]).getDate() ===todayDate.getDate())
                    {
                        
                        
                        let registrationTime = new Date(data[i]["2022-11-27 07:16"]); // Assuming this is the key in your CSV
                        let vehicleType = data[i].compact; // Assuming this is the key in your CSV
                        let timeLimit = getTimeLimitForType(vehicleType);
                        
                        let timeDifference = todayDate - registrationTime;
                        
                // Check if the registration time is within the time limit
                if (timeDifference >= 0 && timeDifference <= timeLimit) {
                    console.log(data[i]["2022-11-27 07:16"]);
                    updateIconBasedOnType(data[i],vehicleType);
                }
            }
            console.log("doing")
            stardate = new Date(stardate.getTime() + 30 *60*1000); // Add 1000
        }
    }
calculate()

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
function updateIconBasedOnType(data,vehicleType) {
    let iconId="";

    switch (vehicleType.toLowerCase()) {
        case 'compact':
            console.log("something");
            iconId=checkicon(vehicleType.toLowerCase());
            if (!iconId) {
                iconId = 'compactCarIcon';
                compactCars=true;
            }else{
                rejectCompactCarsarray.push(data);
                break;
                
            }
            compactCarsarray.push(data)
             settimelimit("compact",iconId,30*60*1000); 
                break;

        case 'medium':
            iconId=checkicon(vehicleType.toLowerCase());
            console.log("something");
            if (!iconId) {
                iconId = 'mediumCarIcon';
                meduimcars=true;
            }else{
                rejectMeduimCarsarray.push(data);
                break;
                
            }
            meduimcarsarray.push(data)
                settimelimit("medium",iconId,30*60*1000); 
                break;
        case 'full-size':
            iconId=checkicon(vehicleType.toLowerCase());
            if (!iconId) {
                iconId = 'fullSizeCarIcon';
                fullsizecars=true;
            }else{
                rejectfullsizeCarsarray.push(data);
                break;
                
            }
            fullsizecarsarray.push(data)
            settimelimit("full",iconId,2*60*60*1000); 
                break;
        case 'class 1 truck':
            iconId=checkicon(vehicleType.toLowerCase());
            if (!iconId) {
                
                iconId = 'class1TruckIcon';
                class1=true;
                
            }else{
                rejectClass1Carsarray.push(data);
                break;
                
            }
            class1array.push(data)
            settimelimit("class1",iconId,60*60*1000); 
            
                break;
        case 'class 2 truck':
            iconId=checkicon(vehicleType.toLowerCase());
            if (!iconId) {
                if (!class2){
                console.log("yess")
                iconId = 'class2TruckIcon';
                class2=true;}
            }else{
                console.log("no")
                rejectClass2array.push(data);
                break;
                
            }
            console.log("yess")
            class2array.push(data)
            settimelimit("class2",iconId,120*60*1000); 
                break;
            
            
        default:
            return; // Do nothing if vehicle type doesn't match
    }

    if (iconId) {
        // document.getElementById(iconId).style.color = "red"; 
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


function settimelimit(type,iconId,duration){
    setTimeout(function()   {           
    if(iconId==="compactCarIcon"){ 
        compactCars=false;
        document.getElementById(iconId).style.color = "green"; // Example: Change the color of the icon
    }if(iconId==="mediumCarIcon"){ 
        meduimcars=false;
        document.getElementById(iconId).style.color = "green"; // Example: Change the color of the icon
    }if(iconId==="fullSizeCarIcon"){ 
        fullsizecars=false;
        document.getElementById(iconId).style.color = "green"; // Example: Change the color of the icon
    }if(iconId==="class1TruckIcon"){  
        class1=false;
        document.getElementById(iconId).style.color = "green"; // Example: Change the color of the icon
    }if(iconId==="class2TruckIcon"){ 
        class2=false;
        document.getElementById(iconId).style.color = "green"; // Example: Change the color of the icon
    }
    else if(iconId==="open1"){
        openforall1=false;
        document.getElementById(iconId).style.color = "green"; // Example: Change the color of the icon
    }else if(iconId==="open2"){
        openforall2false;
        document.getElementById(iconId).style.color = "green"; // Example: Change the color of the icon
    }else if(iconId==="open3"){
        openforall3=false;
        document.getElementById(iconId).style.color = "green"; // Example: Change the color of the icon
    }else if(iconId==="open4"){
        openforall4=false;
        document.getElementById(iconId).style.color = "green"; // Example: Change the color of the icon
    }else if(iconId==="open5"){
        openforall5=false;
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

console.log(class2array);

function calculate(){

    compactcarsnos=compactCarsarray.length
    mediumcarsnos=meduimcarsarray.length;
    fullsizecarsnos=fullsizecarsarray.length;
    class1trucksnos=class1array.length;
    class2trucksnos=class2array.length

    compactcarsturn=rejectCompactCarsarray.length
    mediumcarsturn=rejectmeduimcarsarray.length;
    fullsizecarsturn=rejectfullsizearray.length;
    class1trucksturn=rejectClass1array.length;
    class2trucksturn=rejectClass2array.length

    myBarChart= document.getElementById("myBarChart");
    newDataValues=[compactCarsarray.length, meduimcarsarray.length, fullsizecarsarray.length, class1array.length, class2array.length]
    myBarChart.data = newDataValues;
console.log(class2array.length);

let compactcarsRevenue=compactcarsnos*150;
let mediumcarsRevenue=mediumcarsnos*150;
let fullsizecarsRevenue=fullsizecarsnos*150;
let class1trucksRevenue=class1trucksnos*250;
let class2trucksRevenue=class2trucksnos*750

document.getElementById("compactcarsRevenue").innerText=`${compactcarsRevenue} $`;
document.getElementById("mediumcarsRevenue").innerText=`${mediumcarsRevenue} $`;
document.getElementById("fullsizecarsRevenue").innerText=`${fullsizecarsRevenue} $`;
document.getElementById("class1trucksRevenue").innerText=`${class1trucksRevenue} $`;
document.getElementById("class2trucksRevenue").innerText=`${class2trucksRevenue} $`;

let compactcarsRevenuelost=compactcarsturn*150;
let mediumcarsRevenuelost=mediumcarsturn*150;
let fullsizecarsRevenuelost=fullsizecarsturn*150;
let class1trucksRevenuelost=class1trucksturn*250;
let class2trucksRevenuelost=class2trucksturn*750

document.getElementById("compactcarsRevenuelost").innerText=`${compactcarsRevenuelost} $`;
document.getElementById("mediumcarsRevenuelost").innerText=`${mediumcarsRevenuelost} $`;
document.getElementById("fullsizecarsRevenuelost").innerText=`${fullsizecarsRevenuelost} $`;
document.getElementById("class1trucksRevenuelost").innerText=`${class1trucksRevenuelost} $`;
document.getElementById("class2trucksRevenuelost").innerText=`${class2trucksRevenuelost} $`;




}


