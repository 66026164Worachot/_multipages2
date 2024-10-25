import Counter from '../../components/Counter/Counter'
import Timer from '../../components/Timer/Timer'
import Add from '../../components/Add/Add'
import Temperaturs from '../../components/Temperaturs/Temperaturs'
import './components.css'

function Components() {
    return ( <div className="components-container">
            <h1>COMPONENTS</h1>
            <div className="main-container">
      <h1>React Component</h1>

      <div className='gril-contener'>

        <div className='gril-item'>
          <Counter Name='BongBang' value={20}/>
          <Timer/>
        </div>
        <div className='gril-item Add'>
          <Add aValue={10} bValue={20}/> 
        </div>

      </div>
      <Temperaturs/>
      <h1 className='h1'>นายวรโชติ วังหา รหัส 66026164</h1>
    </div>
        </div>
     );
}

export default Components;