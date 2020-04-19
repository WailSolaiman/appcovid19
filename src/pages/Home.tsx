import React from "react";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonMenuButton,
  IonPage,
  useIonViewWillEnter,
} from "@ionic/react";
import {
  documentTextOutline,
  globeOutline,
  medicalSharp,
  heartCircle,
  bed,
  thermometer,
} from "ionicons/icons";
import { AxiosResponse, AxiosError } from "axios";
import moment from "moment";
import { Store } from "../store/Store";
import { getStatistics } from "../utils/api";
import { ITotalStatistics } from "../utils/types";
import ListItems from "../components/ListItems ";
import Footer from "../components/Footer";

const Home: React.FC = (): JSX.Element => {
  const { state, dispatch } = React.useContext(Store);

  useIonViewWillEnter(() => {
    state.worldwideData && fetchGlobalDataStatistics();
  });

  const fetchGlobalDataStatistics = () => {
    getStatistics()
      .then((response: AxiosResponse) => {
        const { data } = response.data;
        const x: ITotalStatistics = data[0];
        dispatch({
          type: "FETCH_API_COVID_GLOBAL_DATA",
          payload: x,
        });
      })
      .catch((error: AxiosError) => console.log(error.message));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonMenuButton slot="start" color="light" />
          <IonTitle>AppCovid19</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ListItems
          header="COVID-19 Worldwide"
          isHeader={true}
          subHeader="Coronavirus monitor"
          subHeaderIcon={globeOutline}
          items={[
            {
              color: "",
              icon: medicalSharp,
              iconColor: "warning",
              label: "Confirmed",
              labelColor: "warning",
              labelContent: state.worldwideData.confirmed,
            },
            {
              color: "",
              icon: thermometer,
              iconColor: "danger",
              label: "Active",
              labelColor: "danger",
              labelContent: state.worldwideData.active,
            },
            {
              color: "",
              icon: heartCircle,
              iconColor: "success",
              label: "Recovered",
              labelColor: "success",
              labelContent: state.worldwideData.recovered,
            },
            {
              color: "",
              icon: bed,
              iconColor: "dark",
              label: "Deaths",
              labelColor: "dark",
              labelContent: state.worldwideData.deaths,
            },
          ]}
        />
        <ListItems
          header=""
          isHeader={false}
          subHeader={`New Casses (${moment(state.worldwideData.date).format(
            "DD.MMM.YYYY"
          )})`}
          subHeaderIcon={documentTextOutline}
          items={[
            {
              color: "",
              icon: medicalSharp,
              iconColor: "warning",
              label: "Confirmed",
              labelColor: "warning",
              labelContent: state.worldwideData.new_confirmed,
            },
            {
              color: "",
              icon: heartCircle,
              iconColor: "success",
              label: "Recovered",
              labelColor: "success",
              labelContent: state.worldwideData.new_recovered,
            },
            {
              color: "",
              icon: bed,
              iconColor: "dark",
              label: "Deaths",
              labelColor: "dark",
              labelContent: state.worldwideData.new_deaths,
            },
          ]}
        />
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default Home;
