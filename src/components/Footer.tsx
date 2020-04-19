import React from "react";
import { IonFooter, IonToolbar, IonLabel } from "@ionic/react";

const Footer: React.FC = (): JSX.Element => {
  return (
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
  );
};

export default Footer;
