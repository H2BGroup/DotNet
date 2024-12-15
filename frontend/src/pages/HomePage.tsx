import React, { useEffect } from 'react'
import Title from '../components/Title'

const HomePage = () => {
  useEffect(() => {
    document.title = 'Car Sensors - Home'
  }, [])
  return (
    <div>
      <Title
        title='Lista rzeczy do zrobienia'
        className='text-center text-red-600'
      />
      <br />
      <p className='text-center'>Utworzona aplikacja Frontend oferuje: </p>
      <ol className='list-decimal list-inside text-center w-1/2 mx-auto'>
        <li>przeglądanie zgromadzonych danych w formie tabelarycznej,</li>
        <li>
          filtrowanie danych według daty, typu czujnika (grupa instancji),
          instancji czujnika,
        </li>
        <li>sortowanie danych w tabeli;</li>
        <li>pobieranie danych w formacie CSV, JSON dla wybranych filtrów;</li>
        <li>prezentacja danych w formie wykresów dla wybranych filtrów.</li>
        <li>
          pulpit, na którym widać ostatnią wartość i średnią wartość (dla
          ostatnich 100 komunikatów) dla każdego sensora - prezentowane dane nie
          wymagają odświeżania strony, wartości odświeżają się samodzielnie po
          zarejestrowaniu nowej wartości (+0,5 oceny).
        </li>
      </ol>
    </div>
  )
}

export default HomePage
