import React, { useState } from 'react';
import Accordion from "./Accordion";
import Dropdown from "./Dropdown";
// import Search from "./Search";

const items = [
    {
        title: "What is React?",
        content: "React is a front end javascript content"
    },
    {
        title: "Why use React?",
        content: "React is a favourite JS library among Engineers"
    },
    {
        title: "How do you use React?",
        content: "React is all about creating components and managing data flow"
    },
]

const options = [
    {
        label: 'The Color Red',
        value: 'red',
    },
    {
        label: 'The Color Blue',
        value: 'blue'
    },
    {
        label: 'A shade of Green',
        value: 'green'
    }
]

const App = () => {
    const [selected, setSelected] = useState(options[0])
    const [showDropdown, setShowDropdown] = useState(true);


    return (
        // <div><Accordion items={items}/></div>
        // <div className={`ui container`}><Search/></div>
        <div className={`ui container`}>
            <button onClick={() => setShowDropdown(!showDropdown)}>
                Toggle Dropdown
            </button>
            {
                showDropdown ?
                <Dropdown

                onSelectedChange={setSelected}
                selected={selected}
                options={options}
            /> : null
            }

        </div>
    );
}

export default App;