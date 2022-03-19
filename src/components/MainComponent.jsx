import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header/Header";
import Books from "./Pages/Books";
import Persons from "./Pages/Persons";



const MainComponent =()=>{
    return(
        <div>
            <Header/>
            <Switch>
                    <Route path="/books" exact component={Books}/>
                    <Route path="/persons" exact component={Persons}/>
            </Switch>
          
        </div>
    );
}

export default MainComponent;