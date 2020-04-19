import React, { useState } from "react";
import {
  IonList,
  IonListHeader,
  IonLabel,
  IonItem,
  IonInput,
} from "@ionic/react";
import { IUserData } from "../utils/types";

const UserData: React.FC = (): JSX.Element => {
  const [userData, setUserData] = useState<IUserData>({
    username: "",
    email: "",
    password: "",
  });
  return (
    <IonList lines="full">
      <IonListHeader>
        <IonLabel>User profile</IonLabel>
      </IonListHeader>
      <IonItem>
        <IonInput
          value={userData?.username}
          type="text"
          placeholder="Username"
          onIonChange={(e) =>
            setUserData({ ...userData, username: e.detail.value! })
          }
        />
      </IonItem>
      <IonItem>
        <IonInput
          value={userData?.email}
          type="email"
          placeholder="Email"
          onIonChange={(e) =>
            setUserData({ ...userData, email: e.detail.value! })
          }
        />
      </IonItem>
      <IonItem>
        <IonInput
          value={userData?.password}
          type="password"
          placeholder="Password"
          onIonChange={(e) =>
            setUserData({ ...userData, password: e.detail.value! })
          }
        />
      </IonItem>
    </IonList>
  );
};

export default UserData;
