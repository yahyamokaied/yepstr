import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';

const FetchData = () => {

    const [score, setScore] = useState<number>(0);
    const [image, setImage] = useState<any>();
    const [card1, setCard1] = useState<any>();
    const [card2, setCard2] = useState<any>();
    //const [score, setScore] = useState();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            let res = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
            let data = await res.json();
            console.log(data);
            let newRes = await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=2`);
            let newData = await newRes.json();
            setCard1(newData.cards[0]);
            setCard2(newData.cards[1]);
            console.log(newData);
            setImage(newData.cards[0].image);
        } catch (error) {
            console.log(error);
        }
    };

    const newCards = () => {
        getData();
    }

    const cardUp = () => {
        setImage(card2.image);
        var oldC = parseInt(checkValue(card1.value));
        var newC = parseInt(checkValue(card2.value));
        if (oldC < newC) {
            addToScore();
        }
    }

    const cardDown = () => {
        setImage(card2.image);
        var oldC = parseInt(checkValue(card1.value));
        var newC = parseInt(checkValue(card2.value));
        if (oldC > newC) {
            addToScore();
        }
    }

    const addToScore = () => {
        setScore(score + 1);

    }

    const checkValue = (value: string) => {
        if (value === 'JACK') return '11';
        if (value === 'QUEEN') return '12';
        if (value === 'KING') return '13';
        if (value === 'ACE') return '14';
        return value;
    };



    return (
        <View style={styles.Container}>
            <View style={styles.score}>
                <Text style={styles.scoreTXT}>Score</Text>
                <Text style={styles.scoreTXT}>{score}</Text>
            </View>
            <Image
                style={styles.card}
                source={{ uri: image }}
            />
            <View style={styles.row}>
                <TouchableOpacity style={styles.btn}
                    onPress={() => { cardDown() }}>
                    <Text style={styles.btnTXT}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}
                    onPress={() => { newCards() }}>
                    <Text style={styles.btnTXT}>New</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}
                    onPress={() => { cardUp() }}>
                    <Text style={styles.btnTXT}>+</Text>
                </TouchableOpacity>
            </View>

        </View>


    )
};

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        height: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        margin: 4
    },
    score: {
        width: 120,
        height: 60,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 20,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4
    },
    card: {
        width: '70%',
        height: '50%',
        resizeMode: 'cover',
        margin: 4

    },
    scoreTXT: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    btn: {
        width: 100,
        height: 60,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4
    },
    btnTXT: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    }
});

export default FetchData;