

window.addEventListener("load", (event) => {
    initialize();
    doPageTasks();
});

function doPageTasks() {

    //segeregate tasks according to the page address
    var pageIdentifier = document.getElementById("pageIdentifier").innerHTML;
    console.log("You are now in " + pageIdentifier)
    switch (pageIdentifier) {
        case "mealsGuardianPage":
            mealsGuardianPageTasks();
            break;
        case "mealsPhoto":
            mealsPhotoPageTasks();
            break;
        case "exerciseGuardian":
            exerciseGuardianPageTasks();
            break;
        case "medicineGuardianPage":
            medicineGuardianPageTasks();
            break;


    }
}


function initialize() {
    console.log("Hello world");
    initializeFirebase();

}

function initializeFirebase() {
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyAKkCsFGiyrknZV9GmltiEuiw8J42yx7lI",
        authDomain: "dynabyte-8bdc2.firebaseapp.com",
        databaseURL: "https://dynabyte-8bdc2-default-rtdb.firebaseio.com",
        projectId: "dynabyte-8bdc2",
        storageBucket: "dynabyte-8bdc2.appspot.com",
        messagingSenderId: "844964808260",
        appId: "1:844964808260:web:3f5c90b6d486e5873f9e11",
        measurementId: "G-CDV2KEQC9V"
    };
    const app = firebase.initializeApp(firebaseConfig);
    console.log(app);
}

function mealsGuardianPageTasks() {
    console.log("You are now in meals guardian page")
    fetchMealFromFB()
    checkMealsColor();
}

function mealsPhotoPageTasks() {
    console.log("You are now in meals photo page")
    var currentMeal = sessionStorage.getItem("currentMeal");
    document.getElementById("heading").innerHTML = currentMeal;

    //display photo from firebase
    displayPhotoFromFirebase();
}

function displayPhotoFromFirebase() {
    //get meal photo from firebase storage

    var currentMeal = sessionStorage.getItem("currentMeal");
    const storage = firebase.storage();
    const storageRef = storage.ref().child("photos/" + currentMeal + ".jpeg");
    storageRef
        .getDownloadURL()
        .then(function (url) {
            // Display the image in an HTML div element with id "currentMealPhoto"
            const mealsPhoto = document.getElementById("currentMealPhoto");
            const cacheBuster = new Date().getTime(); // Generate a random cache-busting value

            // Append the cache-buster to the image URL
            url += `?v=${cacheBuster}`;
            mealsPhoto.style.backgroundImage = `url(${url})`;
            mealsPhoto.style.backgroundSize = "100% 100%";
            mealsPhoto.style.backgroundRepeat = "no-repeat";


        })
        .catch(function (error) {
            console.error(error);
        });

    //in future will need to define users
}
""
function checkMealsColor() {

    if (sessionStorage.getItem("Breakfast") == "true") {
        console.log("Breakfast is taken")
        document.getElementById("breakfastButtonGuardian").style.backgroundColor = "#B7FFBA";
    }
    if (sessionStorage.getItem("Lunch") == "true") {
        console.log("Lunch is taken")
        document.getElementById("lunchButtonGuardian").style.backgroundColor = "#B7FFBA";
    }
    if (sessionStorage.getItem("Dinner") == "true") {
        console.log("Dinner is taken")
        document.getElementById("dinnerButtonGuardian").style.backgroundColor = "#B7FFBA";
    }

}

function checkMedicineColor() {


    if (sessionStorage.getItem("Morning") == "true") {
        console.log("Morning is taken")
        document.getElementById("morningButtonGuardian").style.backgroundColor = "#B7FFBA";
        document.getElementById("morningButtonGuardianEmogi").innerHTML = "✅"
    }
    if (sessionStorage.getItem("Afternoon") == "true") {
        console.log("Afternoon is taken")
        document.getElementById("afternoonButtonGuardian").style.backgroundColor = "#B7FFBA";
        document.getElementById("afternoonButtonGuardianEmogi").innerHTML = "✅"
    }
    if (sessionStorage.getItem("Night") == "true") {
        console.log("Night is taken")
        document.getElementById("nightButtonGuardian").style.backgroundColor = "#B7FFBA";
        document.getElementById("nightButtonGuardianEmogi").innerHTML = "✅"
    }
}

function fetchMedicineFromFB() {
    //fetch data and update local storage

    // Get a reference to the database
    const database = firebase.database();


    // Get a reference to the database location you want to read from
    const ref = database.ref("Medicine/");

    // Attach a listener for changes to the data
    ref.on("value", (snapshot) => {
        // Get the data from the snapshot
        const data = snapshot.val();
        // Do something with the data
        console.log("Data:", data);
        analyzeAndActMedicine(data);
    });

}

function fetchMealFromFB() {
    //fetch data and update local storage

    // Get a reference to the database
    const database = firebase.database();


    // Get a reference to the database location you want to read from
    const ref = database.ref("Meal/");

    // Attach a listener for changes to the data
    ref.on("value", (snapshot) => {
        // Get the data from the snapshot
        const data = snapshot.val();
        // Do something with the data
        console.log("Data:", data);
        analyzeAndActMeal(data);
    });

}
function medicineGuardianPageTasks() {
    console.log("You are now in medicine gruardian page")
    fetchMedicineFromFB();
    checkMedicineColor();


}

function analyzeAndActMedicine(data) {
    sessionStorage.setItem("Morning", data.Morning);
    sessionStorage.setItem("Afternoon", data.Afternoon);
    sessionStorage.setItem("Night", data.Night);
    console.log(sessionStorage)
}

function analyzeAndActMeal(data) {
    sessionStorage.setItem("Breakfast", data.Breakfast);
    sessionStorage.setItem("Lunch", data.Lunch);
    sessionStorage.setItem("Dinner", data.Dinner);
    console.log(sessionStorage)
}

function exerciseGuardianPageTasks() {
    console.log("You are now in exercise guardian page")
    //show video
    displayVideoFromFirebase();

}

function displayVideoFromFirebase() {
    const storageRef = firebase.storage().ref('videos/Exercise.mp4');
    const exerciseVideo = document.getElementById('exerciseVideo');

    storageRef.getDownloadURL().then(url => {
        console.log(url);
        exerciseVideo.src = url;
        exerciseVideo.play();

    }).catch(error => {
        console.log(error);
    });

}


function redirectToMealsPhotoPage(meal) {
    if (sessionStorage.getItem(meal) == "true") {
        sessionStorage.setItem("currentMeal", meal);
        window.location.href = "./mealsPhotoPage.html";
    }
}
function redirectToMedicinePage() {
    window.location.href = "./medicineGuardianPage.html";
}
function redirectToMealsPage() {
    window.location.href = "./mealsGuardianPage.html";
}
function redirectToExercisePage() {
    window.location.href = "./exerciseGuardianPage.html";
}