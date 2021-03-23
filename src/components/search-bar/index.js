import React from 'react';
import SearchIcon from '../../images/icon-search';

import { Form, Input, Icon } from './styled';
import './index.css';

const SearchBar = ({ onSearch }) => {
    const onInput = (e) => onSearch(e.target.value);
    return (
        <Form
            role="search"
            action=""
            method="get"
            onSubmit={(e) => e.preventDefault()}
        >
            <Icon>
                <SearchIcon />
            </Icon>
            <label htmlFor="header-search">
                <span className="visually-hidden">
                    Search blog posts
                </span>
            </label>

            <Input
                type="text"
                id="header-search"
                placeholder="Search blog posts"
                onInput={onInput}
            />
        </Form>
    );
};

export default SearchBar;
