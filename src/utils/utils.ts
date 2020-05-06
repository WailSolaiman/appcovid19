import { ICountryStatistics } from "./types";

let countriesData: ICountryStatistics[] = [];

export const createNewDataContainer = (): void => {
  if (localStorage.getItem("countries")) {
    countriesData = JSON.parse(localStorage.getItem("countries") || "[]");
  } else {
    localStorage.setItem("countries", JSON.stringify(countriesData));
  }
};

export const addItemToDataContainer = (country: ICountryStatistics): void => {
  const isExist = isItemExistInDataContainer(country.code);
  if (!isExist) {
    countriesData.push(country);
    localStorage.setItem("countries", JSON.stringify(countriesData));
  }
};

export const removeItemFromDataContainer = (countryCode: string): void => {
  const countryIndex = countriesData.findIndex(
    (item) => item.code === countryCode
  );
  const isExist = isItemExistInDataContainer(countryCode);
  if (isExist) {
    countriesData.splice(countryIndex, 1);
    localStorage.setItem("countries", JSON.stringify(countriesData));
  }
};

export const isItemExistInDataContainer = (countryCode: string): boolean => {
  return countriesData.some((item) => item.code === countryCode);
};

export const getItemFromDataContainer = (
  countryCode: string
): ICountryStatistics => {
  const country: any = countriesData.find((item) => item.code === countryCode);
  return country;
};

export const getAllItemsFromDataContainer = (): ICountryStatistics[] => {
  const countries: ICountryStatistics[] = JSON.parse(
    localStorage.getItem("countries") || "[]"
  );
  return countries;
};

export const getItemIndexFromDataContainer = (
  country: ICountryStatistics
): number => {
  return countriesData.findIndex((item) => item.code === country.code);
};

export const notificationMessage = (
  message: string = "",
  duration: number = 3000
) => {
  const toast = document.createElement("ion-toast");
  toast.message = message;
  toast.duration = duration;

  document.body.appendChild(toast);
  return toast.present();
};
