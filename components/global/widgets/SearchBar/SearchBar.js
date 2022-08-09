import React from 'react';
import { InputField } from "../../global";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { SearchBarStyles } from "./SearchBarStyles";

const SearchBar = (props) => {
    const { handleSearch, title } = props;
    const styles = SearchBarStyles();

    return (
        <InputField
            label={title}
            className={styles.searchInput}
            inputIcon={<SearchOutlinedIcon />}
            onChange={handleSearch}
        />
    );
};

export default SearchBar;