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

const Register: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonMenuButton slot="start" color="light" />
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem lines="none">
          <IonLabel>Register</IonLabel>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Register;
