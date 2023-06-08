import React, {useState} from 'react';
import './Practice.css';
import LikeButton from './LikeButton';
import PracticePage from './PracticePage';

const Practice:React.FC = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [label, setLabel] = useState(Date.now().toString())
  const children = ["abe", "bianca", "Charlie"] 

    


  return (
    <div>
      
      <div className="cart-inner">
        <h2>Practice Home</h2>
        <div className="admin-left">

          <div> 
            {isLoading ? <div> PLEASE WAIT - PRODUCTS LOADING !!!</div> : 
            <div>
                  <LikeButton/>
            </div> 
        
            }
          </div>


          
          
          

        </div>

        <div className="cart-right">
          <div className="admin-app-2">
            <PracticePage children = {children} label = {label}  />
          </div>


        </div>


      </div>
    </div>
  );
}

export default Practice;

