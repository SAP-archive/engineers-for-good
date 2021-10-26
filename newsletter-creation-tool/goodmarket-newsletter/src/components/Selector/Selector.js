import React, { useState } from "react";
import "./Selector.css";

const SelectorItem = ({ name, isSelected, handleClick, number }) => {
    let className = "selector-item";
    if (isSelected) {
        className += " selector-item-active";
    }
    return (
        <div
            className={className}
            onClick={handleClick}
        >
            {name} &nbsp; ({number})
        </div>
    );
};

const Searchbar = ({ searchQuery, setSearchQuery }) => {
    return (
        <input
            className="search-bar"
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={setSearchQuery}
        />
    )
}

const Selector = (props) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [allSelected, setAllSelected] = useState(false);
    
    const checkAllSelected = () => {
        // refactor to use find()
        let allSelected = true;
        if (props.items && props.items.length > 0) {
            props.items.forEach(item => {
                if (!item.isSelected) {
                    allSelected = false;
                    return;
                }
            });
        }
        setAllSelected(allSelected);
    }

    const handleSelectAll = () => {
        // console.log("selected all")
        if (props.items && props.items.length > 0) {
            let newItemsState = props.items.map(item => {
                if (allSelected) {
                    item.isSelected = false;
                } else {
                    item.isSelected = true;
                }
                return item;
            });
            props.setItems(newItemsState);
            setAllSelected(!allSelected);
        }
    }

    const handleClick = (itemId) => {
        // console.log("clicked: %s", itemId)
        if (props.items && props.items.length > 0) {
            let newItemsState = props.items.map(item => {
                if (item.code === itemId) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            });
            props.setItems(newItemsState);
            checkAllSelected();
        }
    }

    const renderItem = (item) => {
        return <SelectorItem
            key={item.code}
            name={item.name}
            handleClick={() => handleClick(item.code)}
            isSelected={item.isSelected}
            number={item.recipientNum}
            />;
    }

    const renderItems = () => {
        if (props.items && props.items.length > 0) {
            if (searchQuery) {
                return props.items.filter(item => {
                    return item.name.toLowerCase().includes(searchQuery.toLowerCase());
                }).map(item => renderItem(item));
            } else {
                return props.items.map(item => renderItem(item));
            }
        }
    };

    let select_button_text;
    if (allSelected) {
        select_button_text = "Deselect";
    } else {
        select_button_text = "All";
    }

    const itemsSelectedLength = (props.items && props.items.length > 0) ? props.items.filter(item => item.isSelected).length : 0;
    const itemsSelectedNumSum = (props.items && props.items.length > 0) ? props.items.filter(item => item.isSelected).reduce((pre, cur) => pre + cur.recipientNum, 0) : 0;

    return (
        <div className="newsletter-create-container">
        <div className="selector-container">
            <div className="selector-header">
                <div className="num-selected">
                    {itemsSelectedLength} selected ({itemsSelectedNumSum} members).
                </div>
                <button className="select-all" onClick={() => handleSelectAll()}>
                    {select_button_text}
                </button>
                <Searchbar
                    searchQuery={searchQuery}
                    setSearchQuery={e => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="item-container">
                {renderItems()}
            </div>
        </div>
        <button className="nextButton"
            onClick={() => props.setCurrentView(props.views.curate)}>
            Next
        </button>
        </div>
    );

}

export default Selector;