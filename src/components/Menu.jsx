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
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { bookmarkOutline, bookmarkSharp, homeOutline, homeSharp } from 'ionicons/icons';
import './Menu.css';
import { useStoreState } from 'pullstate';
import { QuoteStore } from '../store';
import { getSavedQuotes } from '../store/Selectors';

const Menu = () => {
  
  const location = useLocation();
  const saved = useStoreState(QuoteStore, getSavedQuotes);

  const appPages = [
    {
      title: 'Home',
      url: '/home',
      iosIcon: homeOutline,
      mdIcon: homeSharp
    },
    {
      title: `Bookmarks (${ saved.length })`,
      url: '/saved',
      iosIcon: bookmarkOutline,
      mdIcon: bookmarkSharp
    }
  ];

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list" className="ion-margin-top">
          <IonListHeader>Ionic Quotes</IonListHeader>
          <IonNote>hey there!</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
