import "../src/style.css";

const api_url = "https://restcountries.com/v3.1/all";

type Country = {
  flags: {
    png: string;
  };
  name: {
    common: string;
  };
};

async function fetchCountries(): Promise<Country[]> {
  const response: Response = await fetch(api_url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const countries: Country[] = await response.json();
  return countries;
}

async function renderCountries(): Promise<void> {
  const $container = document.querySelector(".container");
  if (!$container) {
    console.error("Container element not found");
    return;
  }

  try {
    const countries: Country[] = await fetchCountries();
    countries.forEach((country) => {
      const $country: HTMLLIElement = document.createElement("li");
      $country.className = "card";

      const $flag: HTMLImageElement = document.createElement("img");
      $flag.src = country.flags.png;
      $flag.alt = `${country.name.common} flag`;

      const $name: HTMLSpanElement = document.createElement("span");
      $name.textContent = country.name.common;

      $country.appendChild($flag);
      $country.appendChild($name);

      $container.appendChild($country);
    });
  } catch (error) {
    console.error("Failed to fetch and render countries:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderCountries();
});
