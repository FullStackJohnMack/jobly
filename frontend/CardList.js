import React, { useState, useEffect } from 'react';
import Card from './Card';
import { Container } from 'react-bootstrap';

function CardList({cards, user}) {

    return (
        <>
            {cards.map( (info) => (
                <Card info={info} />
            ))}
        </>
    )
}

export default CardList