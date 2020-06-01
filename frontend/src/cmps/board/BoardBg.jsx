import React from 'react'


export default class BoardBg extends React.Component {

    render() {
        const { bgs, type, changeBgColor  } = this.props
        
        return <ul className="bg-color-list clean-list flex wrap">{
            bgs.map((bg,idx )=> {
                return <li key={idx} className="bg-color-li" onClick={() => changeBgColor(bg)} 
                style={type === 'color' ? { backgroundColor: bg } : { backgroundImage: `url(${bg})`,backgroundSize:"cover" }}></li>
            })
        }
      </ul >
    }
}
