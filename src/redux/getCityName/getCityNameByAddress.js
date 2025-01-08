const getCityName = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch city data");
    }

    const data = await response.json();
    const city = data.address.city || data.address.town || data.address.village;

    return city;
  } catch (error) {
    console.error("Error fetching city name:", error);
    return null;
  }
};

export default getCityName;
