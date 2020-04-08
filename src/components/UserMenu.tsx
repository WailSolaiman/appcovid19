import React from "react";
import {
  IonListHeader,
  IonLabel,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonList,
} from "@ionic/react";

const UserMenu: React.FC<any> = ({
  header = "",
  userInfos = {},
  history = [],
}) => {
  const {
    label,
    link,
    userIcon,
    mailIcon,
    profileIcon,
    username,
    email,
  } = userInfos;
  return (
    <IonList lines="full">
      <IonListHeader>
        <IonLabel>{header}</IonLabel>
      </IonListHeader>
      <IonMenuToggle>
        <IonItem lines="full">
          <IonIcon
            icon={`${userIcon}`}
            slot="start"
            color="primary"
            size="small"
          />
          <IonLabel>{username}</IonLabel>
        </IonItem>
      </IonMenuToggle>
      <IonMenuToggle>
        <IonItem lines="full">
          <IonIcon
            icon={`${mailIcon}`}
            slot="start"
            color="primary"
            size="small"
          />
          <IonLabel>{email}</IonLabel>
        </IonItem>
      </IonMenuToggle>
      <IonMenuToggle>
        <IonItem onClick={() => history.push(`${link}`)} lines="full">
          <IonIcon
            icon={`${profileIcon}`}
            slot="start"
            color="primary"
            size="small"
          />
          <IonLabel>{label}</IonLabel>
        </IonItem>
      </IonMenuToggle>
    </IonList>
  );
};

export default UserMenu;
