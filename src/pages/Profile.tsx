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
  IonToast,
  IonAlert,
  useIonViewDidLeave,
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
import moment from "moment";
import { Store } from "../store/Store";
import { app } from "../firebaseConfig";
import ListItems from "../components/ListItems ";
import Selector from "../components/Selector";
import { ICountryStatistics } from "../utils/types";
import { countriesDataInitial } from "../utils/init";

const DB = app.firestore();

const Profile: React.FC = (): JSX.Element => {
  const { state, dispatch } = React.useContext(Store);
  const [removeItemAlert, setRemoveItemAlert] = React.useState<boolean>(false);
  const [showToast, setShowToast] = React.useState<boolean>(false);
  const [favCountries, setFavCountries] = React.useState<ICountryStatistics[]>(
    []
  );

  useIonViewDidLeave(() => {
    dispatch({
      type: "UPDATE_FAV_COUNTRY_DATA",
      payload: countriesDataInitial,
    });
  });

  React.useEffect(() => {
    DB.collection("users")
      .doc(state.user.uid)
      .collection("countries")
      .orderBy("name")
      .onSnapshot((serverUpdate) => {
        const countries: any[] = serverUpdate.docs.map((_doc) => {
          const data = _doc.data();
          data["id"] = _doc.id;
          return data;
        });
        setFavCountries(countries);
      });
  }, [state.favCountryData, state.user]);

  const getCountryData = (countryData: ICountryStatistics): void => {
    dispatch({
      type: "UPDATE_FAV_COUNTRY_DATA",
      payload: countryData,
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonMenuButton slot="start" color="light" />
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div>
          <Selector
            header="User favourite countries"
            subHeader="Coronavirus pandemic by country and territory."
            selectedText={state.favCountryData.name}
            getCountryData={getCountryData}
            countries={favCountries}
            toastMessage="has been removed from favourire."
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
                onClick={() => setRemoveItemAlert(true)}
                disabled={
                  favCountries.length === 0 ||
                  state.favCountryData.name === "" ||
                  state.favCountryData.code === ""
                    ? true
                    : false
                }
              >
                <IonIcon slot="start" icon={star} />
                Remove from favourite
              </IonButton>
            </IonItem>
          </IonList>
          {favCountries.length === 0 ||
          state.favCountryData.name === "" ||
          state.favCountryData.code === "" ? (
            <div />
          ) : (
            <React.Fragment>
              <ListItems
                header={state.favCountryData.name}
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
                    labelContent: state.favCountryData.latest_data.confirmed,
                  },
                  {
                    color: "",
                    icon: heartCircle,
                    iconColor: "success",
                    label: "Recovered",
                    labelColor: "success",
                    labelContent: state.favCountryData.latest_data.recovered,
                  },
                  {
                    color: "",
                    icon: medicalSharp,
                    iconColor: "danger",
                    label: "Critical",
                    labelColor: "danger",
                    labelContent: state.favCountryData.latest_data.critical,
                  },
                  {
                    color: "",
                    icon: bed,
                    iconColor: "dark",
                    label: "Deaths",
                    labelColor: "dark",
                    labelContent: state.favCountryData.latest_data.deaths,
                  },
                ]}
              />
              <ListItems
                header=""
                isHeader={false}
                subHeader={`New Casses (${moment(
                  state.favCountryData.updated_at
                ).format("DD.MMM.YYYY")})`}
                subHeaderIcon={documentTextOutline}
                items={[
                  {
                    color: "",
                    icon: thermometer,
                    iconColor: "warning",
                    label: "Confirmed",
                    labelColor: "warning",
                    labelContent: state.favCountryData.today.confirmed,
                  },
                  {
                    color: "",
                    icon: bed,
                    iconColor: "dark",
                    label: "Deaths",
                    labelColor: "dark",
                    labelContent: state.favCountryData.today.deaths,
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
                      state.favCountryData.latest_data.calculated.recovery_rate,
                  },
                  {
                    color: "",
                    icon: bed,
                    iconColor: "dark",
                    label: "Deaths Rate",
                    labelColor: "dark",
                    labelContent:
                      state.favCountryData.latest_data.calculated.death_rate,
                  },
                ]}
              />
            </React.Fragment>
          )}
          <IonAlert
            isOpen={removeItemAlert}
            onDidDismiss={() => setRemoveItemAlert(false)}
            header={"Confirm the removal."}
            message={`Remove (${state.favCountryData.name}) from your favourite list?`}
            buttons={[
              {
                text: "Cancel",
                role: "cancel",
                cssClass: "secondary",
              },
              {
                text: "Okay",
                handler: () => {
                  setShowToast(true);
                  const cntRef = DB.collection("users")
                    .doc(state.user.uid)
                    .collection("countries")
                    .doc(state.favCountryData.code);
                  cntRef.get().then((doc) => {
                    if (doc.exists) {
                      cntRef.delete();
                    }
                  });
                  dispatch({
                    type: "UPDATE_FAV_COUNTRY_DATA",
                    payload: countriesDataInitial,
                  });
                },
              },
            ]}
          />
          <IonToast
            isOpen={showToast}
            position="bottom"
            onDidDismiss={() => setShowToast(false)}
            message={`${state.favCountryData.name} has been removed from your favourite list.`}
            duration={2000}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
