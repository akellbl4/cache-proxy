const { PUBLIC_NEXT_API_URL } = process.env;

let citiesRequest;

export function fetchCities() {
  if (!citiesRequest) {
    citiesRequest = fetch(`${PUBLIC_NEXT_API_URL}/cities`);
  }

  return citiesRequest;
}
