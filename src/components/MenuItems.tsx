import React from "react";
import { useHistory } from "react-router-dom";
import {
  IonListHeader,
  IonLabel,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonList,
} from "@ionic/react";
import { NavigationItems } from "../utils/menus";
import { IMenuItems } from "../utils/types";

const MenuItems: React.FC<IMenuItems> = ({
  label = "",
  menuItems = [{ label: "", link: "", icon: "" }],
}): JSX.Element => {
  const history = useHistory();
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
