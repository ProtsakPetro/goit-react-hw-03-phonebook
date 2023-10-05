import { FilterInput, FilterInputLabel, FilterInputContainer } from "./Filter.styled"


const Filter = ({filter, getFilterData}) => {
    return ( 
        <FilterInputContainer>
    <FilterInput type="text" name="filter" id="filter" value={filter} onChange={getFilterData}/>
    <FilterInputLabel htmlFor="filter">Find contact by Name</FilterInputLabel>
        </FilterInputContainer>

  )
}

export default Filter