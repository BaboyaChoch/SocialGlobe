import React from 'react';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
export default function EventTypeSearch({handleFilter, handleClear}) {
  return (
    <AutocompleteDropdown
      clearOnFocus={false}
      closeOnBlur={true}
      closeOnSubmit={false}
      onSelectItem={item => {
        if (item && item.title) {
          handleFilter(item.title);
        }
      }}
      textInputProps={textinput_props}
      dataSet={autocomplete_data}
      onClear={handleClear}
    />
  );
}

const autocomplete_data = [
  {id: '1', title: 'fair'},
  {id: '2', title: 'sport'},
  {id: '3', title: 'seminar'},
  {id: '4', title: 'fundraiser'},
];

const textinput_props = {
  placeholder: 'Enter an event type',
};
