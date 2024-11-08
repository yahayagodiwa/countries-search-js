const searchField = document.querySelector(".serachField");
const searchBtn = document.querySelector("button");
const container = document.querySelector(".container");
const placeholder = document.querySelector(".placehold");
// CountryDetails
const contName = document.querySelector(".name");
const officialname = document.querySelector(".officialName");
const contFlag = document.querySelector(".countryFlag");
const mapp = document.querySelector(".map");
const continentt = document.querySelector(".continent");
const capitall = document.querySelector(".capital");
const languagee = document.querySelector(".language");
const currencySymb = document.querySelector(".currencySymbol");
const currencyNamee = document.querySelector(".currencyName");
const popuLationn = document.querySelector(".population");
const regionn = document.querySelector(".region");
const timeZoness = document.querySelector(".timezone");
const borderss = document.querySelector(".borders");
const subregionn = document.querySelector(".SubRegion");
const areaa = document.querySelector(".area");

const warningText = document.querySelector(".warningText");

///////////////Funtion//////////////////////
async function CountriyData(name) {
  const baseUrl = `https://restcountries.com/v3.1/name/${name}`;
  try {
    const response = await fetch(baseUrl);

    if (response.ok) {
      const data = await response.json();

      warningText.classList.add("hidden");
      const CounteryName = data[0].name.common;
      const CounteryNameOf = data[0].name.official;
      const capital = data[0].capital ? data[0].capital[0] : "N/A";
      const flag = data[0].flags.png;

      //////////////////////////////////
      const countriCurrency = Object.entries(data[0].currencies).map(
        ([code, details]) => {
          return {
            code,
            name: details.name,
            symbol: details.symbol,
          };
        }
      );
      const currencyName = countriCurrency[0]?.name || "N/A";
      const currencySymbol = countriCurrency[0]?.symbol || "N/A";

      const borders = data[0].borders?.join(", ") || "N/A";
      const area = data[0].area;
      const map = data[0].maps.googleMaps;
      const population = data[0].population;
      const timezone = data[0].timezones[0];
      const continent = data[0].continents[0];
      const region = data[0].region;
      const subRegion = data[0].subregion ? data[0].subregion : "N/A";
      const languages = Object.values(data[0].languages);
      const language = languages.join(", ");

      contName.innerHTML = CounteryName;
      officialname.innerHTML = CounteryNameOf;
      contFlag.src = flag;
      capital.innerHTML = `<b>Capital:</b> ` + " " + capital;
      currencyNamee.innerHTML = ` ${currencyName}`;
      currencySymb.innerHTML = `<b> Currency: </b>` + " " + currencySymbol;
      languagee.innerHTML = `<b> Language: </b>` + " " + language;
      popuLationn.innerHTML = `<b>Population:</b>` + " " + population;
      continentt.innerHTML = `<b>Continent: </b>` + " " + continent;
      regionn.innerHTML = `<b> Region: </b>` + " " + region;
      subregionn.innerHTML = `<b> Sub Region: </b> ` + " " + subRegion;
      borderss.innerHTML = `<b>Borders: </b>` + " " + borders;
      timeZoness.innerHTML = `<b>Time Zone:</b> ` + " " + timezone;
      areaa.innerHTML = `<b>Area: </b>` + " " + area;

      mapp.innerHTML = `<a href="${map}" class="map">Map</p>`;

      container.classList.remove("hidden");
    } else {
      container.classList.add("hidden");
      warningText.classList.remove("hidden");
    }
  } catch (error) {
    console.log(error);
  }
}

searchBtn.addEventListener("click", () => {
  const name = searchField.value;

  if (name.length > 0) {
    placeholder.classList.remove("hidden");
    CountriyData(name);
  }
  searchField.value = "";
});
