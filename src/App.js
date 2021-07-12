
import React,{useEffect,useState} from 'react';
import './App.css'
import LineGraph from './components/LineGraph'

import CoronaUpdate from './components/CoronaUpdate';
import axios from './axios';
import Footer from './components/Footer';

function App() {
  
const[totalConfirmed,setTotalConfirmed]=useState(0);
const [totalRecoverd,setTotalRecoverd]=useState(0);
const[totalDeaths,setTotalDeaths]=useState(0);
const[summary,setSummary]=useState({});
const [days,setDays]=useState(7);
const [country,setCountry]=useState('');
const [coronaCountAr, setCoronaCountAr]=useState([]);
const [label,setLabel]=useState([])
useEffect(function(){
  
axios.get(`/summary`)
.then(function(res){
  if(res.status===200){
    setTotalConfirmed(res.data.Global.TotalConfirmed);
    setTotalRecoverd(res.data.Global.NewRecovered);
    setTotalDeaths(res.data.Global.TotalDeaths);
    setSummary(res.data);
  }
})
.catch(function(err){
  
  console.log(err);
})
},[]);
const formatDate=(date)=>{
  const d=new Date(date);
  const year=d.getFullYear();
  const month= `0${d.getMonth()+1}`.slice(-2);
const _date=d.getDate();
  return `${year}-${month}-${_date}`
}

function handleCountry(e){
  console.log(e.target.value)
  setCountry(e.target.value);
  const d= new Date();
  const to=formatDate(d);
  const from= formatDate(d.setDate(d.getDate()-days));
  console.log(from,to);
  getCoronaReportByDateRange(e.target.value, from, to);
}

function handleDays(e){
  console.log(e.target.value)
  setDays(e.target.value);
  const d= new Date();
  const to=formatDate(d);
  const from= formatDate(d.setDate(d.getDate()-e.target.value));
  getCoronaReportByDateRange(country,from,to);
}
function getCoronaReportByDateRange(countrySlug,from,to){
  axios.get(`/country/${countrySlug}/status/confirmed?from=${from}T00:00:00Z&to=${to}T00:00:00Z`)
  .then(function (res){
    const xAxisLabel=res.data.map(d=>d.Date);
    const yAxisCoronaCOunt=res.data.map(d=>d.Cases);
    setCoronaCountAr(yAxisCoronaCOunt);
   const covidDetails= summary.Countries.find(country=>country.Slug===countrySlug);
   setTotalConfirmed(covidDetails.TotalConfirmed);
   setTotalRecoverd(covidDetails.TotalRecovered);
   setTotalDeaths(covidDetails.TotalDeaths);
   setLabel(xAxisLabel)
  })
  .catch(function (err){
    console.log(err)
  })
}

  return (
    <div className="App">
      <div>
        <CoronaUpdate
        totalConformed={totalConfirmed}
        totalRecoverd={totalRecoverd}
        totalDeaths={totalDeaths}
        country={country}
        
        />
      </div>

      <div style={{marginTop:"20px",
    opacity:'0.7'}}>
        <select value={country} onChange={handleCountry}>
          <option value="">Select Country</option>
          {
            summary.Countries && summary.Countries.map(function(country){
              return <option key={country.Slug} value={country.Slug}>{country.Country}</option>
            })
          }
        </select>

        <select style={{opacity:'0.9'}} value={days} onChange={handleDays}>
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="90">Last 90 Days</option>
        </select>
      </div>
      <LineGraph 
      yAxis={coronaCountAr} label={label} />
      <Footer />
     
    </div>
  );
}

export default App;
