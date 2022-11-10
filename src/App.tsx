import type {Product} from "./types";

import {useEffect, useState} from "react";

import api from "./api";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>(() => JSON.parse( localStorage.getItem("query")) || "");
  const [search, setSearch] = useState(() =>JSON.parse( localStorage.getItem("search")) || "")
  useEffect(() => {
    console.log("se ejecuta primero")
    api.search(query).then(setProducts);
    localStorage.setItem("query", JSON.stringify(query))
  }, [query]);


  const transformCurrency = (price) => {
    const formatter = new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS"
    })
    return formatter.format(price)
  }




  useEffect(() =>{ 
    console.log("se ejecuta segundo")
    if(search) {

      const calculate = () => {
        setTimeout(() => {
          setProducts((currProducts) =>{
            return [...currProducts].sort((a, b) => a[search] < b[search] ? -1 : 1)
          })
        }, 1000);
  
      }
      
      calculate()
      localStorage.setItem("search", JSON.stringify(search))
    }
  }, [search])



  return (
    <main>
      <h1>Tienda digitaloncy</h1>
      <input name="text" value={query} placeholder="tv" type="text" onChange={(e) => setQuery(e.target.value)} />
      <select value={search} onChange={(e) => setSearch(e.target.value)}>
        <option value="">Elige</option>
        <option value="price">Precio</option>
        <option value="title">Nombre</option>
     </select>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h4>{product.title}</h4>
            <p>{product.description}</p>
            <span>{transformCurrency(product.price)}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
