import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import './Listagem.css';

const ListagemPaises = () => {
  const [countries, setCountries] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const countriesPerPage = 10

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        setCountries(response.data)
      })
      .catch((error) => {
        console.error('Erro ao obter a lista de países:', error)
      })
  }, [])

  const navigate = useNavigate()

  const verDetalhes = (id, capital, region) => {
    navigate(`/pais/${id}`, { state: { capital, region } })
  }


  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  }

  const offset = pageNumber * countriesPerPage
  const paginatedCountries = countries.slice(
    offset,
    offset + countriesPerPage
  )

  return (
    <div>
      <h1>Lista de Países</h1>
      <div className="card-list">
        {paginatedCountries.map((country) => (
          <div key={country.cca3} className="card">
            <h3>{country.name.common}</h3>
            <img src={country.flags.png} alt={country.name.common} />
            <button onClick={() => verDetalhes(country.cca3, country.capital?.[0], country.region)}>
            Detalhe
            </button>
          </div>
        ))}
      </div>
      <ReactPaginate
        previousLabel="Anterior"
        nextLabel="Próxima"
        breakLabel="..."
        breakClassName="pagination-break"
        pageCount={Math.ceil(countries.length / countriesPerPage)}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"
      />
    </div>
  );
}

export default ListagemPaises;
