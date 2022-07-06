import React, {useCallback, useEffect, useState} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import axios from 'axios';
import moment from 'moment';
import {XMLParser, XMLValidator} from 'fast-xml-parser';

import TopPanel from '../../components/TopPanel/TopPanel';
import CursList from '../../components/CursList/CursList';
import {getData, storeData} from '../../utils/storage';
import {RootContext} from '../../Contexts/RootContext';
import {SPACE, COLORS} from '../../utils/theme';
import SplashScreen from '../SpashScreen/SplashScreen';

const Home = () => {
  const [load, setLoad] = useState(true);
  const [curs, setCurse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState();

  const getCursOnDate = useCallback(() => {
    if (!loading) {
      setLoading(true);
      const currentDate = moment();
      const xmls = `
        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <GetCursOnDate xmlns="http://web.cbr.ru/">
              <On_date>${currentDate.format('YYYY-MM-DD')}</On_date>
            </GetCursOnDate>
          </soap:Body>
        </soap:Envelope>`;

      axios
        .post('http://www.cbr.ru/DailyInfoWebServ/DailyInfo.asmx', xmls, {
          headers: {'Content-Type': 'text/xml; charset=utf-8'},
        })
        .then(res => {
          const xml = res.data;
          if (XMLValidator.validate(xml)) {
            const parser = new XMLParser();
            let jsonObj = parser.parse(xml);
            if (jsonObj) {
              const curs =
                jsonObj?.['soap:Envelope']?.['soap:Body']?.GetCursOnDateResponse
                  ?.GetCursOnDateResult?.['diffgr:diffgram']?.ValuteData
                  ?.ValuteCursOnDate;
              if (curs) {
                setCurse(curs);

                const dateForSave = currentDate.toDate().getTime().toString();
                storeData('lastUpdate', dateForSave).then(() => {
                  setLastUpdate(+dateForSave);
                });
              }
            }
          }
          setLoading(false);
        })
        .catch(err => {
          alert(err);
        });
    }
  }, [loading]);

  useEffect(() => {
    const secondsPerRequest = 15;
    getCursOnDate();
    const timer = setInterval(() => {
      getCursOnDate();
    }, secondsPerRequest * 1000);

    getData('lastUpdate').then(date => {
      if (date) {
        setLastUpdate(+date);
      }
    });

    return () => {
      clearInterval(timer);
    };
  }, []);

  const value = {curs, loading, lastUpdate};

  if (load) {
    return <SplashScreen onLoadEnd={() => setLoad(false)} />;
  }

  return (
    <RootContext.Provider value={value}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <TopPanel />
          <CursList sx={styles.list} />
        </View>
      </SafeAreaView>
    </RootContext.Provider>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.secondary,
    paddingVertical: SPACE[4],
    paddingHorizontal: SPACE[3],
  },
  list: {
    flex: 1,
    marginTop: SPACE[3],
  },
});
