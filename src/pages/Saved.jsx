import { IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInfiniteScroll, IonInfiniteScrollContent, IonList, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useStoreState } from 'pullstate';
import { useState } from 'react';
import { QuoteItem } from '../components/QuoteItem';
import { QuoteStore } from '../store';
import { getQuotes, getSavedQuotes } from '../store/Selectors';

const Saved = () => {

	const quotes = useStoreState(QuoteStore, getQuotes);
	const saved = useStoreState(QuoteStore, getSavedQuotes);
  const [ amountLoaded, setAmountLoaded ] = useState(20);

  const fetchMore = async e => {

    setAmountLoaded(amountLoaded => amountLoaded + 20);
		e.target.complete();
	}

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Bookmarks</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Bookmarks</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          { quotes.length > 0 &&
          
            <IonList>
              <IonRow>
                { quotes.map((quote, index) => {

                  if ((index <= amountLoaded) && saved.includes(parseInt(quote.id))) {
                    return (

                      <QuoteItem key={ index } quote={ quote } />
                    );
                  } else return "";
                })}

                <IonInfiniteScroll threshold="200px" onIonInfinite={ fetchMore }>
                  <IonInfiniteScrollContent loadingSpinner="bubbles" loadingText="Getting more quotes...">
                  </IonInfiniteScrollContent>
                </IonInfiniteScroll>
              </IonRow>
            </IonList>
          }

          { quotes.length < 1 &&
            <IonRow>
              <IonCol size="12">
                <h3>You haven't saved any bookmarks yet.</h3>
              </IonCol>
            </IonRow>
          }
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Saved;