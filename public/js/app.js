
  const form = document.getElementById('search-form');
  const searchField = document.getElementById('search-keyword');
  const responseContainer = document.getElementById('response-container');
  let searchedForText;
  
  form.addEventListener('submit',function(e){
    e.preventDefault();
    responseContainer.innerHTML = '';
    searchedForText = searchField.value;
    fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=b9ce7f78872e46f19ea9410794908a65`)
    .then(handleErrors)
    .then(parseJSON)
    .then(addNews)
    .catch(displayErrors);
  });

  function handleErrors(res){
    console.log('Se ha presentado un error');
    if(!res.ok){
     throw Error(res.status);
    }
     return res;
  }

  function parseJSON(res){
    return res.json()
      .then(function(parsedData){
      return parsedData.response.docs;
    })
  }

  function addNews(response){
     console.log(response);
     console.log(response[0].snippet)
     $.each(response, function(index) {
          console.log(index);
          let li = document.createElement('li');
          li.className = 'articleClass';
          li.innerText = response[index].snippet;
          responseContainer.appendChild(li);        
     });
  }

  function displayErrors(err){
  console.log("INSIDE displayErrors!");
  console.log(err);
  }