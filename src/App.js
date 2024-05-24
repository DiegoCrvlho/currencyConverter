// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [convertedValue, setConvertedValue] = useState("");
  const [to, setTo] = useState("EUR");

  return (
    <Main>
      <Logo />
      <InputBox
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setConvertedValue={setConvertedValue}
        to={to}
        setTo={setTo}
      />
      <ConvertedNumber
        to={to}
        isLoading={isLoading}
        convertedValue={convertedValue}
      />
    </Main>
  );
}

function Logo() {
  return <h1 className="logo">💰 Converter</h1>;
}

function ConvertedNumber({ isLoading, convertedValue, to }) {
  return (
    <p className="converted">
      {isLoading ? (
        "LOADING..."
      ) : (
        <>
          {Number(convertedValue).toFixed(2)} {to}
        </>
      )}
    </p>
  );
}

function Main({ children }) {
  return <div className="container">{children}</div>;
}

function InputBox({ isLoading, setIsLoading, setConvertedValue, setTo, to }) {
  const [query, setQuery] = useState(1);
  const [from, setFrom] = useState("BRL");
  useEffect(
    function () {
      async function fetchData() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${query}&from=${from}&to=${to}`
        );
        const data = await res.json();
        setConvertedValue(data.rates[to]);
        setIsLoading(false);
      }

      if (from === to) return setConvertedValue(query);

      if (!query) return;

      fetchData();
    },
    [query, from, setConvertedValue, to, setIsLoading]
  );

  return (
    <div className="input-box">
      <input
        type="text"
        value={query}
        className="input"
        onChange={(e) => setQuery(Number(e.target.value))}
      />
      <select
        disabled={isLoading}
        value={from}
        className="select"
        onChange={(e) => setFrom(e.target.value)}
      >
        <option value="BRL">BRL</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="icon"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
        />
      </svg>

      <select
        disabled={isLoading}
        value={to}
        className="select"
        onChange={(e) => setTo(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
    </div>
  );
}
