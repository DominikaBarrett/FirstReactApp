import React, {useEffect, useState} from "react";
import Recipe from "./Recipe";

import './App.css';

const App = () => {
    const APP_ID = '8d1ed4af';
    const APP_KEY = 'a27de81eac1cf08e9e7eb155739d8bbc';
    const example = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`;
    
    const [counter, setCounter] = useState(0);
    const [search, setSearch] = useState(" ");
    const [recipes, setRecipes] = useState([]);
    const [query,setQuery] = useState('chicken');

    useEffect(() => {
        getRecepis();
        //console.log("efect has been run!");
    }, [query]);


    const getRecepis = async () => {
        const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
        const data = await response.json();
        setRecipes(data.hits);
        console.log(data.hits)
    };
    
    const updateSearch = e => {
        setSearch(e.target.value)
    //
    }
    const getSearch =e => {
        e.preventDefault();
        setQuery(search);
        setSearch("");
        
    }


    return (
        <div className="App">
            <form onSubmit={getSearch} className="search-form">
                <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
                <button className="search-button" type="submit">Search</button>
               {/*//<h1 onClick={() => setCounter(counter + 1)}>{counter}</h1>*/}
            </form>
            <div className="recepies">
                {recipes.map(recepi => (

                    <Recipe
                        key={recepi.recipe.label}

                        title={recepi.recipe.label}
                        calories={recepi.recipe.calories}

                        image={recepi.recipe.image}
                        ingredients={recepi.recipe.ingredients}/>
                ))}
                
            </div>
    
        </div>
    );

};

export default App;
