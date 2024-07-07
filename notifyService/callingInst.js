/*Calling function*/

function notificationServices(){
    const url = 'https://663294d469275164579a.appwrite.global/?email=';

fetch(url+selectedHospital.Hospital_Email)
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Handle the response data here
    })
    .catch(error => {
        console.error(error); // Handle any errors that occur during the fetch
    });


  }

  

//local fuction
const endpointURL = 'http://localhost:5000'; 
const email = 'recipient@example.com'; 

// Make the HTTP request to the cloud function endpoint
fetch(`${endpointURL}?email=${email}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to call cloud function');
        }
        return response.json();
    })
    .then(data => {
        console.log(data); 
    })
    .catch(error => {
        console.error(error); 
    });
