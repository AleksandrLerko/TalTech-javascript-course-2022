import SearchView from './SearchView';


const SearchInput = () => {
    return (
        <>
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8 searchInput"><SearchView></SearchView></div>
                <div className="col-2"></div>
            </div>
        </>
    )

};

export default SearchInput;