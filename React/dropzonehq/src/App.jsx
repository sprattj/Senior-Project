import React from 'react';
import ReactDOM from 'react-dom';
import Isolog from '../pages/Isolog';
import Fireball from '../pages/Fireball';
import AllThePrimes from '../pages/AllThePrimes';
import NotTheWeb from '../pages/NotTheWeb';
import FourOhFour from '../pages/FourOhFour';

const PAGES = {
    '/': Home,
    '/isolog': Isolog,
    '/fireball': Fireball,
    '/all-the-primes': AllThePrimes,
    '/not-the-web': NotTheWeb,
};

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pathname: props.pathname,
        };
    }

    componentDidMount() {
        console.info('App loaded in:', Math.round(performance.now()));
      
        history.onChange((pathname) => {
            this.setState({pathname});
        });
    }

    render() {
        const Handler = PAGES[state.pathname] || FourOhFour;

        return <Handler />;
    }
}

App.propTypes = {
    pathname: PropTypes.oneOf(Object.keys(PAGES)).isRequired,
};


