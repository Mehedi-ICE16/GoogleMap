export const isValidLatitude = (latitude) => {
  const lat = parseFloat(latitude);
  return !isNaN(lat) && lat >= -90 && lat <= 90;
};

export const isValidLongitude = (longitude) => {
  const lng = parseFloat(longitude);
  return !isNaN(lng) && lng >= -180 && lng <= 180;
};
