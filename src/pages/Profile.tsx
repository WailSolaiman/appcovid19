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
import UserData from "../components/UserData";
import moment from "moment";
import { Store } from "../store/Store";
import ListItems from "../components/ListItems ";
import Selector from "../components/Selector";
import { ICountryStatistics } from "../utils/types";
import {
  getItemFromDataContainer,
  removeItemFromDataContainer,
  getAllItemsFromDataContainer,
} from "../utils/utils";
import { countriesDataInitial } from "../utils/init";

const Profile: React.FC = (): JSX.Element => {
  const { state, dispatch } = React.useContext(Store);
  const [removeItemAlert, setRemoveItemAlert] = React.useState<boolean>(false);
  const [showToast, setShowToast] = React.useState<boolean>(false);

  React.useEffect(() => {
    getAllItemsFromDataContainer();
  }, [state]);

  const getCountryData = (countryx: ICountryStatistics): void => {
    const c: string = countryx.code;
    const country: ICountryStatistics = getItemFromDataContainer(c);
    dispatch({
      type: "UPDATE_FAV_COUNTRY_DATA",
      payload: country,
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
        <UserData />
        <div>
          <Selector
            header="User favourite countries"
            subHeader="Coronavirus pandemic by country and territory."
            selectedText={state.favCountryData.name}
            getCountryData={getCountryData}
            countries={getAllItemsFromDataContainer()}
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
                  getAllItemsFromDataContainer().length === 0 ||
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
          {getAllItemsFromDataContainer().length === 0 ||
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
                  removeItemFromDataContainer(state.favCountryData.code);
                  const favCountries: ICountryStatistics[] = getAllItemsFromDataContainer();
                  if (favCountries.length === 0) {
                    dispatch({
                      type: "UPDATE_FAV_COUNTRY_DATA",
                      payload: countriesDataInitial,
                    });
                  } else {
                    dispatch({
                      type: "UPDATE_FAV_COUNTRY_DATA",
                      payload: favCountries[0],
                    });
                  }
                },
              },
            ]}
          />
          <IonToast
            isOpen={showToast}
            position="top"
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
