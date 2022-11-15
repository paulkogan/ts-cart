import cx from 'classnames';
import { Component } from 'react';

export default class LikeButton extends Component {


    constructor() {
        super();
        this.state= {
          counter: 100,
          liked: false
        }
        this.handleClick = this.handleClick.bind(this)
      }
      
      handleClick() {
        if (this.state.liked) {
            this.setState({
                counter:this.state.counter-1,
                liked: false
            })

        } else {  //set to true
            this.setState({
                counter:this.state.counter+1,
                liked: true
            })
        }
        
      }



    render() {
        return (
            <>
                <style>{`
                    .like-button {
                        font-size: 1rem;
                        padding: 5px 10px;
                        color:  #585858;
                        border: 2px solid navy;
                    }
                   .liked {
                        font-weight: bold;
                        font-size: 1rem;
                        padding: 5px 10px;
                        color: #1565c0;
                        border: 2px solid navy
                   }
                `}</style>
                <button 
                className={cx( {
                    "like-button": !this.state.liked,
                    "liked": this.state.liked
                  })}
                  onClick = {this.handleClick}> Like |<span className="likes-counter">{this.state.counter}</span>
                </button>
            </>
        );
    }
}
