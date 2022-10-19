export const kelvinToCelsius = (temp: number) => {
  return temp - 273.15
}

export const capitalizeFirstChar = (str:string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const round = (value:number, precision:number) => {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}