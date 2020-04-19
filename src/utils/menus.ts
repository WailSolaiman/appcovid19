import {
  homeOutline,
  informationCircleOutline,
  locationOutline,
  personOutline,
  atOutline,
  createOutline,
  personAddOutline,
  logInOutline,
  logOutOutline,
} from "ionicons/icons";

export interface UserInfos {
  username: string;
  email: string;
  userIcon: any;
  mailIcon: any;
  profileIcon: any;
  link: string;
  label: string;
}

export interface NavigationItems {
  label: string;
  icon: any;
  link: string;
}

export const userInfos: UserInfos = {
  username: "willard82",
  email: "waily2@hotmail.com",
  userIcon: personOutline,
  mailIcon: atOutline,
  profileIcon: createOutline,
  link: "/profile",
  label: "Profile",
};

export const navigateItems: NavigationItems[] = [
  {
    label: "Home",
    icon: homeOutline,
    link: "/home",
  },
  {
    label: "Location",
    icon: locationOutline,
    link: "/location",
  },
  {
    label: "About",
    icon: informationCircleOutline,
    link: "/about",
  },
];

export const accountItems: NavigationItems[] = [
  {
    label: "Register",
    icon: personAddOutline,
    link: "/register",
  },
  {
    label: "Login",
    icon: logInOutline,
    link: "/login",
  },
  {
    label: "Logout",
    icon: logOutOutline,
    link: "/logout",
  },
];
