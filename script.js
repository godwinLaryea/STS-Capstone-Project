const gridWrapper = document.querySelector(".grid-wrapper");
gridWrapper.classList.add("grid-wrapper");


const searchInput = document.getElementById("search");

  const countriesAPI = async ()=> {
    const url = "https://restcountries.com/v3.1/all";
  
    const response = await fetch(url);
  
    const countries = await response.json();
    
    countries.sort(function(a, b) {
      if(a.name.common.toLowerCase() < b.name.common.toLowerCase()
      ) return -1;
      if(a.name.common.toLowerCase() > b.name.common.toLowerCase()
      ) return 1;
    })
    

    let display = "";
    
    const displayCountries = display => gridWrapper.innerHTML = display;
    
    let countryElements = "";
    const createElements = countryElements => {
      countryElements = `
       <div class="country">
            <img src="${countryElements.flags.svg}" alt="${countryElements.name.common}'s flag">
            <div class="country-name">
              <p>${countryElements.name.common}</p>
            </div>
          </div>
      `
      return countryElements;
    };

    
    let countryList = "";
      
      countries.forEach(country => {
        const countryData = createElements(country)
        countryList += countryData;
      });
      displayCountries(countryList);

    
      const searchCountry = country =>{
      
        let searchList = "";

      countries.forEach(elements => {
        if(elements.name.common.toLowerCase().includes(country.toLowerCase())){
          const searchData = createElements(elements);
          
          searchList += searchData;
          displayCountries(searchList);
          return searchData;
        }
      });
    }


    searchInput.addEventListener("input", () => {
      searchCountry(searchInput.value);
    });
    
  };
  countriesAPI();

  