// serch books
document.getElementById('search-btn').addEventListener('click', () =>{
    const searchElement = document.getElementById('input-filed');
    const serchText = searchElement.value;
    // lode books data
    const url = `http://openlibrary.org/search.json?q=${serchText}`
    fetch(url)
    .then(res => res.json())
    // .then(data => console.log(data.docs[0].publish_date[0]))
    .then(data => displayBooks(data.docs))
});

const displayBooks = booksData =>{
    const boooksArea = document.getElementById('result-books');
    booksData.forEach(element => {
        const coverImg = `https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg`;
        const publishDate = element.publish_date[0];
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="col">
            <div class="card border border-2 shadow">
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
    });
}