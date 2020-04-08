import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonMenuButton,
  IonPage,
  IonItem,
  IonLabel,
} from "@ionic/react";
import React from "react";
import "./Home.css";

const Profile: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonMenuButton slot="start" color="light" />
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem lines="none">
          <IonLabel>Profile</IonLabel>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
