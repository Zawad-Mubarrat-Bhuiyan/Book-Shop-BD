// globally declaration
document.getElementById('not-found').style.display = 'none';
const cards = document.getElementById('cards');

// search section
const search = async () => {
    const bookName = document.getElementById('book-name');
    const searchResult = bookName.value;
    bookName.value = '';
    cards.textContent = '';
    document.getElementById('book-no').innerText = '';
    document.getElementById('not-found').style.display = 'none';
    const url = `https://openlibrary.org/search.json?q=${searchResult}`;
    const res = await fetch(url);

    const data = await res.json();
    allResult(data);
}

//error handling
const errorHandle = () => {
    document.getElementById('not-found').style.display = 'block';
}

//show all result in cards
const allResult = item => {
    console.log(item);
    const items = item.docs;
    if (items.length === 0) {
        errorHandle();
    }
    else {
        document.getElementById('not-found').style.display = 'none';
        document.getElementById('book-no').innerText = `Showing ${item.numFound} Books`
        cards.textContent = '';

        //loop for fetching books and adding them in the cards
        items.forEach(element => {
            console.log(element);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML =
                `<div class="card h-100">
        <img src="https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${element.title}</h5>
        <h6>Author: ${element.author_name}</h6>
        <h6>First Published: ${element.first_publish_year}</h6>
        <h6>Publisher: ${element.publisher}</h6>    
        </div>
        </div>`
            cards.appendChild(div);
        });
    }
}