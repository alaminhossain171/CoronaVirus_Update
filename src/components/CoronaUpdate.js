import React from 'react'
import Card from './Card'
const CoronaUpdate = (props) => {
  const{totalConformed,
  totalRecoverd,
  totalDeaths,
  country}=props;
    return (
        <div>
          <h1 style={{textTransform:"Capitalize",
        color:"#DE4D61"
        
        
        }}>{country===''?'Corona Update!':`${country} Corona Update!`}</h1>
      

          <div style={{
            display:'flex',
            justifyContent:"center"
          }}>
          <Card>
         <span style={{fontSize:'20px'}}>Total Confirmed</span><br />
         <span style={{fontSize:'20px'}}>{totalConformed}</span>
          </Card>

          <Card>
         <span style={{fontSize:'20px'}}>Total Recovered</span><br />
         <span style={{fontSize:'20px'}}>{totalRecoverd}</span>
          </Card>

          <Card>
         <span style={{fontSize:'20px'}}>Total Deaths</span><br />
         <span style={{fontSize:'20px'}}>{totalDeaths}</span>
          </Card>
          </div>
        </div>
    )
}

export default CoronaUpdate
