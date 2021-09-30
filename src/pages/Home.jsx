import { IonButtons, IonContent, IonGrid, IonHeader, IonInfiniteScroll, IonInfiniteScrollContent, IonList, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useStoreState } from 'pullstate';
import { useState } from 'react';
import { QuoteItem } from '../components/QuoteItem';
import { QuoteStore } from '../store';
import { getQuotes } from '../store/Selectors';

const Home = () => {

	const quotes = useStoreState(QuoteStore, getQuotes);
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
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          <IonList>
            <IonRow>
              { quotes.map((quote, index) => {

                if ((index <= amountLoaded) && quote.author) {
                  return (

                    <QuoteItem key={ index } quote={ quote } />
                  );
                } else return "";
              })}
            </IonRow>
          </IonList>

          <IonInfiniteScroll threshold="200px" onIonInfinite={ fetchMore }>
            <IonInfiniteScrollContent loadingSpinner="bubbles" loadingText="Getting more quotes...">
            </IonInfiniteScrollContent>
          </IonInfiniteScroll>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;