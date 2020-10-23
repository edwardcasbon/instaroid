import React from 'react';
import Body from './Body';
import Footer from './Footer';
import Header from './Header';

function App( props ) {
    return <React.Fragment>
        <Header />
        <Body />
        <Footer />
    </React.Fragment>;
}

export default App;