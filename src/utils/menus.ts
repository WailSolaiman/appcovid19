import {
  home,
  informationCircle,
  location,
  statsChart,
  alert,
  medkit,
  person,
  at,
  create,
  personAdd,
  logIn,
  logOut,
} from "ionicons/icons";

export type UserInfos = {
  username: string;
  email: string;
  userIcon: any;
  mailIcon: any;
  profileIcon: any;
  link: string;
  label: string;
};

export type NavigationItems = {
  label: string;
  icon: any;
  link: string;
};

export const userInfos: UserInfos = {
  username: "willard82",
  email: "waily2@hotmail.com",
  userIcon: person,
  mailIcon: at,
  profileIcon: create,
  link: "/profile",
  label: "Profile",
};

export const navigateItems: NavigationItems[] = [
  {
    label: "Home",
    icon: home,
    link: "/home",
  },
  {
    label: "Location",
    icon: location,
    link: "/location",
  },
  {
    label: "Statistics",
    icon: statsChart,
    link: "/statistics",
  },
  {
    label: "Symptoms",
    icon: alert,
    link: "/symptoms",
  },
  {
    label: "Prevention",
    icon: medkit,
    link: "/prevention",
  },
  {
    label: "About",
    icon: informationCircle,
    link: "/about",
  },
];

export const accountItems: NavigationItems[] = [
  {
    label: "Register",
    icon: personAdd,
    link: "/register",
  },
  {
    label: "Login",
    icon: logIn,
    link: "/login",
  },
  {
    label: "Logout",
    icon: logOut,
    link: "/logout",
  },
];
