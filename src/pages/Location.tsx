import React, { useState } from "react";
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
  IonText,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";

const Location: React.FC = () => {
  const [country, setCountry] = useState("USA");
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonMenuButton slot="start" color="light" />
          <IonTitle>Location</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList lines="none">
          <IonListHeader>
            <IonLabel>Location</IonLabel>
          </IonListHeader>
          <IonItem>
            <IonText>
              <p>Coronavirus pandemic by country and territory.</p>
            </IonText>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Country</IonLabel>
            <IonSelect
              value={country}
              onIonChange={(e) => setCountry(e.detail.value)}
            >
              <IonSelectOption value="USA">USA</IonSelectOption>
              <IonSelectOption value="Germany">Germany</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel>Selected country / territory: {country}</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Location;
