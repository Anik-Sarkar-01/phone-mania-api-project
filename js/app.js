const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}


const displayPhones = (phones,dataLimit) => {
    // console.log(phones);
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = ``;
    const noPhone = document.getElementById('no-phone-message');

    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }

    
    if (phones.length === 0) {
        noPhone.classList.remove('d-none');
    }
    else {
        noPhone.classList.add('d-none')
    }

    phones.forEach(phone => {
        const phonesDiv = document.createElement('div');
        phonesDiv.classList.add('col');
        phonesDiv.innerHTML = `
    <div class="card">
    <img class="p-5" src="${phone.image}" class="card-img-top" alt="">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                to additional content. This content is a little bit longer.</p>
            <button onClick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#phoneDetailModal" >Show Details</button>
        </div>
    </div>
    `;
    phonesContainer.appendChild(phonesDiv);
    });
    toggleLoader(false);
}

const processSearch = dataLimit => {
    toggleLoader(true);
    const searchField = document.getElementById('search-field');
    const searchFieldText = searchField.value;
    loadPhones(searchFieldText, dataLimit);
    
}

document.getElementById('search-button').addEventListener('click', function () {
    processSearch(10);

})
document.getElementById('search-field').addEventListener('keypress', function(e){
    // console.log(e.key);
    if(e.key === 'Enter'){
        processSearch(10);
    }
})

const toggleLoader = isLoading => {
    const spinnerContainer = document.getElementById('spinner-container');
    if (isLoading === true) {
        spinnerContainer.classList.remove('d-none');
    }
    else{
        spinnerContainer.classList.add('d-none');
    }

}
 
document.getElementById('show-all').addEventListener('click',function(){
    processSearch();
})

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
        <p> Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'} </p>
        <p> Stroage: ${phone.mainFeatures? phone.mainFeatures.storage : 'No storage Information'}
        <p> Sensors: ${phone.mainFeatures? phone.mainFeatures.sensors : 'No sensors Information'}
        <p> Bluetooth: ${phone.others? phone.others.Bluetooth : 'No bluetooth Information'}
    `
}

loadPhones('Apple')
