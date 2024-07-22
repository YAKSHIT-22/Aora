import { getCurrentUser } from "@/lib/appwrite";
import { createContext, useContext, useEffect, useState } from "react";

interface GlobalContextProps {
    isLoading: boolean;
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
    user: any;
    setUser: (value: any) => void;
}
const GlobalContext = createContext<GlobalContextProps>(
    {} as GlobalContextProps
);

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: {children: React.ReactNode}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCurrentUser().then(res=>{
            if(res){
                setIsLoggedIn(true);
                setUser(res);
            }else{
                setIsLoggedIn(false);
                setUser({});
            }
        }).catch(err=>{
            console.log(err);
        }).finally(()=>{
            setIsLoading(false);
        })
    }, []);
    return (
        <GlobalContext.Provider value={{isLoading,isLoggedIn,setIsLoggedIn,user,setUser}}>
            {children}
        </GlobalContext.Provider>
    )
};  