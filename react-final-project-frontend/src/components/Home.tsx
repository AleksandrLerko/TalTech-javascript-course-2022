
import { useContext } from 'react';
import { JWTContext } from '../state/identities/JWTContext';
import CategoryIndex from './category/CategoryIndex';
import SearchView from './search/SearchView';
import ProductsOnHomePage from './product/ProductsOnHomePage';
import SearchInput from './search/SearchInput';

const Home = () => {

    let identityState = useContext(JWTContext);
    return (
        <>
            {/* <div>Hello, {identityState.jwtResponse?.firstName} {identityState.jwtResponse?.lastName}!</div> */}
            <SearchInput></SearchInput>
            <CategoryIndex />
            <h1 className="middleHomePageH1">The best products!</h1>
            <ProductsOnHomePage></ProductsOnHomePage>
        </>
    )
};

export default Home;