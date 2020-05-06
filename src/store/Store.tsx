import React from "react";
import {
  IUserData,
  ITotalStatistics,
  ICountryStatistics,
} from "../utils/types";
import {
  userDataInit,
  worldwideDataInitial,
  countriesDataInitial,
} from "../utils/init";

interface IState {
  user: IUserData;
  worldwideData: ITotalStatistics;
  countries: Array<ICountryStatistics>;
  countryData: ICountryStatistics;
  favCountryData: ICountryStatistics;
}

export interface IAction {
  type: string;
  payload: any;
}

const initialeState: IState = {
  user: userDataInit,
  worldwideData: worldwideDataInitial,
  countries: [],
  countryData: countriesDataInitial,
  favCountryData: countriesDataInitial,
};

export const Store = React.createContext<IState | any>(initialeState);

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case "UPDATE_USER":
      return { ...state, user: action.payload };
    case "FETCH_API_COVID_GLOBAL_DATA":
      return { ...state, worldwideData: action.payload };
    case "FETCH_API_COVID_COUNTRIES_DATA":
      return { ...state, countries: action.payload };
    case "UPDATE_COUNTRY_DATA":
      return { ...state, countryData: action.payload };
    case "UPDATE_FAV_COUNTRY_DATA":
      return { ...state, favCountryData: action.payload };
    default:
      return state;
  }
};

const StoreProvider: React.FC<React.ReactNode> = ({
  children,
}): JSX.Element => {
  const [state, dispatch] = React.useReducer(reducer, initialeState);
  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};

export default StoreProvider;
