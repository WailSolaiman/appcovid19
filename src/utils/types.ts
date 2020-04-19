export interface ITotalStatistics {
  updated_at: string;
  date: string;
  deaths: number;
  confirmed: number;
  recovered: number;
  active: number;
  new_confirmed: number;
  new_recovered: number;
  new_deaths: number;
}

export interface ICountryStatistics {
  coordinates: {
    latitude: number;
    longitude: number;
  };
  name: string;
  code: string;
  population: number;
  updated_at: string;
  today: {
    deaths: number;
    confirmed: number;
  };
  latest_data: {
    deaths: number;
    confirmed: number;
    recovered: number;
    critical: number;
    calculated: {
      death_rate: number;
      recovery_rate: number;
      recovered_vs_death_ratio: number | null;
      cases_per_million_population: number;
    };
  };
}

export interface ISelector {
  header: string;
  subHeader: string;
  selectedText: string;
  getCountryData: (country: ICountryStatistics) => void;
  countries: Array<ICountryStatistics>;
  toastMessage: string;
}

export interface IListItems {
  header: string;
  isHeader: boolean;
  subHeader: string;
  subHeaderIcon: string;
  items: Array<{
    color: string;
    icon: string;
    iconColor: string;
    label: string;
    labelColor: string;
    labelContent: number;
  }>;
}

export interface IUserMenu {
  header: string;
  userInfos: {
    label: string;
    link: string;
    userIcon: string;
    mailIcon: string;
    profileIcon: string;
    username: string;
    email: string;
  };
  history: Array<string>;
}

export interface IUserData {
  username: string;
  email: string;
  password: string;
}

export interface IMenuItems {
  label: string;
  menuItems: Array<{ label: string; link: string; icon: string }>;
  history: Array<string>;
}
