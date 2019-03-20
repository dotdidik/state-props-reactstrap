import React from 'react';
import AppHeader from './components/AppHeader';
import AppBody from './components/AppBody';
import AppFooter from './components/AppFooter';
 
class Induk extends React.Component{
    render(){
        return(
            <div className="Hallo">
                <AppHeader />
                <AppBody />
                <AppFooter />
            </div>
        )
    }
}

export default Induk;