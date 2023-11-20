import { useEffect, useState } from 'react';
import './styles.css';

export const AsyncPromiseExercise = () => {
  //getter / settter post API
  const [getAsyncData, setAsyncData] = useState([]);
  const [getAsyncDataError, setAsyncDataError] = useState(null);
  const [getFinallyMessage, setFinallyMessage] = useState(null);

  //getter / setter todos API
  const [getAsyncTodosData, setAsyncTodosData] = useState([]);
  const [getAsynTodosError, setAsyncTodosError] = useState(null);
  const [getFinallyTodosMessage, setFinallyTodosMessage] = useState(null);

  // "Old way" of async request han
  function fetchTodoData() {
    fetch(
      'https://jsonplaceholder.typicode.com/todos/' // user o id = 2
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Something went wrong during todos fetching');
        }
        return response.json();
      })
      .then((decodedJsonData) => {
        setAsyncTodosData(decodedJsonData);
      })
      .catch((error) => {
        setAsyncTodosError(error.message);
      })
      .finally(setFinallyTodosMessage('FiNally result from TODOS API'));
  }

  //funkcja asynchroniczna składniowy lukier
  async function fetchData() {
    try {
      //axios, RTK Querry Toolkit (data caching)
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts/' // user o id = 2
      );
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      //decoded json data
      const jsonData = await response.json();

      setAsyncData(jsonData);
    } catch (error) {
      setAsyncDataError(error);
    } finally {
      setFinallyMessage('Final result!!!');
    }
  }

  useEffect(() => {
    fetchData();
    fetchTodoData();
  }, []);

  //Promise all example (all promises must be resolved without error)

  // const promise1 = Promise.resolve(1);
  // const promise2 = Promise.resolve(2);
  // const promise3 = Promise.reject('Błąd');

  // Promise.all([promise1, promise2, promise3])
  //   .then((results) => {
  //     console.log('Sukces:', results);
  //   })
  //   .catch((error) => {
  //     console.error('Błąd:', error);
  //   });

  //Promise allSettled() example (some Promises might fail)

  // const promise1 = Promise.resolve(1);
  // const promise2 = Promise.reject('Błąd');

  // Promise.allSettled([promise1, promise2])
  //   .then((results) => {
  //     console.log('Wyniki:', results);
  //   });

  //Promise any() example (at least one should be resolved)

  //   const promise1 = Promise.reject('Błąd 1');
  // const promise2 = Promise.reject('Błąd 2');
  // const promise3 = Promise.reject('1231');

  // Promise.any([promise1, promise2, promise3])
  //   .then((result) => {
  //     console.log('Sukces:', result);
  //   })
  //   .catch((errors) => {
  //     console.error('Błędy  sdad:', errors);
  //   });

  //Promise race() example (it will return first resolved Promise - RACE!!)

  // const promise1 = new Promise((resolve) => setTimeout(() => resolve('Promise 1'), 400));
  // const promise2 = new Promise((resolve) => setTimeout(() => resolve('Promise 2'), 500));

  // Promise.race([promise1, promise2])
  //   .then((result) => {
  //     console.log('Pierwszy rozwiązany promise:', result);
  //   });

  return (
    <div className="container--async-promise">
      <h3>
        {getAsyncDataError?.message &&
          `There was an error: ${getAsyncDataError?.message}`}
      </h3>

      {getAsyncData.length > 0 ? (
        <ul>
          {getAsyncData.map((singelUserAsyncData) => (
            <li>
              <h3>Id: {singelUserAsyncData.id}</h3>
              <h4>Body: {singelUserAsyncData.body}</h4>
              <p>Title: {singelUserAsyncData.title}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Ładowanie....</p>
      )}

      {/* //TODO add .map function to render TODOS list */}

      <h4>{getFinallyMessage}</h4>
    </div>
  );
};
