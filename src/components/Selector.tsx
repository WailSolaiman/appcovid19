import React, { useState } from "react";
import {
  IonList,
  IonListHeader,
  IonLabel,
  IonItem,
  IonText,
  IonSelect,
  IonSelectOption,
  IonToast,
} from "@ionic/react";
import { Store } from "../store/Store";
import { ICountryStatistics, ISelector } from "../utils/types";
import { countriesDataInitial } from "../utils/init";

const Selector: React.FC<ISelector> = ({
  header = "",
  subHeader = "",
  selectedText = "",
  getCountryData = (code) => {},
  countries = [countriesDataInitial],
  toastMessage = "",
}): JSX.Element => {
  const { state } = React.useContext(Store);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [selectedCountries, setSelectedCountries] = useState<
    ICountryStatistics[]
  >([]);

  return (
    <React.Fragment>
      <IonList lines="none">
        <IonListHeader>
          <IonLabel>{header}</IonLabel>
        </IonListHeader>
        <IonItem>
          <IonText>
            <p>{subHeader}</p>
          </IonText>
        </IonItem>
        <IonItem color="light">
          <IonLabel position="floating">Country</IonLabel>
          <IonSelect
            selectedText={countries.length === 0 ? "" : selectedText}
            value={selectedCountries}
            multiple={false}
            placeholder="Select Country"
            interface="alert"
            disabled={countries.length === 0 ? true : false}
            onIonChange={(e) => {
              setSelectedCountries(e.detail.value);
              getCountryData(e.detail.value);
            }}
          >
            {countries.map((item: ICountryStatistics, index: number) => (
              <IonSelectOption key={index} value={item}>
                {item.name}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
      </IonList>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={`${state.countryData.name} ${toastMessage}`}
        duration={2000}
      />
    </React.Fragment>
  );
};

export default Selector;
