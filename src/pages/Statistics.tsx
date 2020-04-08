import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonMenuButton,
  IonPage,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from "@ionic/react";
import React from "react";
import "./Home.css";

const Statistics: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonMenuButton slot="start" color="light" />
          <IonTitle>Statistics</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList lines="full">
          <IonListHeader>
            <IonLabel>Statistics</IonLabel>
          </IonListHeader>
          <IonItem>
            <IonLabel className="font-weight-label">USA</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel color="danger">54514.44</IonLabel>
            <IonLabel color="success">545.54</IonLabel>
            <IonLabel color="dark">545.22</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel className="font-weight-label">Germany</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel color="danger">54514.44</IonLabel>
            <IonLabel color="success">545.54</IonLabel>
            <IonLabel color="dark">545.22</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Statistics;
