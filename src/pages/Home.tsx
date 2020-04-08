import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonMenuButton,
  IonPage,
  IonList,
  IonItem,
  IonLabel,
  IonListHeader,
  IonIcon,
  IonMenuToggle,
  useIonViewWillEnter,
} from "@ionic/react";
import { globeOutline } from "ionicons/icons";
import { getStatistics } from "../utils/api";
import {
  getAllConfirmedCases,
  getAllRecoveredCases,
  getAllDeathsCases,
  getAllCriticalCases,
  TotalStatistics,
} from "../utils/utils";
import "./Home.css";

const Home: React.FC = () => {
  const [totals, setTotals] = useState<TotalStatistics[]>([
    {
      country: "",
      cases: {
        new: "",
        active: 0,
        critical: 0,
        recovered: 0,
        total: 0,
      },
      deaths: {
        new: 0,
        total: 0,
      },
      tests: {
        total: 0,
      },
      day: new Date(),
      time: new Date(),
    },
  ]);
  useIonViewWillEnter(() => {
    getStatistics()
      .then((res) => {
        setTotals(res.data.response);
      })
      .catch((error) => console.log(error));
  });
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonMenuButton slot="start" color="light" />
          <IonTitle>AppCovid19</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList lines="full">
          <IonListHeader>
            <IonLabel>Coronavirus monitor</IonLabel>
          </IonListHeader>
          <IonItem lines="none">
            <IonLabel className="ion-text-wrap">
              Statistics for all countries about COVID-19. Updated every 15
              minutes.
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={globeOutline} slot="start" color="primary" />
            <IonLabel className="font-weight-label">Worldwide cases</IonLabel>
          </IonItem>
          <IonMenuToggle>
            <IonItem>
              <IonLabel className="font-weight-label">Confirmed</IonLabel>
              <IonLabel className="font-weight-label" color="danger">
                {getAllConfirmedCases(totals)}
              </IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem>
              <IonLabel className="font-weight-label">Recovered</IonLabel>
              <IonLabel className="font-weight-label" color="success">
                {getAllRecoveredCases(totals)}
              </IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem>
              <IonLabel className="font-weight-label">Critical</IonLabel>
              <IonLabel className="font-weight-label" color="warning">
                {getAllCriticalCases(totals)}
              </IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem>
              <IonLabel className="font-weight-label">Deaths</IonLabel>
              <IonLabel className="font-weight-label" color="dark">
                {getAllDeathsCases(totals)}
              </IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
