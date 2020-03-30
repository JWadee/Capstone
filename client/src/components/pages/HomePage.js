import React, {useState, useEffect} from "react";
import { connect } from 'react-redux';

//Component
import TrainerPage from './trainer/TrainerPage';

const HomePage = (props) => {
    const [display, setDisplay] = useState()

    //On account type change, load proper page. 
    useEffect(()=>{
        if(props.accountType === 1){
            setDisplay(<TrainerPage />);
        }else if(props.accountType === 2){
            setDisplay(<h2>Client</h2>);
        }else if(props.accountType === 3){
            setDisplay(<h2>Personal</h2>);
        }
    }, [props.accountType])

    return (
        <div>
            {display}
        </div>
    );
};


const mapStateToProps = (state) => {
    return {
        ID: state.account.ID,
        accountType: state.account.accountType
    }
}


export default  connect(mapStateToProps)(HomePage);