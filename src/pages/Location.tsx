import React, { useState, useEffect } from "react";
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
  useIonViewWillEnter,
  IonItemGroup,
  IonItemDivider,
} from "@ionic/react";
import { getAllCountries, getCountryStatistics } from "../utils/api";
import { TotalStatistics } from "../utils/utils";

const Location: React.FC = () => {
  const [country, setCountry] = useState("China");
  const [countries, setCountries] = useState([]);
  const [countryData, setCountryData] = useState<TotalStatistics>({
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
    getAllCountries()
      .then((res) => {
        setCountries(res.data.response);
      })
      .catch((error) => console.log(error));
  });
  useEffect(() => {
    getCountryStatistics(country)
      .then((res) => {
        console.log(country);
        console.log(res.data.response[0]);
        setCountryData({ ...res.data.response[0] });
      })
      .catch((error) => console.log(error));
  }, [country]);
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
              {countries.map((item, index) => (
                <IonSelectOption key={index} value={`${item}`}>
                  {item}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        </IonList>
        <IonItemGroup>
          <IonItemDivider>
            <IonLabel>Cases</IonLabel>
          </IonItemDivider>
          <IonItem lines="full">
            <IonLabel>New Cases</IonLabel>
            <IonLabel className="font-weight-label" color="primary">
              0
            </IonLabel>
          </IonItem>
          <IonItem lines="full">
            <IonLabel>Active Cases</IonLabel>
            <IonLabel className="font-weight-label" color="warning">
              0
            </IonLabel>
          </IonItem>
          <IonItem lines="full">
            <IonLabel>Critical</IonLabel>
            <IonLabel className="font-weight-label" color="danger">
              0
            </IonLabel>
          </IonItem>
          <IonItem lines="full">
            <IonLabel>Recovered</IonLabel>
            <IonLabel className="font-weight-label" color="success">
              0
            </IonLabel>
          </IonItem>
          <IonItem lines="full">
            <IonLabel>Total</IonLabel>
            <IonLabel className="font-weight-label" color="dark">
              0
            </IonLabel>
          </IonItem>
        </IonItemGroup>
        <IonItemGroup>
          <IonItemDivider>
            <IonLabel>Deaths</IonLabel>
          </IonItemDivider>
          <IonItem lines="full">
            <IonLabel>New</IonLabel>
            <IonLabel className="font-weight-label" color="dark">
              0
            </IonLabel>
          </IonItem>
          <IonItem lines="full">
            <IonLabel>Total</IonLabel>
            <IonLabel className="font-weight-label" color="dark">
              0
            </IonLabel>
          </IonItem>
        </IonItemGroup>
      </IonContent>
    </IonPage>
  );
};

export default Location;
