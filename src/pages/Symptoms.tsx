import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonMenuButton,
  IonPage,
  IonFooter,
  IonItem,
  IonLabel,
} from "@ionic/react";
import React from "react";
import "./Home.css";

const Symptoms: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonMenuButton slot="start" color="light" />
          <IonTitle>Symptoms</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem lines="none">
          <IonLabel>Symptoms</IonLabel>
        </IonItem>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonTitle size="small">Footer</IonTitle>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Symptoms;
