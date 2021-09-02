// serch books
document.getElementById('search-btn').addEventListener('click', () =>{
    const searchElement = document.getElementById('input-filed');
    const serchText = searchElement.value;
   
    // clear privus data
    clearData('inpute');
    clearData('result');
    // error msg clear
    errorMsg('clear')
    if(serchText === ''){
        errorMsg('noInpute');
    }
    else{
    // open spiner
    Loader.open();
    // loade books data
    const url = `http://openlibrary.org/search.json?q=${serchText}`
    fetch(url)
    .then(res => res.json())
    // .then(data => console.log(data))
    .then(data => displayBooks(data))
    }

});
// display books
const displayBooks = booksData =>{
    Loader.close();
    // display count
    displayCountResult(booksData.numFound);
    if(booksData.numFound === 0){
        errorMsg('clear');
        errorMsg('notFound');
    }
    
    const boooksArea = document.getElementById('result-books');
    // get all books one by one using loop
    booksData.docs.forEach(element => {
        const publishDate = element.publish_date;
        const div = document.createElement('div');
        const appendBooks = (coverImg) =>{
            // apppend bools
            div.innerHTML = `
            <div class="col">
                <div class="card border border-2 shadow" id="book-card">
                <img src="${coverImg}" class="card-img-top" height="400">
                    <div class="card-body">
                          <h5 class="card-title">${element.title.slice(0,20)}</h5>
                          <h6>Author : ${element.author_name}</h6>
                          <h6>Publish on: ${publishDate}</h6>
                    </div>
                </div>
            </div>
            `
            boooksArea.appendChild(div);
        }
        if(element.cover_i){
            const coverImg = `https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg`;
            appendBooks(coverImg);
        }
        else{
            const coverImg = 'img/noimg.jpg';
            appendBooks(coverImg);
        }
    });
}
// clear data
const clearData = (fileds) =>{
    const searchElement = document.getElementById('input-filed');
    const booksArea = document.getElementById('result-books');
    if(fileds === 'inpute'){
        searchElement.value = '';
    }
    else if(fileds === 'result'){
        booksArea.textContent = '';
    }
}
// msg showing
const displayCountResult = (value) =>{
    const displayCount = document.getElementById('result-msg');
    const foundsResult = document.getElementById('founds-result')
    displayCount.style.display = 'block';
    foundsResult.innerText = value;
}
const errorMsg = (type) =>{
    const displayCount = document.getElementById('result-msg');
    const noinputeMsg = document.getElementById('noinpute-msg');
    const notFound = document.getElementById('notFound-msg');
    if(type === 'noInpute'){
        noinputeMsg.style.display= 'block';
        displayCount.style.display= 'none';
    }
     else if(type === 'clear'){
        noinputeMsg.style.display= 'none';
        displayCount.style.display= 'none';
        notFound.style.display = 'none'
    }
    else if(type === 'notFound'){
        noinputeMsg.style.display= 'none';
        displayCount.style.display= 'none';
        notFound.style.display = 'block'
    }
}