import React from "react";
import {
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonTabs,
} from "@ionic/react";
import { location, statsChart, alert, medkit } from "ionicons/icons";

type TabItems = {
  label: string;
  icon: any;
  link: string;
};

const Tabs: React.FC = ({ children }) => {
  const tabItems: TabItems[] = [
    {
      label: "Location",
      icon: location,
      link: "location",
    },
    {
      label: "Statistics",
      icon: statsChart,
      link: "statistics",
    },
    {
      label: "Symptoms",
      icon: alert,
      link: "symptoms",
    },
    {
      label: "Prevention",
      icon: medkit,
      link: "prevention",
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
