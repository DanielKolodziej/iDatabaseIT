import React, {useState} from 'react';

const Search = (props) => {
    const [type, setType] = useState('title');
    const [term, setTerm] = useState('');

    const onTypeChange = (event) => {
        setType(event.target.value);
    }
    const onInputChange = (event) => {
        setTerm(event.target.value);
    }
    const onFormSubmit = (event) => {
        event.preventDefault();
        props.onTermSubmit(type, term);
        setTerm('');
        console.log('current searchTerm state:',props.updateSearch);
        props.setUpdateSearch(!props.updateSearch);
    }

    return (
        <div className="search-ui segment">
            <form onSubmit={onFormSubmit} className="ui form">
                <div className="field">
                    <label>Database Search<i className="search icon"></i></label>
                    <select value={type} onChange={onTypeChange}>
                        <option>title</option>
                        <option>keywords</option>
                    </select>
                    <input 
                        type="text"
                        placeholder="Search for..."
                        value={term}
                        onChange={onInputChange} />
                </div>
            </form>
        </div>
    );
}


// class Search extends React.Component{
//     constructor(props){
//         super(props);
//         this.state= {
//             type: 'title',
//             term: ''
//         };
//     }
//     onTypeChange = (event) => {
//         this.setState({
//             type: event.target.value
//         })
//     }
//     onInputChange = (event) => {
//         this.setState({
//             term : event.target.value
//         });
//     }
//     onFormSubmit = (event) => {
//         event.preventDefault();
//         this.props.onTermSubmit(this.state.type, this.state.term);
//         this.setState({
//             term: ''
//         })
//     }

//     render(){
//         return (
//             <div className="search-ui segment">
//                 <form onSubmit={this.onFormSubmit} className="ui form">
//                     <div className="field">
//                         <label>Database Search<i className="search icon"></i></label>
//                         <select value={this.state.type} onChange={this.onTypeChange}>
//                             <option>title</option>
//                             <option>keywords</option>
//                         </select>
//                         <input 
//                             type="text"
//                             placeholder="Search for..."
//                             value={this.state.term}
//                             onChange={this.onInputChange} />
//                     </div>
//                 </form>
//             </div>
//         );
//     }
// }
export default Search;