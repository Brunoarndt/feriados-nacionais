import { useEffect, useState } from 'react';
import axios from 'axios';

const Data = () => {
  const [selectedYear, setSelectedYear] = useState(2023);
  const [holidays, setHolidays] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function dayOfWeek(date){
    const daysOfWeek = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];

    const dataObj = new Date(date);
    const dayOfWeek = daysOfWeek[dataObj.getDay()];

    return { dayOfWeek, isWeekend: dataObj.getDay() === 0 || dataObj.getDay() === 6 };
  }

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  }

  function formatDate(dataString) {
    const dateObj = new Date(dataString);
  

    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1; // Mês é base 0, então adicionamos 1
    const year = dateObj.getFullYear();
  

    const formattedDate = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
  
    return formattedDate;
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://brasilapi.com.br/api/feriados/v1/${selectedYear}`);
        setHolidays(response.data);
      } catch (error) {
        console.error('Erro ao buscar feriados:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedYear]);

  const count = holidays.reduce((acc, item) => {
    const { isWeekend } = dayOfWeek(item.date);
    return acc + (isWeekend ? 1 : 0);
  }, 0);

  return (
    <>
      <div className="container mx-auto mt-4 mb-8">
        <h2 className="text-2xl font-bold mb-4">Escolha o Ano:</h2>
        <input
          type="number"
          value={selectedYear}
          onChange={handleYearChange}
          min={2000} 
          max={2100} 
          className="p-2 border border-gray-300 rounded mb-4"
        />
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <h3 className="text-lg font-bold mb-2">Feriados de {selectedYear}:</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {holidays.map((item) => (
                <li key={item.id} className="p-4 border border-gray-300 rounded">
                  <h4 className="text-lg font-bold mb-2">{item.name}</h4>
                  <p>Data: {formatDate(item.date)}</p>
                  <p>Dia da semana: {dayOfWeek(item.date).dayOfWeek} </p>
                </li>
              ))}
            </ul>
            <h3  className='text-lg font-bold my-2'>O Ano de {selectedYear} terá {count} feriados em finais de semana </h3>
          </div>
        )}
      </div>
    </>
  );
};

export default Data;
