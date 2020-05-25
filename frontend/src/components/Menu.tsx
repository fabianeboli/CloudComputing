import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from "@ionic/react";

import React from "react";
import { useLocation } from "react-router-dom";
import {
  bookmarkOutline,
  homeOutline,
  homeSharp,
  alarmOutline,
  alarmSharp,
  callOutline,
  callSharp
} from "ionicons/icons";
import "./Menu.css";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Strona Główna",
    url: "/page/about ",
    iosIcon: homeOutline,
    mdIcon: homeSharp,
  },
  {
    title: "Rezerwacja",
    url: "/page/reservation",
    iosIcon: alarmOutline,
    mdIcon: alarmSharp,
  },
  {
    title: "Kontakt",
    url: "/page/contact",
    iosIcon: callOutline,
    mdIcon: callSharp,
  },
  // {
  //   title: "Archived",
  //   url: "/page/Archived",
  //   iosIcon: archiveOutline,
  //   mdIcon: archiveSharp,
  // },
  // {
  //   title: "Trash",
  //   url: "/page/Trash",
  //   iosIcon: trashOutline,
  //   mdIcon: trashSharp,
  // },
  // {
  //   title: "Spam",
  //   url: "/page/Spam",
  //   iosIcon: warningOutline,
  //   mdIcon: warningSharp,
  // },
];

const labels = ["Family", "Friends", "Notes", "Work", "Travel", "Reminders"];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Inbox</IonListHeader>
          <IonNote>hi@ionicframework.com</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon slot="start" icon={appPage.iosIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
