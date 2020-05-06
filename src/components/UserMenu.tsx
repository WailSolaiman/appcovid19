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
import {
  personOutline,
  atOutline,
  createOutline,
  logOutOutline,
} from "ionicons/icons";
import { Store } from "../store/Store";
import { app } from "../firebaseConfig";
import { notificationMessage } from "../utils/utils";
import { userDataInit } from "../utils/init";

const UserMenu: React.FC = (): JSX.Element => {
  const { state, dispatch } = React.useContext(Store);
  const history = useHistory();
  return (
    <IonList lines="full">
      <IonListHeader>
        <IonLabel>User</IonLabel>
      </IonListHeader>
      <IonMenuToggle>
        <IonItem lines="full">
          <IonIcon
            icon={personOutline}
            slot="start"
            color="primary"
            size="small"
          />
          <IonLabel>{state.user.displayName}</IonLabel>
        </IonItem>
      </IonMenuToggle>
      <IonMenuToggle>
        <IonItem lines="full">
          <IonIcon icon={atOutline} slot="start" color="primary" size="small" />
          <IonLabel>{state.user.email}</IonLabel>
        </IonItem>
      </IonMenuToggle>
      <IonMenuToggle>
        <IonItem onClick={() => history.push("/profile")} lines="full">
          <IonIcon
            icon={createOutline}
            slot="start"
            color="primary"
            size="small"
          />
          <IonLabel>Profile</IonLabel>
        </IonItem>
      </IonMenuToggle>
      <IonMenuToggle>
        <IonItem
          onClick={() => {
            app.auth().signOut();
            dispatch({
              type: "UPDATE_USER",
              payload: userDataInit,
            });
            notificationMessage("You have logged out!");
          }}
          lines="full"
        >
          <IonIcon
            icon={logOutOutline}
            slot="start"
            color="primary"
            size="small"
          />
          <IonLabel>Logout</IonLabel>
        </IonItem>
      </IonMenuToggle>
    </IonList>
  );
};

export default UserMenu;
