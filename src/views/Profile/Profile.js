import React, { Component } from "react";
import LeaveApply from "../LeaveApply/LeaveApply";
class Profile extends Component{
    constructor (props){
        super(props)
        this.state={
            menuItems:[
                {title:"jan", id:'1',value:false },
                {title:'Feb',id:'2', value:false }
            ],
            
        }
    }

    render(){
        console.log(this.state.menuItems.value)
        return(
            <LeaveApply/>
        
        )
    }
}

export default Profile