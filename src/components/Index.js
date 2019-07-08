import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Search from './Search';
import TableRow from './TableRow';

const divStyle = {
    marginLeft: '10%',
    marginRight: '10%'
};


const Index = () => {
    const [entries, setEntries] = useState([]);
    const [updateSearch, setUpdateSearch] = useState(false);
    
    useEffect(()=> {
        const abortController = new AbortController();
        const signal = abortController.signal;

        axios.get('http://localhost:4000/entries', {signal: signal})//pass signal from abortController
            .then(response => {
                setEntries(response.data);
            })
            .catch(error => {
                console.log(error);
            })

        return function cleanup(){
            console.log('index useEffect clean up...')
            abortController.abort();//cancel subscription by abort
        }
        
    }, []);

    const tableRow = () => {
        return entries.map((object, i) => {
            return <TableRow obj = {object} key={i}/>
        });
    }

    const onTermSubmit = (type, term) => {
        console.log("searched: ",term);
        console.log("searched by: ",type);

        axios.get('http://localhost:4000/entries')
            .then(response => {
                //if search term is empty set entries to all
                if(term.trim().length === 0){
                    setEntries(response.data);
                } else{
                    let i;
                    let updatedArr = [];
                    for(i = 0; i < response.data.length; i++){
                        if(type === 'keywords'){
                            if(response.data[i].keywords.trim().toLowerCase().indexOf(term.trim().toLowerCase()) !== -1){
                                console.log('FOUND!', response.data[i])
                                updatedArr.push(response.data[i]);
                            }
                        } else {
                            if(response.data[i].title.trim().toLowerCase().indexOf(term.trim().toLowerCase()) !== -1){
                                console.log('FOUND!', response.data[i])
                                updatedArr.push(response.data[i]);
                            }
                        }
                    }
                    setEntries(updatedArr);
                    // console.log('updated array',updatedArr);
                    // console.log('entries state',entries);
                    }
                })
            .catch(error => {
                console.log(error);
            })
        }
        return(
            <div style={divStyle}>
                <Search onTermSubmit={onTermSubmit} updateSearch={updateSearch} setUpdateSearch={setUpdateSearch}/>
                <h3>List of Entries:</h3>
                <h5>{entries.length} results displayed...</h5>
                <table className="ui celled structured table unstackable">
                    <thead>
                        <tr>
                            <th colSpan="1" style={{color: '#fff',backgroundColor: '#2185d0'}}>Title</th>
                            <th colSpan="1" style={{color: '#fff',backgroundColor: '#2185d0'}}>Author</th>
                            <th colSpan="1" style={{color: '#fff',backgroundColor: '#2185d0'}}>Keywords</th>
                            <th colSpan="1" style={{minWidth: 280, color: '#FAE5D3',backgroundColor: '#2185d0'}}>Action</th>
                        </tr> 
                    </thead>
                    <tbody>
                        {tableRow()}
                    </tbody>
                </table>
            </div>
        )
}


// class Index extends React.Component{
//     constructor(props){
//         super(props);
//         this.state={
//             entries: []
//         };
//     }

//     componentDidMount(){
//         axios.get('http://localhost:4000/entries')
//             .then(response => {
//                 this.setState({
//                     entries: response.data
//                 });
//             })
//             .catch(error => {
//                 console.log(error);
//             })
//     }
//     //works but gets warning in console...
//     /*
//         Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
//     in Index (created by Route)
//     */
//    /*
//     componentDidUpdate(){
//         axios.get('http://localhost:4000/entries')
//             .then(response => {
//                 this.setState({
//                     entries: response.data
//                 });
//             })
//             .catch(error => {
//                 console.log(error);
//             })
//     }*/
//     tableRow(){
//         return this.state.entries.map((object, i) => {
//             return <TableRow obj = {object} key={i}/>
//         });
//     }
    
//     onTermSubmit = (type, term) => {
//         console.log("searched: ",term);
//         console.log("searched by: ",type);
//         axios.get('http://localhost:4000/entries')
//             .then(response => {
//                 if(term.trim().length === 0){
//                     this.setState({
//                         entries: response.data
//                     });
//                 } else{
//                     let i;
//                     let updatedArr = [];
//                     for(i = 0; i < response.data.length; i++){
//                         if(type === 'keywords'){
//                             if(response.data[i].keywords.trim().toLowerCase().indexOf(term.trim().toLowerCase()) !== -1){
//                                 console.log('FOUND!')
//                                 updatedArr.push(response.data[i]);
//                             }
//                         } else {
//                             if(response.data[i].title.trim().toLowerCase().indexOf(term.trim().toLowerCase()) !== -1){
//                                 console.log('FOUND!')
//                                 updatedArr.push(response.data[i]);
//                             }
//                         }
//                         this.setState({
//                             entries: updatedArr
//                         }); 
//                     }
//                 }
//             })
//             .catch(error => {
//                 console.log(error);
//             })
//     }
//     render(){
//         return(
//             <div style={divStyle}>
//                 <Search onTermSubmit={this.onTermSubmit}/>
//                 <h3>List of Entries:</h3>
//                 <h5>{this.state.entries.length} results displayed...</h5>
//                 <table className="ui celled structured table unstackable">
//                     <thead>
//                         <tr>
//                             <th colSpan="1" style={{color: '#fff',backgroundColor: '#2185d0'}}>Title</th>
//                             <th colSpan="1" style={{color: '#fff',backgroundColor: '#2185d0'}}>Author</th>
//                             <th colSpan="1" style={{color: '#fff',backgroundColor: '#2185d0'}}>Keywords</th>
//                             <th colSpan="1" style={{minWidth: 280, color: '#FAE5D3',backgroundColor: '#2185d0'}}>Action</th>
//                         </tr> 
//                     </thead>
//                     <tbody>
//                         { this.tableRow()}
//                     </tbody>
//                 </table>
//             </div>
//         )
//     }
// }

export default Index;