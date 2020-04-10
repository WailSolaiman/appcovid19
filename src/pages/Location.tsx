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
  IonIcon,
  IonFooter,
} from "@ionic/react";
import {
  medicalSharp,
  heartCircle,
  bed,
  thermometer,
  documentTextOutline,
  analyticsOutline,
} from "ionicons/icons";
import moment from "moment";
import { getAllCountries, getCountryStatistics } from "../utils/api";
import { CountryStatistics, CountriesNames } from "../utils/types";

const Location: React.FC = () => {
  const [country, setCountry] = useState<string>("USA");
  const [countryCode, setCountryCode] = useState<string>("US");
  const [countries, setCountries] = useState<CountriesNames[]>([
    {
      name: "",
      code: "",
    },
  ]);
  const [countryStatisticsData, setCountryStatisticsData] = useState<
    CountryStatistics
  >({
    coordinates: {
      latitude: 0,
      longitude: 0,
    },
    name: "",
    code: "",
    population: 0,
    updated_at: "",
    today: {
      deaths: 0,
      confirmed: 0,
    },
    latest_data: {
      deaths: 0,
      confirmed: 0,
      recovered: 0,
      critical: 0,
      calculated: {
        death_rate: 0,
        recovery_rate: 0,
        recovered_vs_death_ratio: 0,
        cases_per_million_population: 0,
      },
    },
  });
  useIonViewWillEnter(() => {
    getAllCountries()
      .then((res) => {
        const c = res.data.data;
        const countries =
          c &&
          c.map((item: CountryStatistics) => {
            return {
              name: item.name,
              code: item.code,
            };
          });
        setCountries(countries);
      })
      .catch((error) => console.log(error));
  });
  useEffect(() => {
    getCountryStatistics(countryCode)
      .then((res) => {
        const x = res.data.data;
        const { timeline, ...y } = x;
        setCountryStatisticsData({ ...y });
        setCountry(y.name);
      })
      .catch((error) => console.log(error));
  }, [countryCode]);
  console.log(countryStatisticsData);
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
            <IonLabel>COVID-19 by Country</IonLabel>
          </IonListHeader>
          <IonItem>
            <IonText>
              <p>Coronavirus pandemic by country and territory.</p>
            </IonText>
          </IonItem>
          <IonItem color="light">
            <IonLabel position="floating">Country</IonLabel>
            <IonSelect
              value={countryCode}
              onIonChange={(e) => setCountryCode(e.detail.value)}
            >
              {countries.map((item, index) => (
                <IonSelectOption key={index} value={`${item.code}`}>
                  {item.name} ({item.code})
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        </IonList>
        <IonList lines="full">
          <IonListHeader lines="full">
            <IonLabel>{country}</IonLabel>
          </IonListHeader>
          <IonItem>
            <IonIcon
              icon={thermometer}
              slot="start"
              color="warning"
              size="small"
            />
            <IonLabel>Confirmed</IonLabel>
            <IonLabel className="font-weight-label" color="warning">
              {countryStatisticsData.latest_data.confirmed.toLocaleString("en")}
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
              {countryStatisticsData.latest_data.recovered.toLocaleString("en")}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon
              icon={medicalSharp}
              slot="start"
              color="danger"
              size="small"
            />
            <IonLabel>Critical</IonLabel>
            <IonLabel className="font-weight-label" color="danger">
              {countryStatisticsData.latest_data.critical.toLocaleString("en")}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={bed} slot="start" color="dark" size="small" />
            <IonLabel>Deaths</IonLabel>
            <IonLabel className="font-weight-label" color="dark">
              {countryStatisticsData.latest_data.deaths.toLocaleString("en")}
            </IonLabel>
          </IonItem>
        </IonList>
        <IonList lines="full">
          <IonItem color="light">
            <IonIcon icon={documentTextOutline} slot="start" size="small" />
            <IonLabel>
              New Casses{" "}
              {moment(countryStatisticsData.updated_at).format("DD.MMM.YYYY")}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon
              icon={thermometer}
              slot="start"
              color="warning"
              size="small"
            />
            <IonLabel>Confirmed</IonLabel>
            <IonLabel className="font-weight-label" color="warning">
              {countryStatisticsData.today.confirmed.toLocaleString("en")}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={bed} slot="start" color="dark" size="small" />
            <IonLabel>Deaths</IonLabel>
            <IonLabel className="font-weight-label" color="dark">
              {countryStatisticsData.today.deaths.toLocaleString("en")}
            </IonLabel>
          </IonItem>
        </IonList>
        <IonList lines="full">
          <IonItem color="light">
            <IonIcon icon={analyticsOutline} slot="start" size="small" />
            <IonLabel>Statistics</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Recovery Rate</IonLabel>
            <IonLabel className="font-weight-label" color="success">
              {countryStatisticsData.latest_data.calculated.recovery_rate.toFixed(
                2
              )}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Deaths Rate</IonLabel>
            <IonLabel className="font-weight-label" color="dark">
              {countryStatisticsData.latest_data.calculated.death_rate.toFixed(
                2
              )}
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

export default Location;
