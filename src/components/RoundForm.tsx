import React, { useState, useEffect } from 'react';
import useRound from '../hooks/useRound';
import { Link, useNavigate } from 'react-router-dom';

function RoundForm(){
    const [ update, setUpdate ] = useState<any>(null);
    const { round, onGetRound } = useRound();
    const navigation = useNavigate();

    useEffect(() => {
        if(!round){} onGetRound();
    }, []);


    return (
        <form>
            
        </form>
    )
}

export default RoundForm;