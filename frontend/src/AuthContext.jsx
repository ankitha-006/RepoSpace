import React, {createContext, useState, useEffect, useContext} from 'react';
//useState store current state
//useeffect to check every time when comp loads up
const AuthContext = createContext();//throught the application its available
// it is a constructor context is a pice of data which in every application its available its a global data item
//Context api
export const useAuth=()=>{//its a custom hook
    return useContext(AuthContext);
}
//it will wrap the entire application so that the info can be accessed anywhere
export const AuthProvider=({children})=>{
    //so that all its childer gets these info
    const [curUser,setCurUser]=useState(null); //by default cur user is null ie user is not logged in
    //when user logs in this value changes



    //every time a componet reloads we use use effect
    useEffect(()=>{
        const userId=localStorage.getItem('userId');
        //when user logs in we take the user id and jwt id
        if(userId)//if its not null set the user id
        {
            setCurUser(userId);
        }
      
    },[])
    const val={
        curUser,setCurUser,
    }
    return <AuthContext.Provider value={val}>{children}</AuthContext.Provider>
    //we are expoting this function and will use it in login so that we can set the value based on the id we get
}