import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Img1, Img2, Img3} from './assets';

const Card = ({counter, img, onIncrement, onDecrement}) => {
  return (
    <View style={styles.card}>
      <Image
        source={img}
        style={{
          width: '100%',
          height: 180,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      />
      <View style={[styles.top, styles.btnScope]}>
        <View style={[styles.smallBtn, {borderColor: '#deddde'}]}>
          <Text style={styles.smlBtnTxt}>{counter} Like</Text>
        </View>
        <View style={[styles.top, {marginBottom: 0}]}>
          <Pressable
            style={[styles.smallBtn, styles.like]}
            onPress={onIncrement}>
            <Text style={[styles.smlBtnTxt, {color: '#fff'}]}>Like</Text>
          </Pressable>
          <Pressable
            style={[styles.smallBtn, styles.dislike]}
            onPress={onDecrement}
            disabled={counter <= 0}>
            <Text style={[styles.smlBtnTxt, {color: '#fff'}]}>Dislike</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const CounterCard = () => {
  const topButton = [
    {
      id: 1,
      title: 'Like All',
      color: '#2a72c4',
      func: () => handleLikeAll(),
    },
    {
      id: 2,
      title: 'Reset All',
      color: '#FFF',
      func: () => handleResetAll(),
    },
    {
      id: 3,
      title: 'Dislike All',
      color: '#dc2c2c',
      func: () => handleDislikeAll(),
    },
  ];

  const data = [
    {
      img: Img1,
    },
    {
      img: Img2,
    },
    {
      img: Img3,
    },
    {
      img: Img1,
    },
  ];
  const idObj = [];
  const [counter, setCounter] = useState([]);
  const setObjectVal = () => {
    data.map((item, index) =>
      idObj.push({
        id: index,
        value: 0,
      }),
    );
  };

  useEffect(() => {
    setObjectVal();
    setCounter(idObj);
  }, []);

  const handleLike = index => {
    const newCounts = [...counter];
    newCounts[index].value += 1;
    setCounter(newCounts);
  };
  const handleDislike = index => {
    const newCounts = [...counter];
    newCounts[index].value -= 1;
    setCounter(newCounts);
  };

  const handleLikeAll = () => {
    const incData = [];
    counter.map(item => {
      incData.push({
        id: item?.id,
        value: item?.value + 1,
      });
    });
    setCounter(incData);
  };
  const handleResetAll = () => {
    const resetData = [];
    counter.map(item => {
      resetData.push({
        id: item?.id,
        value: 0,
      });
    });
    setCounter(resetData);
  };
  const handleDislikeAll = () => {
    const decData = [];
    counter.map(item => {
      decData.push({
        id: item?.id,
        value: item?.value > 0 ? item?.value - 1 : 0,
      });
    });
    setCounter(decData);
  }

  return (
    <SafeAreaView style={{flex: 1, paddingBottom: 24}}>
      <View style={{padding: 16, marginBottom: 24}}>
        <View style={styles.top}>
          {topButton.map((item, id) => {
            return (
              <TouchableOpacity
                key={id}
                onPress={item.func}
                style={[
                  styles.btn,
                  {
                    backgroundColor: item?.color,
                    borderWidth: item.id === 2 ? 1 : 0,
                  },
                ]}>
                <Text
                  style={[
                    styles.btnTxt,
                    {color: item.id === 2 ? 'black' : '#fff'},
                  ]}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {data.map((item, index) => {
            return (
              <View key={index}>
                <Card
                  img={item.img}
                  counter={counter[index]?.value}
                  onDecrement={() => handleDislike(index)}
                  onIncrement={() => handleLike(index)}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CounterCard;
const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  btn: {
    width: '24%',
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  like: {marginRight: 16, borderWidth: 0, backgroundColor: '#2a72c4'},
  dislike: {borderWidth: 0, backgroundColor: '#dc2c2c'},
  smallBtn: {
    width: 80,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  smlBtnTxt: {
    fontSize: 16,
    fontWeight: '600',
  },
  btnTxt: {
    fontSize: 16,
    fontWeight: '600'
  },
  card: {
    height: 240,
    width: '100%',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 16,
  },
  btnScope: {marginBottom: 0, marginVertical: 8, paddingHorizontal: 16},
});
