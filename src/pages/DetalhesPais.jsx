import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import './Detalhes.css';

const DetalhesPais = () => {
  const { id } = useParams()

  const [country, setCountry] = useState(null)

  const { capital, region } = useLocation().state || {}

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/alpha/${id}`)
      .then((response) => {
        setCountry(response.data)
      })
      .catch((error) => {
        console.error('Erro ao obter detalhes do país:', error)
      })
  }, [id])

  if (!country) {
    return <p>Carregando...</p>
  }

  return (
    <div className='container'>
      <p>Capital: {capital}</p>
      <p>Continente: {region}</p>
    </div>
  );
}

export default DetalhesPais;

