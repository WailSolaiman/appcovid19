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
  IonImg,
} from "@ionic/react";
import React from "react";

const About: React.FC = (): JSX.Element => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonMenuButton slot="start" color="light" />
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList lines="none">
          <IonListHeader>
            <IonLabel>About AppCovid19.</IonLabel>
          </IonListHeader>
          <IonItem>
            <IonImg src="./assets/app.svg" alt="about" />
          </IonItem>
          <IonItem>
            <IonText>
              <p>
                This app ( AppCovid19 ) uses Covid-19 data collection from
                about-corona.net website, which collects the latest Covid-19
                data from trusted sources such as the World Health Organization
                and Johns Hopkins CSSE via the API.
              </p>
            </IonText>
          </IonItem>
          <IonItem>
            <IonText>
              <small>
                AppCovid19 version 1.0.0 . This is only a test version.
                Developed by Wail Solaiman.
              </small>
            </IonText>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default About;
