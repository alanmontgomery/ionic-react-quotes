import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonHeader, IonIcon, IonImg, IonPage, IonRow, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { bookmarkOutline, checkmarkOutline, copyOutline } from 'ionicons/icons';
import { useStoreState } from 'pullstate';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { QuoteStore } from '../store';
import { addSavedQuote, removeSavedQuote } from '../store/QuoteStore';
import { getQuote, getSavedQuotes } from '../store/Selectors';

import { Clipboard } from '@capacitor/clipboard';

const Quote = () => {

  const { id } = useParams();
  const quote = useStoreState(QuoteStore, getQuote(id));
  const saved = useStoreState(QuoteStore, getSavedQuotes);
  const [ bookmarked, setBookmarked ] = useState(false);

  const [ present ] = useIonToast();

  useEffect(() => {

    setBookmarked(saved.includes(parseInt(id)));
  }, [ saved, id ]);

  const copyQuote = async () => {

    await Clipboard.write({

      string: quote.text
    });

    present({

      header: "Success",
      message: "Quote copied to clipboard!",
      duration: 2500,
      color: "primary"
    });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Home" />
          </IonButtons>
          <IonTitle>Quote</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Quote</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonCard className="animate__animated animate__slideInRight animate__faster">
          <IonImg src={ quote.image } alt="quote cover" />
          <IonCardContent>
            <h1>{ quote.text }</h1>
            <p>- { quote.author }</p>
          </IonCardContent>

          <IonRow>
            <IonCol size="6">
              <IonButton fill={ !bookmarked ? "outline" : "solid" } onClick={ () => bookmarked ? removeSavedQuote(quote.id) : addSavedQuote(quote.id) }>
                <IonIcon icon={ bookmarked ? checkmarkOutline : bookmarkOutline } />
                &nbsp;{ bookmarked ? "Bookmarked" : "Save as Bookmark" }
              </IonButton>
            </IonCol>

            <IonCol size="4">
              <IonButton fill="outline" onClick={ copyQuote }>
                <IonIcon icon={ copyOutline } />
                &nbsp;Copy Quote
              </IonButton>
            </IonCol>
          </IonRow>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Quote;
