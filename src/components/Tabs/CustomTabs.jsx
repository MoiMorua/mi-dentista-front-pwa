import React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import './Tabs.scss'
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiTab: {
            styleOverrides: {
                root: {                    
                    color: 'rgba(255,255,255,0.6)',
                    fontWeight: 'bold',                    
                },
                
            }
        }
    },
});

const CustomTabs = ({options,onChange}) => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue)
        onChange(newValue)
    };

    return (
        <div className="CustomTabs">
            <Tabs 
            TabIndicatorProps={{style: {backgroundColor: 'white'}}}            
            value={value} 
            onChange={handleChange}             
            >
                {options.map((option, index) => (
                    <Tab theme={theme} key={index} label={option.name} disableRipple={true}/>                    
                ))}
            </Tabs>
        </div>
    )
}

export default CustomTabs
