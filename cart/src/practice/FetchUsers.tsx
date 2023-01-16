import React, {useState, useEffect} from 'react';


const FetchUsers:React.FC = () => {


    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const url = "https://reqres.in/api/users?delay=3"

    useEffect( () => {
        //cannot return anything out of useeffect
        const fetchData = async (url: string) => {
            setIsLoading(true)
            try {
                 const response= await fetch(url)
                 const body = await response.json()
                 const data = body.data
                 //console.log("BODY: ", data)
                 setUsers(data)
                 setIsLoading(false)
            } catch(error) {
                 console.log("Error!: failed to fetch data", error)
            }
         }

        //need to fetch inside useEffect (or useCallback)
        
        fetchData(url)
        

    }, []);


    const printUsers = (users:any[]) => {
        return users.map(user => (
                <div key={user.id} className="prod-list-item" >
                  <span><img className="prod-list-img" src={user.avatar}></img></span> 
                  <span> {user.first_name} </span> <span> {user.last_name}</span>
                </div>
            ))
    }
    


    return (
        <div> 
            {isLoading ? <div> PLEASE WAIT - DATA LOADING !!!</div> : 
            <div>
                {printUsers(users)}
            </div>
        
        
            }

        </div>


    )
}

export default FetchUsers