

const url = "https://jsonplaceholder.typicode.com/users";

const fetchoutput = document.getElementById("usernames");

const req = new XMLHttpRequest(); 
req.open('GET', url); 
req.onload = function () { 
    const emailoutput = document.getElementById("emails");

	if (req.status == 200) { 
        
        //console.log (req.response); 
        

        let jsonData = JSON.parse(req.responseText);
        jsonData.sort(function(a, b) {
          return  a.email < b.email ? -1 : a.email > b.email ? 1 : 0;;
        });
      
        let emailList = "";
        for (item in jsonData) {
            emailList = emailList + "<li>" + jsonData[item].email + "</li>";
        }
        emailoutput.innerHTML = emailoutput.innerHTML +  '<div class= "org-structure"> <ul>' + emailList + "</ul></div>";

	} else { 
        console.log('ERROR ', req.statusText); 
        emailoutput.innerHTML = emailoutput.innerHTML +  '<div class= "org-structure"> Error Retrieving Data</div>';
	} 
};
req.onerror = function () { 
    console.log('Network Error'); 
    emailoutput.innerHTML = emailoutput.innerHTML +  '<div class= "org-structure"> Error Retrieving Data</div>';
}; 
req.send(); // Add request to task queue


function processFetchResult(result) {
  result.json().then(showJson)
  .catch(function(err) { 
    // Error, handle err 
    console.log('Fetch Error'); 
    fetchoutput.innerHTML = fetchoutput.innerHTML +  '<div class= "org-structure"> Error Retrieving Data</div>';
})
} 


function showJson(jsonData) {
   jsonData.sort(function(a, b) {
    return a.username.length - b.username.length;
  });

  //var myjsonData = JSON.stringify(jsonData)

  let usernamelist = "";
  for (item in jsonData) {
    usernamelist = usernamelist + "<li>" + jsonData[item].username + "</li>";
  }
  fetchoutput.innerHTML = fetchoutput.innerHTML +  '<div class= "org-structure"> <ul>' + usernamelist + "</ul></div>";
}


const promise = fetch(url, { method: "get" })
promise.then(processFetchResult)



