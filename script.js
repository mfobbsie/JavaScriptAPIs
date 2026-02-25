// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
 const singleDogButton = document.getElementById("single-dog-button");
 console.log("Button is:", singleDogButton);
 const multipleDogButton = document.getElementById("multiple-dog-button");
 const singleDogContainer = document.getElementById("single-dog-container");
 const multipleDogContainer = document.getElementById(
   "multiple-dog-container",
 );


 //Fetch a single random dog image from the Dog API
 async function getSingleDogImage() {
   const response = await fetch("https://dog.ceo/api/breeds/image/random");
   const data = await response.json();


   //Clear previous image (if any)
   singleDogContainer.innerHTML = "";


   //Create an image element inside the singleDogContainer and display it
   const img = document.createElement("img");
   img.src = data.message;
   img.alt = "Random Dog";


   //Append the image to the container
   singleDogContainer.appendChild(img);
 }
