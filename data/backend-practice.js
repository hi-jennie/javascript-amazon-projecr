const xhr = XMLHttpRequest();

// it takes some time for the response to come back
// so we use the event listener to listen for the response
xhr.addEventListener('load', ()=>{
  console.log(xhr.response);
});

xhr.open('GET', 'https://api-to-call.com/endpoint');
xhr.send();