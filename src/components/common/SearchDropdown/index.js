import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

 function SearchDropdown({
  options,
  onChange,
  values,
  onDelete
 }) {
  return (
    <>
    <Autocomplete
      disablePortal
      size='small'
      id="combo-box-demo"
      options={options||[]}
      onChange={(e,value)=>onChange(value)}
     fullWidth
      renderInput={(params) => <TextField {...params}  />}
    />
    <div
    style={{
      display:'flex',
      flexWrap:'wrap',
      gap:'5px',
      margin:'10px',
    }}
    >{
      
values.map((value)=>{
  return <div
  style={
    {

    border:' 1px solid #00000012',
    borderRadius: '12px',
    padding: '5px 10px',
    background:' #8a8af017'

    }
  }
  onClick={()=>onDelete(value)}
  >{value}</div>
})

}</div>
    </>
  );
}

export default SearchDropdown