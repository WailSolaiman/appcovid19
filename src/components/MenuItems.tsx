import React from "react";
import {
  IonListHeader,
  IonLabel,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonList,
} from "@ionic/react";
import { NavigationItems } from "../utils/menus";

const MenuItems: React.FC<any> = ({
  label = "",
  menuItems = [{ label: "", link: "", icon: "" }],
  history = [],
}) => {
  return (
    <IonList lines="full">
      <IonListHeader>
        <IonLabel>{label}</IonLabel>
      </IonListHeader>
      {menuItems.map((item: NavigationItems, index: number) => (
        <IonMenuToggle key={index}>
          <IonItem onClick={() => history.push(`${item.link}`)} lines="full">
            <IonIcon
              icon={`${item.icon}`}
              slot="start"
              color="primary"
              size="small"
            />
            <IonLabel>{item.label}</IonLabel>
          </IonItem>
        </IonMenuToggle>
      ))}
    </IonList>
  );
};

export default MenuItems;
