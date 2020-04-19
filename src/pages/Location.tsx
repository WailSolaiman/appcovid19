import React from "react";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonMenuButton,
  IonPage,
  IonList,
  IonItem,
  IonButton,
  IonIcon,
  IonAlert,
  IonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import {
  medicalSharp,
  heartCircle,
  bed,
  thermometer,
  documentTextOutline,
  analyticsOutline,
  globeOutline,
  star,
} from "ionicons/icons";
import { AxiosResponse, AxiosError } from "axios";
import moment from "moment";
import { Store } from "../store/Store";
import ListItems from "../components/ListItems ";
import Selector from "../components/Selector";
import Footer from "../components/Footer";
import { getAllCountries, getCountryStatistics } from "../utils/api";
import { ICountryStatistics } from "../utils/types";
import {
  addItemToDataContainer,
  isItemExistInDataContainer,
} from "../utils/utils";

const Location: React.FC = (): JSX.Element => {
  const { state, dispatch } = React.useContext(Store);
  const [addItemAlert, setAddItemAlert] = React.useState<boolean>(false);
  const [showToast, setShowToast] = React.useState<boolean>(false);

  useIonViewWillEnter(() => fetchAllCountriesData());

  const fetchAllCountriesData = () => {
    getAllCountries()
      .then((response: AxiosResponse) => {
        const { data } = response.data;
        const countries: ICountryStatistics[] = data;
        dispatch({
          type: "FETCH_API_COVID_COUNTRIES_DATA",
          payload: countries,
        });
      })
      .catch((error: AxiosError) => console.log(error.message));
  };

  const getCountryData = (country: ICountryStatistics): void => {
    const c: string = country.code;
    getCountryStatistics(c)
      .then((response: AxiosResponse) => {
        const { data } = response.data;
        const { timeline, ...y } = data;
        const country: ICountryStatistics = { ...y };
        dispatch({
          type: "UPDATE_COUNTRY_DATA",
          payload: country,
        });
      })
      .catch((error: AxiosError) => console.log(error.message));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonMenuButton slot="start" color="light" />
          <IonTitle>Location</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Selector
          header="COVID-19 by Country"
          subHeader="Coronavirus pandemic by country and territory."
          selectedText={state.countryData.name}
          getCountryData={getCountryData}
          countries={state.countries}
          toastMessage="has been added to favourire."
        />
        <IonList lines="none">
          <IonItem color="light">
            <IonButton
              type="button"
              color="primary"
              strong={true}
              expand="full"
              fill="clear"
              size="small"
              onClick={() => setAddItemAlert(true)}
              disabled={
                isItemExistInDataContainer(state.countryData.code) ||
                state.countryData.name === ""
                  ? true
                  : false
              }
            >
              <IonIcon slot="start" icon={star} />
              Add to favourite
            </IonButton>
          </IonItem>
        </IonList>
        {state.countryData.name === "" || state.countryData.code === "" ? (
          <div />
        ) : (
          <React.Fragment>
            <ListItems
              header={state.countryData.name}
              isHeader={true}
              subHeader="Coronavirus monitor"
              subHeaderIcon={globeOutline}
              items={[
                {
                  color: "",
                  icon: thermometer,
                  iconColor: "warning",
                  label: "Confirmed",
                  labelColor: "warning",
                  labelContent: state.countryData.latest_data.confirmed,
                },
                {
                  color: "",
                  icon: heartCircle,
                  iconColor: "success",
                  label: "Recovered",
                  labelColor: "success",
                  labelContent: state.countryData.latest_data.recovered,
                },
                {
                  color: "",
                  icon: medicalSharp,
                  iconColor: "danger",
                  label: "Critical",
                  labelColor: "danger",
                  labelContent: state.countryData.latest_data.critical,
                },
                {
                  color: "",
                  icon: bed,
                  iconColor: "dark",
                  label: "Deaths",
                  labelColor: "dark",
                  labelContent: state.countryData.latest_data.deaths,
                },
              ]}
            />
            <ListItems
              header=""
              isHeader={false}
              subHeader={`New Casses (${moment(
                state.countryData.updated_at
              ).format("DD.MMM.YYYY")})`}
              subHeaderIcon={documentTextOutline}
              items={[
                {
                  color: "",
                  icon: thermometer,
                  iconColor: "warning",
                  label: "Confirmed",
                  labelColor: "warning",
                  labelContent: state.countryData.today.confirmed,
                },
                {
                  color: "",
                  icon: bed,
                  iconColor: "dark",
                  label: "Deaths",
                  labelColor: "dark",
                  labelContent: state.countryData.today.deaths,
                },
              ]}
            />
            <ListItems
              header=""
              isHeader={false}
              subHeader="Statistics"
              subHeaderIcon={analyticsOutline}
              items={[
                {
                  color: "",
                  icon: heartCircle,
                  iconColor: "success",
                  label: "Recovery Rate",
                  labelColor: "success",
                  labelContent:
                    state.countryData.latest_data.calculated.recovery_rate,
                },
                {
                  color: "",
                  icon: bed,
                  iconColor: "dark",
                  label: "Deaths Rate",
                  labelColor: "dark",
                  labelContent:
                    state.countryData.latest_data.calculated.death_rate,
                },
              ]}
            />
          </React.Fragment>
        )}
        <IonAlert
          isOpen={addItemAlert}
          onDidDismiss={() => setAddItemAlert(false)}
          header={"Add."}
          message={`Add (${state.countryData.name}) to your favourite list?`}
          buttons={[
            {
              text: "Cancel",
              role: "cancel",
              cssClass: "secondary",
            },
            {
              text: "Okay",
              handler: () => {
                addItemToDataContainer(state.countryData);
                setShowToast(true);
              },
            },
          ]}
        />
        <IonToast
          isOpen={showToast}
          position="top"
          onDidDismiss={() => setShowToast(false)}
          message={`${state.countryData.name} has been added to your favourite list.`}
          duration={2000}
        />
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default Location;
