import React from "react";
import {
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import { globeOutline } from "ionicons/icons";
import { IListItems } from "../utils/types";

const ListItems: React.FC<IListItems> = ({
  header = "",
  isHeader = false,
  subHeader = "",
  subHeaderIcon = globeOutline,
  items = [
    {
      color: "",
      icon: globeOutline,
      iconColor: "primary",
      label: "",
      labelColor: "primary",
      labelContent: 0,
    },
  ],
}): JSX.Element => {
  return (
    <IonList lines="full">
      {isHeader && (
        <IonListHeader>
          <IonLabel>{header}</IonLabel>
        </IonListHeader>
      )}
      <IonItem color="light">
        <IonIcon icon={subHeaderIcon} slot="start" size="small" />
        <IonLabel>{subHeader}</IonLabel>
      </IonItem>
      {items &&
        items.map((item, index) => (
          <IonItem key={index} color={item.color}>
            <IonIcon
              icon={item.icon}
              slot="start"
              color={item.iconColor}
              size="small"
            />
            <IonLabel>{item.label}</IonLabel>
            <IonLabel className="font-weight-label" color={item.labelColor}>
              {item.labelContent === null
                ? 0
                : item.labelContent.toLocaleString("en")}
            </IonLabel>
          </IonItem>
        ))}
    </IonList>
  );
};

export default ListItems;
