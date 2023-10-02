import { Link } from 'react-router-dom'
import './QuizMenu.scss'

export function QuizMenu(){
    return (
        <div className='menu_block'>
            <MenuItem quiz_ref='/quiz/cs' img_name='cs_logo.svg'/>
            <MenuItem quiz_ref='/quiz/cpp' img_name='cpp_logo.svg'/>
            <MenuItem quiz_ref='/quiz/py' img_name='py_logo.svg'/>
            <MenuItem quiz_ref='/quiz/java' img_name='java_logo.svg'/>
            <MenuItem quiz_ref='/quiz/js' img_name='js_logo.svg'/>
            <MenuItem quiz_ref='/quiz/go' img_name='go_logo.svg'/>
        </div>
    )
}

interface MenuItemProps{
    img_name : string,
    quiz_ref : string
}

// cs_logo.svg
function MenuItem({img_name, quiz_ref} : MenuItemProps){
    return (
        <Link to={quiz_ref} className="menu_item">
            <img src={`./img/${img_name}`}/>
        </Link>
    )
}