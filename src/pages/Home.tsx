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
  IonIcon,
  useIonViewWillEnter,
  IonFooter,
  IonListHeader,
} from "@ionic/react";
import {
  documentTextOutline,
  globeOutline,
  medicalSharp,
  heartCircle,
  bed,
  thermometer,
} from "ionicons/icons";
import moment from "moment";
import { getStatistics } from "../utils/api";
import { TotalStatistics } from "../utils/types";
import "./Home.css";

const Home: React.FC = () => {
  const [totals, setTotals] = useState<TotalStatistics>({
    updated_at: "",
    date: "",
    deaths: 0,
    confirmed: 0,
    recovered: 0,
    active: 0,
    new_confirmed: 0,
    new_recovered: 0,
    new_deaths: 0,
  });
  useIonViewWillEnter(() => {
    getStatistics()
      .then((res) => {
        setTotals(res.data.data[0]);
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
            <IonLabel>COVID-19 Worldwide</IonLabel>
          </IonListHeader>
          <IonItem color="light">
            <IonIcon icon={globeOutline} slot="start" size="small" />
            <IonLabel>Coronavirus monitor</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon
              icon={medicalSharp}
              slot="start"
              color="warning"
              size="small"
            />
            <IonLabel>Confirmed</IonLabel>
            <IonLabel className="font-weight-label" color="warning">
              {totals.confirmed.toLocaleString("en")}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon
              icon={thermometer}
              slot="start"
              color="danger"
              size="small"
            />
            <IonLabel>Active</IonLabel>
            <IonLabel className="font-weight-label" color="danger">
              {totals.active.toLocaleString("en")}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon
              icon={heartCircle}
              slot="start"
              color="success"
              size="small"
            />
            <IonLabel>Recovered</IonLabel>
            <IonLabel className="font-weight-label" color="success">
              {totals.recovered.toLocaleString("en")}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={bed} slot="start" color="dark" size="small" />
            <IonLabel>Deaths</IonLabel>
            <IonLabel className="font-weight-label" color="dark">
              {totals.deaths.toLocaleString("en")}
            </IonLabel>
          </IonItem>
        </IonList>
        <IonList lines="full">
          <IonItem color="light">
            <IonIcon icon={documentTextOutline} slot="start" size="small" />
            <IonLabel>
              New Casses ({moment(totals.date).format("DD.MMM.YYYY")})
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon
              icon={medicalSharp}
              slot="start"
              color="warning"
              size="small"
            />
            <IonLabel>Confirmed</IonLabel>
            <IonLabel className="font-weight-label" color="warning">
              {totals.new_confirmed.toLocaleString("en")}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon
              icon={heartCircle}
              slot="start"
              color="success"
              size="small"
            />
            <IonLabel>Recovered</IonLabel>
            <IonLabel className="font-weight-label" color="success">
              {totals.new_recovered.toLocaleString("en")}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={bed} slot="start" color="dark" size="small" />
            <IonLabel>Deaths</IonLabel>
            <IonLabel className="font-weight-label" color="dark">
              {totals.new_deaths.toLocaleString("en")}
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
      <IonFooter className="ion-no-border">
        <IonToolbar>
          <IonLabel className="ion-text-wrap">
            <small>
              Statistics for all countries about COVID-19.
              <br />
              Source: World Health Organization -WHO- Situation Reports. Updated
              every 1 hour.
            </small>
          </IonLabel>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Home;
