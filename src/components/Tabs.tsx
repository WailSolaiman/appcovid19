import React from "react";
import {
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonTabs,
} from "@ionic/react";
import { locationOutline, globeOutline, personOutline } from "ionicons/icons";

interface ITabItems {
  label: string;
  icon: any;
  link: string;
}

const Tabs: React.FC<React.ReactNode> = ({ children }) => {
  const tabItems: ITabItems[] = [
    {
      label: "Profile",
      icon: personOutline,
      link: "profile",
    },
    {
      label: "Worldwide",
      icon: globeOutline,
      link: "home",
    },
    {
      label: "Location",
      icon: locationOutline,
      link: "location",
    },
  ];

  return (
    <IonTabs>
      {children}
      <IonTabBar slot="bottom">
        {tabItems.map((item, index) => (
          <IonTabButton key={index} tab={item.link} href={`/${item.link}`}>
            <IonIcon icon={`${item.icon}`} />
            <IonLabel>{item.label}</IonLabel>
          </IonTabButton>
        ))}
      </IonTabBar>
    </IonTabs>
  );
};
export default Tabs;
