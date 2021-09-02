// serch books
document.getElementById('search-btn').addEventListener('click', () =>{
    const searchElement = document.getElementById('input-filed');
    const serchText = searchElement.value;
    // loade books data
    const url = `http://openlibrary.org/search.json?q=${serchText}`
    fetch(url)
    .then(res => res.json())
    // .then(data => console.log(data.docs[0].publish_date))
    .then(data => displayBooks(data))
});
// display books
const displayBooks = booksData =>{
    const boooksArea = document.getElementById('result-books');
    booksData.docs.forEach(element => {
        const publishDate = element.publish_date;
        const div = document.createElement('div');
        // div.classList.add('col');
        const appendBooks = (coverImg) =>{
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
     
        console.log(element.cover_i)
    });
}